import React, {Component} from 'react'
import {MotionProject, StatusBulb} from 'components/motion-project/motionProject'
import styles from './TextComponent.module.scss'

interface Props {
  project: MotionProject
  bulbs: StatusBulb[]
}

export default class TextComponent extends Component<Props> {
  containerRef = React.createRef<HTMLDivElement>()

  render() {
    return (
      <div className={styles.textContainer} ref={this.containerRef}>
        <h2 className={styles.title}>{this.props.project.title}</h2>
        <div className={styles.row}>
          <time className={`${styles.subtitle} ${styles.creationDate}`} dateTime={this.props.project.created}>
            {new Date(this.props.project.created).toLocaleDateString()}
          </time>
          <ul className={styles.bulbList}>
            {this.props.bulbs.map(bulb => (
              <li
                title={bulb.label}
                style={{backgroundColor: `${bulb.color}77`}}
                className={`${styles.subtitle} ${styles.bulb}`}
                key={bulb.label}
              >
                <abbr style={{textDecoration: 'none'}}>{bulb.abbr.toUpperCase()}</abbr>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    /*if (nextProps.hide !== this.props.hide) {
      this.containerRef.current.style.display = nextProps.hide ? 'none' : 'block'
    }*/

    return nextProps.project !== this.props.project || nextProps.bulbs !== this.props.bulbs
  }
}
