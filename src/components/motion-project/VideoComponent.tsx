import React, {Component} from 'react'
import styled, {css} from 'styled-components'

const mediaStyle = css`
  border-radius: 100%;
  width: 256px;
  height: 256px;
  overflow: hidden;
  object-fit: cover;

  grid-column: 1;
  grid-row: 1;

  /*@media (min-width: 768px) {
    width: 256px;
    height: 256px;
  }*/
`

const StyledVideo = styled.video`
  transition: filter 0.5s;
  ${mediaStyle};
`

interface Props {
  allowVideo: boolean
  playVideo: boolean
  fullVideoSource: string
  staticImage: string
}

export default class VideoComponent extends Component<Props> {
  videoRef = React.createRef<HTMLVideoElement>()

  render() {
    return (
      <StyledVideo
        ref={this.videoRef}
        src={this.props.fullVideoSource}
        poster={this.props.staticImage}
        loop={true}
        playsInline={true}
        muted={true}
        preload={'none'}
        className={'swiper-lazy'}
      />
    )
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    if (nextProps.playVideo !== this.props.playVideo || nextProps.allowVideo !== this.props.allowVideo) {
      if (nextProps.allowVideo && nextProps.playVideo) {
        void this.videoRef.current.play()
        this.videoRef.current.style.filter = 'blur(0px)'
      } else {
        this.videoRef.current.pause()
        this.videoRef.current.style.filter = 'blur(10px)'
      }
      return false
    }

    return (
      nextProps.fullVideoSource !== this.props.fullVideoSource ||
      nextProps.staticImage !== this.props.staticImage
    )
  }
}
