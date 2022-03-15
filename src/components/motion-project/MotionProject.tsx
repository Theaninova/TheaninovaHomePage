import React, {useEffect, useMemo, useState} from 'react'
import {MotionProject, officialBulbs, sourceFileStatusBulbs, toolBulbs} from './motion-project'
import styled, {css} from 'styled-components'
import {useSwiperSlide} from 'swiper/react/swiper-react'
import useMediaQuery from '../../responsive'
import {animated, useSpring} from 'react-spring'
import VideoComponent from 'components/motion-project/VideoComponent'
import TextComponent from 'components/motion-project/TextComponent'

const containerLeft = css`
  width: 100%;
  height: 256px;

  // overlap
  display: grid;
  align-items: center;
  align-content: start;
  justify-items: start;
`

const containerCenter = css`
  width: 500px;
  height: 256px;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
`

const Container = styled.section<{mode: 'center' | 'left'}>`
  ${props => (props.mode === 'left' ? containerLeft : containerCenter)};
`

const TextContainer = styled(animated.div)`
  grid-column: 1;
  grid-row: 1;
  z-index: 4;
`

interface Props {
  project: MotionProject
  mode: 'center' | 'left'
}

export default function MotionProjectListItem({mode, project}: Props) {
  const bulbs = useMemo(
    () => [
      ...(project.sourceFileStatus ? [sourceFileStatusBulbs[project.sourceFileStatus]] : []),
      ...(project.official ? [officialBulbs[project.official]] : []),
      ...(project.tool ? project.tool.map(it => toolBulbs[it]) : []),
    ],
    [project],
  )

  const slide = useSwiperSlide()

  // TODO: const previewSource = `/assets/motion/thumbs/x32/${props.project.image}`
  const allowVideo = useMediaQuery('(prefers-reduced-motion: no-preference)')
  const [playVideo, setPlayVideo] = useState(false)
  const [styles] = useSpring(
    {
      to: playVideo ? [{display: 'block'}, {opacity: 1}] : [{opacity: 0}, {display: 'none'}],
      config: {duration: 150},
    },
    [playVideo],
  )
  useEffect(() => {
    setPlayVideo(slide.isActive || (mode === 'center' && (slide.isNext || slide.isPrev)))
  }, [slide.isNext, slide.isActive, slide.isPrev, mode])

  const staticImage = useMemo(() => `/assets/motion/thumbs/thumbs/${project.image}.jpg`, [project])
  const fullVideoSource = useMemo(() => `/assets/motion/thumbs/${project.image}`, [project])

  return (
    <Container mode={mode}>
      <TextContainer style={styles}>
        <TextComponent project={project} bulbs={bulbs} />
      </TextContainer>
      <VideoComponent
        allowVideo={allowVideo}
        playVideo={playVideo}
        fullVideoSource={fullVideoSource}
        staticImage={staticImage}
      />
    </Container>
  )
}
