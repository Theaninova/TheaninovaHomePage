export function get() {
  const projects = import.meta.globEager("./projects/*.svx")

  return {
    body: {
      projects: Object.entries(projects)
        .map(([key, value]) => ({
          path: key.replace(/\.svx$/, ""),
          ...value.metadata,
        }))
        // @ts-expect-error date subtraction
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    }
  }
}
