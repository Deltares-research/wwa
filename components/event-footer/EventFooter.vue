<template functional>
  <footer class="event-footer event__layout event__layout--padded">
    <div class="event-footer__body">
      <p class="event-footer__copy">
        <span>{{ props.location }}</span>
        <span>{{ props.name }}</span>
      </p>
      <a
        class="event-footer__link"
        href="/"
      >
        Explore <span class="event-footer__highlight">World Water Atlas</span>
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
      location: String,
    },
  };
</script>

<style>
  .event-footer {
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  }

  .event-footer__body {
    position: relative;
    display: flex;
    border-top-color: var(--white);
    border-top-style: solid;
    border-top-width: 2px;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
  }

  .event-footer__copy {
    display: inline-flex;
    flex-direction: column;
    padding-right: 1rem;
    border-right-color: var(--white);
    border-right-style: solid;
    border-right-width: 1px;
    margin-right: 1rem;
    line-height: 1.25;
  }

  .event-footer__link {
    line-height: 1.25;
    font-weight: bold;
    text-decoration: none;
  }

  .event-footer__highlight {
    display: block;
    color: var(--tertiary-blue);
    font-weight: 500;
  }

  .event-footer__background {
    z-index: -1;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 90%;
    object-fit: cover;
  }

  @media(min-width: 30rem) {
    .event-footer {
      background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6));
    }

    .event-footer__body {
      padding-top: 2rem;
      padding-bottom: 4rem;
    }
  }
</style>

