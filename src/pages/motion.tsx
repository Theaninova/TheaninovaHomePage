import {RouteComponentProps} from '@reach/router'
import styled, {keyframes} from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react'
import {EffectCoverflow, FreeMode, Lazy, Mousewheel} from 'swiper'
import {motionProjects} from 'components/motion-project/projects'
import React from 'react'
import MotionProjectListItem from '../components/motion-project/MotionProject'
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

import useMediaQuery from '../responsive'

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

const StyledSwiper = styled(Swiper)`
  width: 100%;
  padding: 16px;

  @media (max-width: 768px) {
    height: 100%;
  }
  @media (min-width: 768px) {
    min-height: fit-content;
    max-height: 100%;
    height: 600px;
  }
`

// direction={determineDirection()}
export default function Motion({}: RouteComponentProps) {
  const centerAlign = useMediaQuery('(min-width: 768px)')

  return (
    <Container>
      <Title>Motion Design</Title>
      <StyledSwiper
        modules={[EffectCoverflow, Mousewheel, FreeMode, Lazy]}
        direction={'vertical'}
        slidesPerView={4}
        freeMode={{
          sticky: true,
        }}
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
        spaceBetween={24}
      >
        {motionProjects.map((content, index) => (
          <SwiperSlide key={content.title} virtualIndex={index}>
            {({isActive, isNext, isPrev}) => (
              <MotionProjectListItem
                isActive={isActive}
                isNextOrPrev={isNext || isPrev}
                project={content}
                mode={centerAlign ? 'center' : 'left'}
              />
            )}
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Container>
  )
}
