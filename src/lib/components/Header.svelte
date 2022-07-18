<nav>
  <a href="/">
    Home
  </a>
  <a href="/motion/">
    Motion
  </a>
  <a href="/programming/">
    Programming
  </a>
  <a href="/design/">
    Design
  </a>
  <a href="/about/">
    About
  </a>
</nav>

<style lang="scss">
  nav {
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    @media (min-width: 768px) {
      width: fit-content;
      border-radius: 16px;
      margin: 8px;
    }
    @media (max-width: 768px) {
      width: 100%;
      overflow: scroll;
    }
  }

  a {
    font-variation-settings: var(--navLinkFontVariation);
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
  }


  @media (hover: hover) {
    a:hover {
      font-variation-settings: var(--navLinkHoverFontVariation);
      color: var(--aqua);
    }
  }

  @media (hover: none) {
    a:active {
      font-variation-settings: var(--navLinkHoverFontVariation);
      color: var(--aqua);
    }
  }
</style>
