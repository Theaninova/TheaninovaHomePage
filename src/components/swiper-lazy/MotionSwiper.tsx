import {Swiper} from 'swiper/react/swiper-react'
import styled from 'styled-components'

const MotionSwiper = styled(Swiper)`
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

export default MotionSwiper
