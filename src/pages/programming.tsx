import React from 'react'
import Head from 'next/head'

export default function Programming() {
  return (
    <>
      <Head>
        <title>Theaninova - Programming</title>
        <meta name="description" content="Programming by Thea Schöbl" />
      </Head>
      <main>
        <h1>Programming</h1>
        <p>
          <i>This is still under construction. For now, you can find my projects here:</i>
          <a href={'https://github.com/Theaninova'} target={'_blank'} rel="noreferrer">
            GitHub
          </a>
        </p>

        <img
          src={'https://github-readme-stats.vercel.app/api?username=Theaninova&count_private=true'}
          alt={"Thea Schöbl's GitHub stats"}
        />
        <img
          src={
            'https://github-readme-stats.vercel.app/api/top-langs/?username=Theaninova&layout=compact&langs_count=30&hide=CMake,Makefile,HTML'
          }
          alt={"Thea Schöbl's top programming languages"}
        />
      </main>
    </>
  )
}
