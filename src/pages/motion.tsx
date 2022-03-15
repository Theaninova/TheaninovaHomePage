import {RouteComponentProps} from '@reach/router'
import styled, {keyframes} from 'styled-components'
import React, {Component} from 'react'
import type MotionProjectListItem from '../components/motion-project/MotionProject'
import {
  motionPageTitleFadeInFontVariation,
  motionPageTitleFontVariation,
  motionPageTitleHoverFontVariation,
} from '../textStyles'

import 'swiper/swiper.min.css'
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css'
import 'swiper/modules/mousewheel/mousewheel.min.css'
import 'swiper/modules/free-mode/free-mode.min.css'
import 'swiper/modules/lazy/lazy.min.css'

import {Helmet} from 'react-helmet'
import {isMobile} from 'react-device-detect'
import {animated, Transition} from 'react-spring'
import type MotionSwiper from 'components/swiper-lazy/MotionSwiper'
import type SwiperSlide from 'components/swiper-lazy/SwiperSlide'
import type {SwiperModule} from 'swiper/types/shared'
import type {MotionProject} from 'components/motion-project/motion-project'

const motionPageKeyframes = keyframes`
  0% {
    font-variation-settings: ${motionPageTitleFadeInFontVariation};
    opacity: 0;
  }
  100% {
    font-variation-settings: ${motionPageTitleFontVariation};
    opacity: 1;
  }
`

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const AnimatedDivContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
`

const Title = styled.h1`
  margin: 16px;
  padding: 0;
  font-variation-settings: ${motionPageTitleFontVariation};
  transition: font-variation-settings 0.5s ease;
  font-size: min(9vw, 120px);
  @media (prefers-reduced-motion: no-preference) {
    animation: ${motionPageKeyframes} 0.8s ease;

    @media (hover: hover) {
      :hover {
        font-variation-settings: ${motionPageTitleHoverFontVariation};
      }
    }
    @media (hover: none) {
      :active {
        font-variation-settings: ${motionPageTitleHoverFontVariation};
      }
    }
  }
`

interface State {
  StyledSwiper: typeof MotionSwiper
  SwiperSlide: typeof SwiperSlide
  MotionProject: typeof MotionProjectListItem
  modules: SwiperModule[]
  projects: MotionProject[]
  centered: boolean
  loaded: boolean
}

export default class Motion extends Component<RouteComponentProps, State> {
  SwiperComponent: Promise<typeof MotionSwiper>

  SwiperSlideComponent: Promise<typeof SwiperSlide>

  MotionProjectComponent: Promise<typeof MotionProjectListItem>

  projects: Promise<MotionProject[]>

  modules: Promise<SwiperModule[]>

  mediaQueryHandler: (event: MediaQueryListEvent) => unknown

  mediaQuery: MediaQueryList

  constructor(props: RouteComponentProps) {
    super(props)

    this.SwiperComponent = import('components/swiper-lazy/MotionSwiper').then(it => it.default)
    this.SwiperSlideComponent = import('components/swiper-lazy/SwiperSlide').then(it => it.default)
    this.MotionProjectComponent = import('components/motion-project/MotionProject').then(it => it.default)

    this.projects = import('components/motion-project/projects').then(it => it.motionProjects)
    this.modules = Promise.all([
      ...(isMobile ? [] : [import('swiper/modules/mousewheel/mousewheel.js')]),
      import('swiper/modules/effect-coverflow/effect-coverflow.js'),
      import('swiper/modules/virtual/virtual.js'),
    ]).then(it => it.map(module => module.default))
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
      StyledSwiper: await this.SwiperComponent,
      SwiperSlide: await this.SwiperSlideComponent,
      MotionProject: await this.MotionProjectComponent,
      projects: await this.projects,
      modules: await this.modules,
      loaded: true,
    })
  }

  render() {
    // const centerAlign = useMediaQuery('(min-width: 768px)')

    return (
      <Container>
        <Helmet>
          <title>Theaninova</title>
          <meta name="description" content="Motion Graphics by Thea Schöbl" />
        </Helmet>
        <Title>Motion Design</Title>
        <Transition items={this.state?.loaded} from={{opacity: 0}} enter={{opacity: 1}} leave={{opacity: 0}}>
          {(styles, item) =>
            item && (
              <AnimatedDivContainer style={styles}>
                <this.state.StyledSwiper
                  modules={this.state.modules}
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
                    <this.state.SwiperSlide key={content.title} virtualIndex={index}>
                      <this.state.MotionProject
                        project={content}
                        mode={this.state.centered ? 'center' : 'left'}
                      />
                    </this.state.SwiperSlide>
                  ))}
                </this.state.StyledSwiper>
              </AnimatedDivContainer>
            )
          }
        </Transition>
      </Container>
    )
  }
}
