<template>
  <a
    :href="`/events/${event.slug}`"
    class="next-event-card"
  >
    <span class="next-event-card__title h3">
      {{ event.title }}
    </span>

    <span class="next-event-card__description">
      <time :datetime="event.startDate">{{ event.displayDate }}</time>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    event: Object,
  },
};
</script>

<style>
.next-event-card {
  display: block;
  padding: .5rem .7rem;
  font-weight: bold;
  color: var(--primary-blue);
  text-decoration: none;
  background-image: url('/assets/event-wave.svg'), linear-gradient(137deg, #E9E6CF 14.18%, var(--tertiary-blue) 95.78%);
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
  background-color: var(--white);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
}

.next-event-card:hover,
.next-event-card:focus {
  color: var(--primary-blue);
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
}
</style>
