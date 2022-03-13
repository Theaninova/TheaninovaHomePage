import React from 'react'
import {Routes, addPrefetchExcludes} from 'react-static'
import {Router} from '@reach/router'
import './styles.scss'
import styled from 'styled-components'
import {NavContainer, NavLink} from './Nav'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

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

export default function App() {
  return (
    <Container>
      <NavContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/motion">Motion</NavLink>
        <NavLink to="/programming">Programming</NavLink>
        <NavLink to="/design">Design</NavLink>
        <NavLink to="/about">About</NavLink>
      </NavContainer>

      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterContainer>
          <Routes default />
        </RouterContainer>
      </React.Suspense>
    </Container>
  )
}
