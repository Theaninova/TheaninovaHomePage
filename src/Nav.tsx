import styled from 'styled-components'
import {Link} from '@reach/router'
import {navLinkFontVariation, navLinkHoverFontVariation} from './textStyles'

export const NavContainer = styled.div`
  background-color: var(--greenish-black);
  padding: 8px;
  transition: width, border-radius 0.3s ease;

  @media (min-width: 768px) {
    width: fit-content;
    border-radius: 16px;
    margin: 8px;
  }
  @media (max-width: 768px) {
    width: 100%;
    overflow: scroll;
  }

  @media (hover: hover) {
    :hover {
      border-radius: 8px;
    }
  }
`

export const NavLink = styled(Link)`
  font-variation-settings: ${navLinkFontVariation};
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: white;

  @media (min-width: 768px) {
    font-size: 25px;
    padding: 4px;
  }
  @media (max-width: 768px) {
    font-size: 35px;
    padding: 8px;
  }

  @media (hover: hover) {
    :hover {
      font-variation-settings: ${navLinkHoverFontVariation};
      color: var(--aqua);
    }
  }
  @media (hover: none) {
    :active {
      font-variation-settings: ${navLinkHoverFontVariation};
      color: var(--aqua);
    }
  }
`
