export function get() {
  const projects = import.meta.globEager("./projects/*.motion.ts")

  return {
    body: {
      projects: Object.entries(projects)
        .map(([key, value]) => ({
          path: key.replace(/\.motion\.ts$/, ""),
          ...value.default,
        }))
        .sort((a, b) => b.priority - a.priority),
    },
  }
}
