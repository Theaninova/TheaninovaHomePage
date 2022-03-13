import React from 'react'
import styled, {css, keyframes} from 'styled-components'
import {RouteComponentProps} from '@reach/router'
import {
  homePageTitleFadeInFontVariation,
  homePageTitleFontVariation,
  homePageTitleHoverFontVariation,
} from '../textStyles'
import {isMobile} from 'react-device-detect'
import {ShaderCanvas} from '../shaders/shaderCanvas'
import {loadCompileShaders} from '../shaders/compileShader'
import {
  theaninovaColors,
  theaninovaInterpolateState,
  theaninovaStateMultiCircles,
} from '../shaders/theaninovaShaderStates'
import {expoOut} from '../shaders/timeline'

const Container = styled.div`
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
    opacity: 0;
  }
  100% {
    font-variation-settings: ${homePageTitleFontVariation};
    opacity: 1;
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

    window.addEventListener('resize', () => {
      this.state.shaderCanvas?.resize()
    })

    this.setState({
      shaderCanvas: new ShaderCanvas(this.state.canvasRef.current, {
        uniforms: {
          ...theaninovaStateMultiCircles,
          ...theaninovaColors,
        },
        frag: await loadCompileShaders('logos/theaninova_simple', ['sdf']),
      }),
    })

    const animate = () => {
      requestAnimationFrame(animate)
      const time = (performance.now() / 10_000) % 1

      theaninovaInterpolateState(time, this.state.shaderCanvas)

      const stamp = expoOut(
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
        <TitleContainer onMouseOver={() => this.hover(true)} onMouseOut={() => this.hover(false)}>
          <Title>Theaninova</Title>
        </TitleContainer>
        {isMobile ? (
          <MobileVideo autoPlay loop muted src={'assets/background-fallback.webm'} />
        ) : (
          <DesktopCanvas ref={this.state.canvasRef} />
        )}
      </Container>
    )
  }
}
