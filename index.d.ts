// Allow importing images,
// you can add other formats supported by file-loader
declare module '*.jpg' {
  const content: string
  export default content
}
declare module '*.png' {
  const content: string
  export default content
}
