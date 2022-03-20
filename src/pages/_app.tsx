import React from 'react'
import {AppProps} from 'next/app'
import {PageTransition} from 'next-page-transitions'
import Link from 'next/link'

import 'swiper/scss'
import 'swiper/scss/effect-coverflow'
import 'swiper/scss/mousewheel'
import 'swiper/scss/free-mode'
import 'swiper/scss/lazy'
import '../styles.scss'
import '../page-transitions.scss'
import styles from './_app.module.scss'

export default function TheaninovaApp({Component, pageProps}: AppProps) {
  return (
    <>
      <nav className={styles.navContainer}>
        <Link href="/">
          <a className={styles.navLink}>Home</a>
        </Link>
        <Link href="/motion">
          <a className={styles.navLink}>Motion</a>
        </Link>
        <Link href="/programming">
          <a className={styles.navLink}>Programming</a>
        </Link>
        <Link href="/design">
          <a className={styles.navLink}>Design</a>
        </Link>
        <Link href="/about">
          <a className={styles.navLink}>About</a>
        </Link>
      </nav>

      <PageTransition
        timeout={300}
        classNames="page-transition"
        loadingComponent={<p>Loading...</p>}
        loadingClassNames="page-transition-loading"
        loadingDelay={300}
        loadingTimeout={300}
      >
        <Component {...pageProps} />
      </PageTransition>
    </>
  )
}
