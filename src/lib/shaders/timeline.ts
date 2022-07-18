import type {ShaderCanvas, StrictUniforms} from "./shaderCanvas"

export function expoIn(time: number, duration: number, begin: number, change: number): number {
  return change * Math.pow(2, 10 * (time / duration - 1)) + begin
}

export function expoOut(time: number, duration: number, begin: number, change: number): number {
  return change * (-Math.pow(2, (-10 * time) / duration) + 1) + begin
}

export function expoInOut(time: number, duration: number, begin: number, end: number) {
  const halfDuration = duration * 0.5
  const change = end - begin
  const halfChange = change * 0.5
  if (time < halfDuration) {
    return expoIn(time, halfDuration, begin, halfChange)
  }
  return expoOut(time - halfDuration, halfDuration, begin + halfChange, halfChange)
}

export function linear(time: number, duration: number, begin: number, change: number): number {
  return (change * time) / duration + begin
}

export function sinInOut(time: number, duration: number, from: number, to: number): number {
  const change = to - from
  return ((Math.cos(Math.PI + (time / duration) * Math.PI) + 1) / 2) * change + from
}

export function interpolateUniforms(
  delta: number,
  duration: number,
  begin: StrictUniforms,
  end: StrictUniforms,
  canvas: ShaderCanvas,
  interpolate: (time: number, duration: number, from: number, to: number) => number = expoInOut,
) {
  if (!canvas.uniforms) return
  for (const key of Object.keys(begin)) {
    const beginValue = begin[key].value
    const endValue = end[key].value
    const target = canvas.uniforms[key]
    target.value = new (target.value instanceof Float32Array ? Float32Array : Int32Array)(
      target.value.map((_value, i) => interpolate(delta, duration, beginValue[i], endValue[i])),
    )
  }
}
