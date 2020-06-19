<template>
  <div class="event-banner">
    <div class="event-banner__banner">
      <h2 class="event-banner__title">
        {{ event.location }} {{ event.name }}
      </h2>
      <p class="event-banner__date">
        {{ event.displayDate }}
      </p>
    </div>

    <aside class="event-banner__credits">
      <p class="event-banner__credits-content">
        <span class="event-banner__credits-title">
          This contribution is part of
        </span>
        <nuxt-link
          to="/"
          class="event-banner__credits-link"
        >
          The World Water Atlas
        </nuxt-link>
      </p>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },
};
</script>

<style>
.event-banner {
  margin-bottom: 2rem;
}

@media (min-width: 600px) {
  .event-banner {
    margin-bottom: 3rem;
  }
}

.event-banner__banner {
  margin-bottom: .5rem;
  padding: 2rem;
  background-image: url('/assets/event-wave.svg'), linear-gradient(137deg, #E9E6CF 14.18%, var(--tertiary-blue) 95.78%);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: bottom 30% center;
  color: var(--primary-blue);
}

@media (min-width: 600px) {
  .event-banner__banner {
    margin-bottom: 1rem;
    padding: 6rem 2rem;
    border-radius: 5px;
  }
}

.event-banner__title {
  font-size: 2rem;
  font-weight: bold;
}

@media (min-width: 600px) {
  .event-banner__title {
    font-size: 3.75rem;
    font-weight: 900;
  }
}

.event-banner__date {
  font-size: 1rem;
  font-weight: 500;
}

@media (min-width: 600px) {
  .event-banner__date {
    font-size: 2rem;
    font-weight: bold;
  }
}

.event-banner__credits {
  display: flex;
  align-items: center;
}

.event-banner__credits:before {
  content: '';
  display: block;
  margin-right: .5rem;
  width: 32px;
  height: 30px;
  background-image: url('/favicon-32x32.png');
}

.event-banner__credits-content {
  line-height: 1;
}

.event-banner__credits-title {
  display: block;
  font-size: .625rem;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--grey--light);
}

.event-banner__credits-link {
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--tertiary-blue);
}
</style>
