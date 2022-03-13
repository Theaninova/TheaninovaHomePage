import React from 'react'
import {MotionProject, officialBulbs, sourceFileStatusBulbs, toolBulbs} from './motion-project'
import styled, {css} from 'styled-components'
import {
  motionProjectBulbFontVariation,
  motionProjectSubtitleFontVariation,
  motionProjectTitleFontVariation,
} from '../../textStyles'

interface Props {
  project: MotionProject
  mode: 'center' | 'left'
}

const containerLeft = css`
  width: fit-content;

  // overlap
  display: grid;
  align-items: center;
  align-content: start;
  justify-items: start;
`

const containerCenter = css`
  width: min(500px, 100%);

  // overlap
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
`

const Container = styled.div<{mode: 'center' | 'left'}>`
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
  clip-path: circle();
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
  ${mediaStyle}
`

const StyledImg = styled.img`
  ${mediaStyle}
`

const Title = styled.h2`
  font-size: 40px;
  font-variation-settings: ${motionProjectTitleFontVariation};
  margin: 0;
  padding-bottom: 0;

  transition: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    font-size: 60px;
  }

  /*@media (hover: hover) {
    :hover {
      font-variation-settings: ;
    }
  }
  @media (hover: none) {
    user-select: none;

    :active {
      font-variation-settings: ;
    }
  }*/
`
const Row = styled.div`
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

const Subtitle = styled.p`
  ${subtitleAdditionalStyles};
  font-variation-settings: ${motionProjectSubtitleFontVariation};
  padding: 0 8px 2px;
  margin: 0;
  border-radius: 12.5px;
  background-color: rgba(black, 0.5);
`

const Bulb = styled.div`
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

  return (
    <Container mode={props.mode}>
      <TextContainer>
        <Title>{props.project.title}</Title>
        <Row>
          <Subtitle>{new Date(props.project.created).toLocaleDateString()}</Subtitle>
          <Row>
            {bulbs.map(bulb => (
              <Bulb style={{backgroundColor: `${bulb.color}77`}} className={'bulb'} key={bulb.label}>
                {bulb.label.toUpperCase()}
              </Bulb>
            ))}
          </Row>
        </Row>
      </TextContainer>
      {props.project.image.endsWith('.webm') ? (
        <StyledVideo src={`assets/motion/${props.project.image}`} autoPlay loop muted />
      ) : (
        <StyledImg src={`assets/motion/${props.project.image}`} alt={props.project.title} />
      )}
    </Container>
  )
}
