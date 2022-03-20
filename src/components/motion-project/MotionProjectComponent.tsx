import React, {useEffect, useMemo, useState} from 'react'
import {MotionProject, officialBulbs, sourceFileStatusBulbs, toolBulbs} from './motionProject'
import {useSwiperSlide} from 'swiper/react'
import useMediaQuery from '../../responsive'
import {animated, useSpring} from 'react-spring'
import VideoComponent from 'components/motion-project/VideoComponent'
import TextComponent from 'components/motion-project/TextComponent'
import styles from './MotionProjectComponent.module.scss'

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
  const [springStyles] = useSpring(
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
    <section className={mode === 'left' ? styles.containerLeft : styles.containerCenter}>
      <animated.div className={styles.textContainer} style={springStyles}>
        <TextComponent project={project} bulbs={bulbs} />
      </animated.div>
      <VideoComponent
        allowVideo={allowVideo}
        playVideo={playVideo}
        fullVideoSource={fullVideoSource}
        staticImage={staticImage}
      />
    </section>
  )
}
