export type FEATURES =
  | "sdf"
  | "voronoi texture"
  | "math util"
  | "hash"
  | "noise texture"
  | "fractal noise"
  | "noise"
  | "gradient texture"
  | "hue sat val"
  | "color util"
  | "invert"
  | "conical gradient"

export interface ShaderFeature {
  path: string
  requires?: FEATURES[]
}

const FEATURES_MAP: Record<FEATURES, ShaderFeature> = {
  "sdf": {path: "sdf"},
  "voronoi texture": {
    path: "blender/material/gpu_shader_material_tex_voronoi",
    requires: ["math util", "hash"],
  },
  "math util": {path: "blender/material/gpu_shader_material_math_util"},
  "hash": {path: "blender/material/gpu_shader_material_hash"},
  "noise texture": {
    path: "blender/material/gpu_shader_material_tex_noise",
    requires: ["hash", "fractal noise"],
  },
  "fractal noise": {path: "blender/material/gpu_shader_material_fractal_noise", requires: ["noise"]},
  "noise": {path: "blender/material/gpu_shader_material_noise"},
  "gradient texture": {path: "blender/material/gpu_shader_material_tex_gradient"},
  "hue sat val": {path: "blender/material/gpu_shader_material_hue_sat_val", requires: ["color util"]},
  "color util": {path: "blender/material/gpu_shader_material_color_util"},
  "invert": {path: "blender/material/gpu_shader_material_invert"},
  "conical gradient": {path: "conical_gradient"},
}

export async function loadCompileShaders(
  shaderSource: string,
  features: FEATURES[],
  defines: Record<string, number> = {},
) {
  const shader = shaderSource.includes("\n") ? shaderSource : loadSingleShader(shaderSource)
  defines.M_PI = Math.PI
  return `precision mediump float;\n${Object.entries(defines)
    .map(([name, value]) => `#define ${name} ${value}`)
    .join("\n")}\n${await Promise.all(assembleRequirements(features).map(loadSingleShader)).then(it =>
    it.join("\n"),
  )}\n${await shader}`
}

/**
 * If one feature is required by another deeply
 */
function requiresDeep(feature: FEATURES, required: FEATURES): boolean {
  return (
    feature === required || (FEATURES_MAP[feature]?.requires?.some(f => requiresDeep(f, required)) ?? false)
  )
}

function sortByRequired(a: FEATURES, b: FEATURES): number {
  return requiresDeep(a, b) ? 1 : requiresDeep(b, a) ? -1 : 0
}

export function assembleRequirements(features: FEATURES[]): FEATURES[] {
  return [
    ...new Set(
      features.flatMap(feat => {
        const reqs = FEATURES_MAP[feat].requires || []
        return [feat, ...reqs, ...assembleRequirements(reqs)]
      }),
    ),
  ].sort(sortByRequired)
}

export async function loadSingleShader(path: FEATURES | string): Promise<string> {
  return fetch(`/assets/shaders/${FEATURES_MAP[path]?.path ?? path}.glsl`).then(r => r.text())
}
