import React, {ReactElement} from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './App'

// Render your app
if (typeof document !== 'undefined') {
  const target = document.querySelector('#root')

  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render

  const render = (Comp: () => ReactElement) => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      target,
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  // eslint-disable-next-line unicorn/prefer-module
  if (module && module.hot) {
    // eslint-disable-next-line unicorn/prefer-module
    module.hot.accept('./App', () => {
      render(App)
    })
  }
}

export {default} from './App'
