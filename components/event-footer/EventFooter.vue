<template functional>
  <footer class="event-footer event__layout event__layout--padded">
    <div class="event-footer__body">
      <p class="event-footer__copy">
        <span v-html="props.name" />
      </p>
      <a
        class="event-footer__link"
        href="/"
      >
        Explore
        <span
          class="event-footer__highlight"
          lang="en"
        >
          World Water Atlas
        </span>
      </a>
      <img
        class="event-footer__background"
        src="/assets/globe.png"
        alt=""
      >
    </div>
  </footer>
</template>

<script>
  export default {
    props: {
      name: String,
    },
  };
</script>

<style>
  .event-footer__body {
    position: relative;
    display: flex;
    border-top-color: var(--white);
    border-top-style: solid;
    border-top-width: 2px;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
  }

  @media (--sm-viewport) {
    .event-footer__body {
      padding-top: 2rem;
      padding-bottom: 4rem;
    }
  }

  .event-footer__copy {
    z-index: 1;
    display: inline-flex;
    flex-direction: column;
    padding-right: 1rem;
    border-right-color: var(--white);
    border-right-style: solid;
    border-right-width: 1px;
    margin-right: 1rem;
    font-weight: 500;
    line-height: 1.25;
  }

  .event-footer__copy em {
    display: block;
    font-style: normal;
  }

  .event-footer__link {
    z-index: 1;
    line-height: 1.25;
    text-decoration: none;
  }

  .event-footer__highlight {
    display: block;
    color: var(--blue-tertiary);
    font-weight: 500;
  }

  .event-footer__background {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 90%;
    object-fit: cover;
    opacity: .3;
  }

  @media (--sm-viewport) {
    .event-footer__background {
      height: 75%;
    }
  }
</style>

