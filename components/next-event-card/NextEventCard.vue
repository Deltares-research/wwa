<template>
  <a
    :href="`/events/${event.slug}/`"
    class="next-event-card"
  >
    <div class="next-event-card__content">
      <img
        v-if="event.bannerIcon"
        alt=""
        :src="`${event.bannerIcon.imgixHost}/${event.bannerIcon.value.path}?compress=auto,format&width=75`"
        :width="event.bannerIcon.value.width"
        :height="event.bannerIcon.value.height"
        class="next-event-card__icon"
      >

      <span
        v-html="event.name"
        class="next-event-card__title h3"
      />

      <span class="next-event-card__description">
        <time :datetime="event.startDate">{{ event.displayDate }}</time>
      </span>
    </div>
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
  padding: 1rem;
  font-weight: bold;
  color: var(--blue-primary);
  text-decoration: none;
  background-image: url('~assets/event-wave.svg'), linear-gradient(137deg, #E9E6CF 14.18%, var(--blue-tertiary) 95.78%);
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
  background-image: url('~assets/arrow-right.svg');
  background-color: var(--white);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
}

.next-event-card:hover,
.next-event-card:focus {
  color: var(--blue-primary);
}

.next-event-card__icon {
  float: left;
  width: 20%;
  height: auto;
}

.next-event-card__title,
.next-event-card__description {
  display: block;
  padding-left: .5rem;
  width: 100%;
  max-width: 75%;
}

.next-event-card__title {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1.25rem;
  font-weight: 900;
}

.next-event-card__title em {
  font-style: normal;
}

.next-event-card__description {
  margin-bottom: .25rem;
  font-size: 1.125rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
