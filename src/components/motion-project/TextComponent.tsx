import React, {Component} from 'react'
import {MotionProject, StatusBulb} from 'components/motion-project/motion-project'
import styled, {css} from 'styled-components'
import {
  motionProjectBulbFontVariation,
  motionProjectSubtitleFontVariation,
  motionProjectTitleFontVariation,
} from '../../textStyles'

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 20px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 1);
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

interface Props {
  project: MotionProject
  bulbs: StatusBulb[]
}

export default class TextComponent extends Component<Props> {
  containerRef = React.createRef<HTMLDivElement>()

  render() {
    return (
      <TextContainer ref={this.containerRef}>
        <Title>{this.props.project.title}</Title>
        <Row>
          <CreationDate dateTime={this.props.project.created}>
            {new Date(this.props.project.created).toLocaleDateString()}
          </CreationDate>
          <BulbList>
            {this.props.bulbs.map(bulb => (
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
    )
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    /*if (nextProps.hide !== this.props.hide) {
      this.containerRef.current.style.display = nextProps.hide ? 'none' : 'block'
    }*/

    return nextProps.project !== this.props.project || nextProps.bulbs !== this.props.bulbs
  }
}
