import {Html, Head, Main, NextScript} from 'next/document'
import React from 'react'

export default function Document() {
  // noinspection HtmlRequiredTitleElement,HtmlUnknownTarget
  return (
    <Html lang={'en'}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2a3327" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/icon_180x180.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
