<script lang="ts">
  import "swiper/css"
  import "swiper/css/effect-coverflow"
  import "swiper/css/mousewheel"
  import "swiper/css/free-mode"
  import "swiper/css/lazy"
  import type {MotionProject} from "../lib/motion-project/motionProject"
  import {Swiper, SwiperSlide} from "swiper/svelte"
  import {Mousewheel, EffectCoverflow, Virtual} from "swiper"
  import MotionProjectItem from "../lib/components/motion-project/MotionProjectItem.svelte"

  export let projects: MotionProject[]
  export let centered: boolean
  export let loaded: boolean
</script>

<svelte:head>
  <title>Theaninova - Motion Graphics</title>
  <meta name="description" content="Motion Graphics by Thea Schöbl" />
</svelte:head>

<section>
  <h1>Motion Design</h1>

  <Swiper
    modules={[Mousewheel, EffectCoverflow, Virtual]}
    direction="vertical"
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
    effect="coverflow"
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
    slides: projects
  }}
    spaceBetween={24}
    let:virtualData={{slides, offset, from}}
  >
    {#each slides as project, index (from + index)}
      <SwiperSlide virtualIndex={from + index} style="left: {offset}px">
        <MotionProjectItem
          {project}
          mode={centered ? 'center' : 'left'}
        />
      </SwiperSlide>
    {/each}
  </Swiper>
</section>

<style lang="scss">
  @keyframes motionPageKeyframes {
    0% {
      font-variation-settings: var(--motionPageTitleFadeInFontVariation);
      opacity: 0;
    }
    100% {
      font-variation-settings: var(--motionPageTitleFontVariation);
      opacity: 1;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .animatedDivContainer {
    width: 100%;
    height: 100%;
  }

  h1 {
    margin: 16px;
    padding: 0;
    font-variation-settings: var(--motionPageTitleFontVariation);
    transition: font-variation-settings 0.5s ease;
    font-size: min(9vw, 120px);
    @media (prefers-reduced-motion: no-preference) {
      animation: motionPageKeyframes 0.8s ease;
    }
  }

  @media (hover: hover) {
    h1:hover {
      font-variation-settings: var(--motionPageTitleHoverFontVariation);
    }
  }

  @media (hover: none) {
    h1:active {
      font-variation-settings: var(--motionPageTitleHoverFontVariation);
    }
  }

  :global(.swiper-styles) {
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
  }
</style>
