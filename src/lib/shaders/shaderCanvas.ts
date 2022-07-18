import {loadSingleShader} from "./compileShader"

export type UniformTypes = `${1 | 2 | 3 | 4}${"f" | "i"}v`

export type LooseUniformTypes =
  | number
  | [number, number]
  | [number, number, number]
  | [number, number, number, number]
export type StrictUniformTypes = Float32Array | Int32Array

export interface Uniform {
  type: UniformTypes
  value: LooseUniformTypes
}

export interface StrictUniform {
  type: UniformTypes
  value: StrictUniformTypes
}

export interface CompiledUniform extends StrictUniform {
  location: WebGLUniformLocation
}

export type Uniforms = Record<string, Uniform | LooseUniformTypes>
export type StrictUniforms = Record<string, StrictUniform>

export type CompiledUniforms = Record<string, CompiledUniform>

export function looseToStrict(uniform: LooseUniformTypes, type?: UniformTypes): StrictUniform {
  const guessedType = type ?? guessUniformType(uniform)
  return {
    type: guessedType,
    value: new (guessedType?.endsWith("iv") ? Int32Array : Float32Array)(
      typeof uniform === "number" ? [uniform] : uniform,
    ),
  }
}

export function toStrictUniforms(uniforms: Uniforms): StrictUniforms {
  return Object.entries(uniforms).reduce((accumulator, [name, uniform]) => {
    if (typeof uniform === "number" || Array.isArray(uniform)) {
      accumulator[name] = looseToStrict(uniform)
    } else {
      accumulator[name] = looseToStrict(uniform.value, uniform.type)
    }
    return accumulator
  }, {} as StrictUniforms)
}

function guessUniformType(value: unknown): UniformTypes {
  if (typeof value === "number") return "1fv"
  if (typeof value === "boolean") return "1iv"
  if (Array.isArray(value)) return `${value.length as 1 | 2 | 3 | 4}fv`
  throw new Error(`Couldn't guess uniform type of '${typeof value}'`)
}

const QUAD = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])

export interface ShaderCanvasOptions {
  uniforms: StrictUniforms
  frag?: string
  vert?: string
}

export class ShaderCanvas {
  private gl!: WebGL2RenderingContext

  private program!: WebGLProgram

  uniforms?: CompiledUniforms

  private resolutionUniformLocation!: WebGLUniformLocation

  private verticesAttributeLocation!: number

  constructor(readonly canvas: HTMLCanvasElement, readonly options: ShaderCanvasOptions) {
    void this.init()
  }

  private async init() {
    const gl = this.canvas.getContext("webgl2")
    if (!gl) throw new Error("WebGL 2 is not available")
    this.gl = gl
    this.program = this.createProgram(
      this.createShaders(
        [this.options.vert ?? (await loadSingleShader("simple.vert")), WebGL2RenderingContext.VERTEX_SHADER],
        [
          this.options.frag ?? (await loadSingleShader("simple.frag")),
          WebGL2RenderingContext.FRAGMENT_SHADER,
        ],
      ),
    )
    this.uniforms = this.compileUniforms(this.options.uniforms)
    this.verticesAttributeLocation = this.gl.getAttribLocation(this.program, "a_position")
    this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, "u_resolution")!

    this.bindQuadVertices()
    this.gl.useProgram(this.program)

    this.gl.enableVertexAttribArray(this.verticesAttributeLocation)
    this.gl.vertexAttribPointer(this.verticesAttributeLocation, 2, WebGL2RenderingContext.FLOAT, false, 0, 0)

    this.resize(true)

    this.gl.clearColor(0, 0, 0, 0)
  }

  resize(force = false) {
    if (
      force ||
      this.canvas.width !== this.canvas.clientWidth ||
      this.canvas.height !== this.canvas.clientHeight
    ) {
      this.canvas.width = this.canvas.clientWidth
      this.canvas.height = this.canvas.clientHeight
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
      this.gl.uniform2fv(
        this.resolutionUniformLocation,
        new Float32Array([this.canvas.width, this.canvas.height]),
      )
    }
  }

  render() {
    this.gl.clear(WebGL2RenderingContext.COLOR_BUFFER_BIT)
    this.gl.drawArrays(WebGL2RenderingContext.TRIANGLES, 0, 6)
  }

  updateUniforms() {
    if (!this.uniforms) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, {type, value, location}] of Object.entries(this.uniforms)) {
      this.gl[`uniform${type}`](location, value as never)
    }
  }

  private compileUniforms(uniforms: StrictUniforms): CompiledUniforms {
    const compiledUniforms: CompiledUniforms = {}
    for (const key in uniforms) {
      compiledUniforms[key] = {
        type: uniforms[key].type,
        value: uniforms[key].value,
        location: this.gl.getUniformLocation(this.program, key)!,
      }
    }
    return compiledUniforms
  }

  private createShaders(...shaders: [string, number][]): WebGLShader[] {
    return shaders
      .map(([source, type]) => {
        const shader = this.gl.createShader(type)
        if (!shader) throw new Error("Failed to create shader")
        this.gl.shaderSource(shader, source)
        this.gl.compileShader(shader)
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          console.error(this.gl.getShaderInfoLog(shader))
        }
        return shader
      })
      .filter(shader => shader !== null)
  }

  private createProgram(shaders: WebGLShader[]): WebGLProgram {
    const program = this.gl.createProgram()
    if (!program) throw new Error("Failed to create program")
    for (const shader of shaders) {
      this.gl.attachShader(program, shader)
    }
    this.gl.linkProgram(program)
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(`Failed to create program: ${this.gl.getProgramInfoLog(program)}`)
    }
    return program
  }

  private bindQuadVertices() {
    const buffer = this.gl.createBuffer()
    if (!buffer) throw new Error("Failed to create vertex buffer")
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, QUAD, this.gl.STATIC_DRAW)
  }
}
