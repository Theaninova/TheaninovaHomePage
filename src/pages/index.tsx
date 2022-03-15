import React from 'react'
import styled, {css, keyframes} from 'styled-components'
import {RouteComponentProps} from '@reach/router'
import {
  homePageTitleFadeInFontVariation,
  homePageTitleFontVariation,
  homePageTitleHoverFontVariation,
} from '../textStyles'
import {isMobile} from 'react-device-detect'
import type {ShaderCanvas} from '../shaders/shaderCanvas'
import {Helmet} from 'react-helmet'

const Container = styled.main`
  display: grid;
  height: 100%;
  width: 100%;
`

const TitleContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const titleAnimation = keyframes`
  0% {
    font-variation-settings: ${homePageTitleFadeInFontVariation};
  }
  100% {
    font-variation-settings: ${homePageTitleFontVariation};
  }
`

const Title = styled.h1`
  padding: 16px;
  z-index: 1;
  margin: 0;
  font-size: min(14vw, 200px);
  text-align: center;
  font-variation-settings: ${homePageTitleFontVariation};
  transition: font-variation-settings 0.25s ease;

  user-select: none;

  animation: ${titleAnimation} 1.5s ease;
  text-shadow: 0 0 50px rgba(0, 0, 0, 0.5);

  @media (hover: hover) {
    :hover {
      font-variation-settings: ${homePageTitleHoverFontVariation};
    }
  }
  @media (hover: none) {
    .title:active {
      font-variation-settings: ${homePageTitleHoverFontVariation};
    }
    transition: font-variation-settings 0.1s ease;
  }
`

const backgroundCss = css`
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
`

const MobileVideo = styled.video`
  ${backgroundCss};
  overflow: hidden;
  object-fit: contain;
  background-color: var(--dark-green);
`

const DesktopCanvas = styled.canvas`
  ${backgroundCss};
`

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
      <Container>
        <Helmet>
          <title>Theaninova</title>
          <meta name="description" content="The home page of Thea Schöbl" />
        </Helmet>
        <TitleContainer onMouseOver={() => this.hover(true)} onMouseOut={() => this.hover(false)}>
          <Title>Theaninova</Title>
        </TitleContainer>
        {isMobile ? (
          <MobileVideo autoPlay loop muted playsInline src={'assets/background-fallback.webm'} />
        ) : (
          <DesktopCanvas ref={this.state.canvasRef} />
        )}
      </Container>
    )
  }
}
