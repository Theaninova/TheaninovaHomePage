import {RouteComponentProps} from '@reach/router'
import React, {Component} from 'react'
import MotionProjectListItem from '../components/motion-project/MotionProjectComponent'
import {animated, Transition} from 'react-spring'
import {Swiper, SwiperSlide} from 'swiper/react'
import styles from './motion.module.scss'
import {EffectCoverflow, Mousewheel, Virtual} from 'swiper'
import {MotionProject} from 'components/motion-project/motionProject'
import Head from 'next/head'

interface State {
  projects: MotionProject[]
  centered: boolean
  loaded: boolean
}

export default class Motion extends Component<RouteComponentProps, State> {
  projects: Promise<MotionProject[]>

  mediaQueryHandler: (event: MediaQueryListEvent) => unknown

  mediaQuery: MediaQueryList

  constructor(props: RouteComponentProps) {
    super(props)

    this.projects = import('components/motion-project/projects').then(it => it.motionProjects)
  }

  componentWillUnmount() {
    this.mediaQuery.removeEventListener('change', this.mediaQueryHandler)
  }

  async componentDidMount() {
    this.mediaQuery = window.matchMedia('(min-width: 768px)')
    this.mediaQueryHandler = event =>
      this.setState({...(this.state || ({} as State)), centered: event.matches})
    this.mediaQuery.addEventListener('change', this.mediaQueryHandler)

    this.setState({
      centered: this.mediaQuery.matches,
      projects: await this.projects,
      loaded: true,
    })
  }

  render() {
    return (
      <>
        <Head>
          <title>Theaninova - Motion Graphics</title>
          <meta name="description" content="Motion Graphics by Thea Schöbl" />
        </Head>
        <main className={styles.container}>
          <h1 className={styles.title}>Motion Design</h1>
          <Transition
            items={this.state?.loaded}
            from={{opacity: 0}}
            enter={{opacity: 1}}
            leave={{opacity: 0}}
          >
            {(animatedStyle, item) =>
              item && (
                <animated.div style={animatedStyle} className={styles.animatedDivContainer}>
                  <Swiper
                    className={styles.swiperStyles}
                    modules={[Mousewheel, EffectCoverflow, Virtual]}
                    direction={'vertical'}
                    slidesPerView={2}
                    breakpoints={{
                      768: {
                        direction: 'horizontal',
                        slidesPerView: 1.5,
                      },
                      1024: {
                        direction: 'horizontal',
                        slidesPerView: 2,
                      },
                      1440: {
                        direction: 'horizontal',
                        slidesPerView: 3,
                      },
                      1920: {
                        direction: 'horizontal',
                        slidesPerView: 4,
                      },
                    }}
                    effect={'coverflow'}
                    centeredSlides={true}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 200,
                      modifier: 1,
                      slideShadows: false,
                    }}
                    mousewheel
                    virtual={{
                      enabled: true,
                      cache: true,
                      addSlidesAfter: 1,
                      addSlidesBefore: 1,
                    }}
                    spaceBetween={24}
                  >
                    {this.state.projects.map((content, index) => (
                      <SwiperSlide key={content.title} virtualIndex={index}>
                        <MotionProjectListItem
                          project={content}
                          mode={this.state.centered ? 'center' : 'left'}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </animated.div>
              )
            }
          </Transition>
        </main>
      </>
    )
  }
}
