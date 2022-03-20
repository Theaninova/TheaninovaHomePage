/* eslint-disable-next-line unicorn/filename-case */
declare module 'next-page-transitions' {
  interface PageTransitionProps {
    classNames?: string | string[]
    loadingClassNames?: string | string[]
    tag?: string
    loadingComponent?: JSX.Element
    loadingTimeout?: number
    loadingCallbackName?: string
    loadingDelay?: number
    timeout?: number
    monkeyPatchScrolling?: boolean
    skipInitialTransition?: boolean
  }

  export class PageTransition extends React.Component<PageTransitionProps> {}
}
