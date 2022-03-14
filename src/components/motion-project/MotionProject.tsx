import React, {useEffect, useRef} from 'react'
import {MotionProject, officialBulbs, sourceFileStatusBulbs, toolBulbs} from './motion-project'
import styled, {css} from 'styled-components'
import {
  motionProjectBulbFontVariation,
  motionProjectSubtitleFontVariation,
  motionProjectTitleFontVariation,
} from '../../textStyles'
import useMediaQuery from '../../responsive'

interface Props {
  project: MotionProject
  mode: 'center' | 'left'
  isActive: boolean
  isNextOrPrev: boolean
}

const containerLeft = css`
  width: fit-content;

  // overlap
  display: grid;
  align-items: center;
  align-content: start;
  justify-items: start;
`

const overlap = css`
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
`

const containerCenter = css`
  width: min(500px, 100%);
  ${overlap}
`

const Container = styled.section<{mode: 'center' | 'left'}>`
  ${props => (props.mode === 'left' ? containerLeft : containerCenter)};
`

const TextContainer = styled.div`
  z-index: 4;
  grid-column: 1;
  grid-row: 1;
  width: max-content;
  padding: 8px 20px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  text-shadow: 0 0 10px rgba(0, 0, 0, 1);
`

const mediaStyle = css`
  border-radius: 100%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  object-fit: cover;

  grid-column: 1;
  grid-row: 1;

  @media (min-width: 768px) {
    width: 256px;
    height: 256px;
  }
`

const StyledVideo = styled.video`
  transition: filter 0.5s;
  ${mediaStyle};
`

const StyledImg = styled.img`
  ${mediaStyle}
`

const Title = styled.h2`
  font-size: 40px;
  font-variation-settings: ${motionProjectTitleFontVariation};
  margin: 0;
  padding-bottom: 0;

  @media (min-width: 768px) {
    font-size: 60px;
  }
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
`

const BulbList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;

  .bulb:first-child {
    border-radius: 12.5px 0 0 12.5px;
    padding-left: 6px;
  }

  .bulb:last-child {
    border-radius: 0 12.5px 12.5px 0;
    padding-right: 6px;
  }
`

const subtitleAdditionalStyles = css`
  display: flex;
  text-shadow: none;
  height: 20px;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`

const CreationDate = styled.time`
  ${subtitleAdditionalStyles};
  font-variation-settings: ${motionProjectSubtitleFontVariation};
  padding: 0 8px 2px;
  margin: 0;
  border-radius: 12.5px;
  background-color: rgba(black, 0.5);
`

const Bulb = styled.li`
  ${subtitleAdditionalStyles};
  font-variation-settings: ${motionProjectBulbFontVariation};
  padding: 0 3px 2px;
  color: #171c14;
`

export default function MotionProjectListItem(props: Props) {
  const bulbs = [
    ...(props.project.sourceFileStatus ? [sourceFileStatusBulbs[props.project.sourceFileStatus]] : []),
    ...(props.project.official ? [officialBulbs[props.project.official]] : []),
    ...(props.project.tool ? props.project.tool.map(it => toolBulbs[it]) : []),
  ]

  // TODO: const previewSource = `/assets/motion/thumbs/x32/${props.project.image}`
  const fullVideoSource = `/assets/motion/thumbs/${props.project.image}`
  const staticImage = `assets/motion/thumbs/thumbs/${props.project.image}.jpg`
  const source = fullVideoSource

  const videoRef = useRef<HTMLVideoElement>()
  const allowVideo = useMediaQuery('(prefers-reduced-motion: no-preference)')
  useEffect(() => {
    if (allowVideo && (props.isActive || props.isNextOrPrev)) {
      void videoRef?.current?.play()
    } else {
      videoRef?.current?.pause()
    }
  }, [allowVideo, props.isActive, props.isNextOrPrev])

  return (
    <Container mode={props.mode}>
      <TextContainer>
        <Title>{props.project.title}</Title>
        <Row>
          <CreationDate dateTime={props.project.created}>
            {new Date(props.project.created).toLocaleDateString()}
          </CreationDate>
          <BulbList>
            {bulbs.map(bulb => (
              <Bulb
                title={bulb.label}
                style={{backgroundColor: `${bulb.color}77`}}
                className={'bulb'}
                key={bulb.label}
              >
                <abbr style={{textDecoration: 'none'}}>{bulb.abbr.toUpperCase()}</abbr>
              </Bulb>
            ))}
          </BulbList>
        </Row>
      </TextContainer>
      {/* TODO: replace everything with proper videos */}
      {props.project.image.endsWith('.webm') ? (
        <StyledVideo
          src={source}
          ref={videoRef}
          poster={staticImage}
          preload={'none'}
          loop
          playsInline
          muted
          className={'swiper-lazy'}
          style={{filter: props.isActive || props.isNextOrPrev ? 'blur(0)' : 'blur(10px)'}}
        />
      ) : (
        <StyledImg
          src={`assets/motion/logos/${props.project.image}`}
          className={'swiper-lazy'}
          alt={props.project.title}
          style={{filter: props.isActive || props.isNextOrPrev ? 'blur(0)' : 'blur(10px)'}}
        />
      )}
    </Container>
  )
}
