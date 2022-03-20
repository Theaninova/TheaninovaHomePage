import React from 'react'
import {RouteComponentProps} from '@reach/router'
import {isMobile} from 'react-device-detect'
import type {ShaderCanvas} from '../shaders/shaderCanvas'
import styles from './index.module.scss'
import Head from 'next/head'

export default class Index extends React.Component<
  RouteComponentProps,
  {
    textHovering: boolean

    hoverTimestamp: number

    displayWebGL: boolean

    mousePosition: [number, number]

    shaderCanvas?: ShaderCanvas

    canvasRef: React.RefObject<HTMLCanvasElement>
  }
> {
  constructor(properties: RouteComponentProps) {
    super(properties)

    this.state = {
      textHovering: false,
      hoverTimestamp: 0,
      displayWebGL: false,
      mousePosition: [0, 0],
      canvasRef: React.createRef<HTMLCanvasElement>(),
    }
  }

  async componentDidMount() {
    if (isMobile) return

    // we don't want to load the shaders on mobile
    const [canvas, theaninova, shaders, timeline] = await Promise.all([
      import('../shaders/shaderCanvas'),
      import('../shaders/theaninovaShaderStates'),
      import('../shaders/compileShader'),
      import('../shaders/timeline'),
    ])

    window.addEventListener('resize', () => {
      this.state.shaderCanvas?.resize()
    })

    this.setState({
      shaderCanvas: new canvas.ShaderCanvas(this.state.canvasRef.current, {
        uniforms: {
          ...theaninova.theaninovaStateOut,
          ...theaninova.theaninovaColors,
        },
        frag: await shaders.loadCompileShaders('logos/theaninova_simple', ['sdf']),
      }),
    })
    const begin = performance.now()

    const animate = () => {
      requestAnimationFrame(animate)
      theaninova.theaninovaInterpolateState(performance.now(), begin, this.state.shaderCanvas)

      const stamp = timeline.expoOut(
        performance.now() - this.state.hoverTimestamp,
        500,
        this.state.textHovering ? 1 : 0.5,
        this.state.textHovering ? -0.5 : 0.5,
      )
      const uniforms = this.state.shaderCanvas.uniforms
      if (!uniforms) return
      uniforms['margin'].value = new Float32Array([stamp * uniforms['margin'].value[0]])
      /*for (const key of [2, 3, 4].map(i => `circle${i}Offset`)) {
        uniforms[key].value = new Float32Array(uniforms[key].value.map((v, i) => v + this.mousePosition[i]))
      }*/

      this.state.shaderCanvas.updateUniforms()
      this.state.shaderCanvas.render()
    }
    animate()
  }

  hover(isHovering: boolean) {
    this.setState({
      textHovering: isHovering,
      hoverTimestamp: performance.now(),
    })
  }

  render() {
    return (
      <>
        <Head>
          <title>Theaninova</title>
          <meta name="description" content="Thea Schöbl's Home Page" />
        </Head>
        <main className={styles.container}>
          <div
            className={styles.titleContainer}
            onMouseOver={() => this.hover(true)}
            onMouseOut={() => this.hover(false)}
          >
            <h1 className={styles.title}>Theaninova</h1>
          </div>
          {isMobile ? (
            <video
              className={`${styles.background} ${styles.mobileVideo}`}
              autoPlay
              loop
              muted
              playsInline
              src={'assets/background-fallback.webm'}
            />
          ) : (
            <canvas className={styles.background} ref={this.state.canvasRef} />
          )}
        </main>
      </>
    )
  }
}
