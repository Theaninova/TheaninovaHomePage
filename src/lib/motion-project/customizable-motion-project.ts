import type {Uniforms} from "../shaders/shaderCanvas"
import type {ShaderCanvas} from "../shaders/shaderCanvas"
import type {FEATURES} from "../shaders/compileShader"

export interface CustomizableMotionProject {
  name: string
  priority: number
  uniforms: Uniforms
  colors: Record<string, string>
  variations?: Record<string, number>
  fragmentShader: string
  description: string
  dependencies: FEATURES[]
  animation?: {
    start: number
    end: number
    keyframes: Array<{
      start: number
      end: number
      easing: "linear" | "expoIn" | "expoOut" | "expoInOut" | "sinInOut"
      uniforms?: Uniforms
      colors?: Record<string, string>
    }>
  }
  render?: (shaderCanvas: ShaderCanvas, time: number) => void
}
