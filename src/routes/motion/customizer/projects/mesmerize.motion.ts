import type {CustomizableMotionProject} from "../../../../lib/motion-project/customizable-motion-project"
import {interpolateUniforms, linear, sinInOut} from "../../../../lib/shaders/timeline"
import {toStrictUniforms} from "../../../../lib/shaders/shaderCanvas"

const fragmentShader = `
varying vec2 v_texcoord;

uniform float scale;

uniform float zoom;
uniform float infinite_spiral;
uniform float squash;
uniform float inner_cutoff;
uniform float outer_cutoff;
uniform float spirals_count;
uniform float thickness;

uniform float threshold;

uniform float gradient_start;
uniform float gradient_end;

uniform vec4 background;
uniform vec4 inner;
uniform vec4 outer;

float spiralSdf(vec2 uv) {
  uv.y *= squash;
  uv = rotate(uv, infinite_spiral);

  float distance = length(uv);

  float spiralSdf = sin((conical_gradient(uv) * 2.0 * spirals_count * M_PI) + ((1.0 / zoom) / distance)) + thickness;
  float cutoffSdf = float(distance > outer_cutoff) + float(distance < inner_cutoff);

  return max(spiralSdf, cutoffSdf);
}

void main() {
  vec2 uv = v_texcoord;
  uv *= scale;

  float sdf = 1000000.0;
  float angle = 180.0 / float(spiral_iteration_count);
  for (int i = 0; i < spiral_iteration_count; i++) {
    sdf = min(sdf, spiralSdf(rotate(uv, angle * float(i))));
  }
  sdf = float(sdf > threshold);

  float gradient_mix = map_range(length(uv), gradient_start, gradient_end, 0.0, 1.0);

  gl_FragColor = mix(mix(inner, outer, gradient_mix), background, sdf);
}
`

const spiralLoopStart = toStrictUniforms({infinite_spiral: 0})
const spiralLoopEnd = toStrictUniforms({infinite_spiral: 360})
const squashStart = toStrictUniforms({squash: 2.29})
const squashEnd = toStrictUniforms({squash: 2.81})

const project: CustomizableMotionProject = {
  name: "Mesmerize",
  description: "A mesmerizing spiral",
  priority: 0,
  variations: {
    spiral_iteration_count: 3,
  },
  colors: {
    background: "#000000",
    outer: "#FF1C00",
    inner: "#3d51ff",
  },
  uniforms: {
    gradient_start: 0.01,
    gradient_end: 0.91,
    infinite_spiral: 291,
    squash: 2.458,
    scale: 1.5,
    zoom: 0.03,
    inner_cutoff: 0.23,
    outer_cutoff: 1.27,
    spirals_count: 1,
    thickness: 0.24,
    threshold: 0.02,
  },
  fragmentShader,
  dependencies: ["sdf", "conical gradient", "map range"],
  render(shaderCanvas, time) {
    const delta = (time / 2000) % 1

    if (delta < 0.5) {
      interpolateUniforms(delta, 0.5, squashStart, squashEnd, shaderCanvas, sinInOut)
    } else {
      interpolateUniforms(delta - 0.5, 0.5, squashEnd, squashStart, shaderCanvas, sinInOut)
    }
    interpolateUniforms(delta, 1, spiralLoopStart, spiralLoopEnd, shaderCanvas, linear)
  },
}

export default project
