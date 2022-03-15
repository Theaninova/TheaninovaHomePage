import React from 'react'
import {Routes, addPrefetchExcludes} from 'react-static'
import styled, {createGlobalStyle} from 'styled-components'
import {NavContainer, NavLink} from './Nav'
import {Transition, animated} from 'react-spring'
import {Router} from '@reach/router'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])
// @ts-expect-error TODO: font doesn't have types
import RobotoFlex from './fonts/roboto-flex.min.ttf'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const RouterContainer = styled(Router)`
  align-self: stretch;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto Flex';
    src: url(${RobotoFlex}) format('woff2 supports variations'),
         url(${RobotoFlex}) format('woff2-variations');
    font-weight: 100 1000;
    font-stretch: 25% 151%;
  }

  html {
    overflow: hidden;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  body {
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    font-family: 'Roboto Flex', Roboto, sans-serif;

    --aqua: #5AD0D1;
    --pink: #E94CDA;
    --background: #171C14;
    --greenish-black: #2A3326;
    --dark-green: #171c14;

    // glowing pink
    --on-background: #fffcff;

    color: var(--on-background);
    background-color: var(--background);
  }

  @media (min-width: 768px) {
    .swiper-slide {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`

export default function App() {
  return (
    <Container>
      <GlobalStyle />
      <NavContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/motion">Motion</NavLink>
        <NavLink to="/programming">Programming</NavLink>
        <NavLink to="/design">Design</NavLink>
        <NavLink to="/about">About</NavLink>
      </NavContainer>

      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterContainer>
          <Routes
            default
            render={({routePath, getComponentForPath}) => {
              return (
                <Transition items={routePath} from={{opacity: 0}} enter={{opacity: 1}} leave={{opacity: 0}}>
                  {/* eslint-disable-next-line react/display-name */}
                  {(style, item) => {
                    return (
                      <animated.div
                        style={{
                          ...style,
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        {getComponentForPath(item)}
                      </animated.div>
                    )
                  }}
                </Transition>
              )
            }}
          />
        </RouterContainer>
      </React.Suspense>
    </Container>
  )
}
