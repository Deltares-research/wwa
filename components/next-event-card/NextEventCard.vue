<template>
  <nuxt-link
    to="/"
    class="next-event-card"
  >
    <span class="next-event-card__title h3">
      Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit
    </span>

    <span class="next-event-card__description">
      43 Jul
    </span>
  </nuxt-link>
</template>

<style>
.next-event-card {
  display: block;
  padding: .5rem .7rem;
  font-weight: bold;
  color: var(--ui--blue);
  text-decoration: none;
  background-image: url('/assets/event-wave.svg'), var(--ui--event-gradient);
  background-size: 100% auto;
  background-position: bottom center;
  border-radius: 5px;
}

.next-event-card:after {
  content: '';
  margin-left: auto;
  margin-right: 0;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url('/assets/arrow-right.svg');
  background-color: var(--ui--white);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
}

.next-event-card:hover,
.next-event-card:focus {
  color: var(--ui--blue);
}

.next-event-card__title,
.next-event-card__description {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.next-event-card__description {
  margin-bottom: .25rem;
  text-transform: uppercase;
}
</style>
