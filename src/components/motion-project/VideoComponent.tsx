import React, {Component} from 'react'
import styles from './VideoComponent.module.scss'

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
      <video
        className={styles.videoStyle}
        ref={this.videoRef}
        src={this.props.fullVideoSource}
        poster={this.props.staticImage}
        loop={true}
        playsInline={true}
        muted={true}
        preload={'none'}
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
