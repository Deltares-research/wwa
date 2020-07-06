<template>
  <div>
    <h3 class="event-block-schedule__title">
      Schedule
    </h3>

    <div class="event-block-schedule-wide">
      <div
        class="event-block-schedule__tablist"
        role="tablist"
      >
        <a
          v-for="(eventDay, index) in eventDays"
          :key="`tab-${eventDay.id}`"
          class="event-block-schedule__tablink"
          role="tab"
          :href="`#section${index}`"
          :id="`tab${index}`"
          :aria-controls="`section${index}`"
          :aria-selected="eventDay.id === activeEventDayId"
          @click.prevent="activeEventDayId = eventDay.id"
        >
          <time :datetime="eventDay.date">
            {{ new Date(eventDay.date).toLocaleDateString(
              language,
              { weekday: 'long', month: 'long', day: 'numeric' }
            ) }}
          </time>
        </a>
      </div>

      <p>{{ timezoneComment }} UTC {{ timezone.substr(0,3) }}</p>

      <template v-for="(eventDay, index) in parsedEventDays">
        <section
          class=""
          :key="`section-${eventDay.id}`"
          role="tabpanel"
          :id="`section${index}`"
          :aria-labelledby="`tab${index}`"
          :hidden="eventDay.id !== activeEventDayId"
        >
          <ul
            class=""
            :key="`content-${eventDay.id}`"
          >
            <li
              v-for="scheduleItem in eventDay.scheduleItems"
              :key="scheduleItem.id"
              class="event-block-schedule__item event-block-schedule__item-wide"
            >
              <div class="event-block-schedule__time-wrapper">
                <span
                  v-if="scheduleItem.isNow"
                  class="event-block-schedule__now-notice"
                >now</span>
                <span class="event-block-schedule__time-wide">
                  {{ scheduleItem.startTime }} - {{ scheduleItem.endTime }}
                </span>
              </div>
              <div
                class="event-block-schedule__body-wide"
                :class="{
                  'event-block-schedule__body--active': scheduleItem.isNow,
                }"
              >
                <div class="event-block-schedule__meta">
                  <img
                    class="event-block-schedule__speaker-image"
                    v-if="scheduleItem.speaker"
                    :src="`${scheduleItem.speaker.image.url}?auto=format&mask=ellipse&w=60&h=60`"
                    alt=""
                  >
                  <span class="event-block-schedule__copy event-block-schedule__copy-wide">
                    <span class="event-block-schedule__copy-title-wide">{{ scheduleItem.title }}</span>
                    <span class="event-block-schedule__description-label">Topic</span>
                    <span class="event-block-schedule__topic">{{ scheduleItem.topic }}</span>
                  </span>
                </div>
                <div class="event-block-schedule__description-wide">
                  <span class="event-block-schedule__description-label">Description</span>
                  {{ scheduleItem.description }}
                </div>
                <a
                  v-if="scheduleItem.isNow && scheduleItem.watchUrl"
                  class="event-block-schedule__url"
                  :href="scheduleItem.watchUrl"
                >
                  {{ scheduleItem.watchLabel }}
                </a>
              </div>
            </li>
          </ul>
        </section>
      </template>
    </div>

    <div class="event-block-schedule">
      <template v-for="eventDay in eventDays">
        <input
          class="event-block-schedule__tab"
          :key="`input-${eventDay.id}`"
          :id="`tab-${eventDay.id}`"
          :checked="eventDay.id === activeEventDayId"
          name="tabs"
          type="radio"
        >
        <label
          :key="`label-${eventDay.id}`"
          :for="`tab-${eventDay.id}`"
          class="event-block-schedule__date"
        >
          <time :datetime="eventDay.date">
            {{ new Date(eventDay.date).toLocaleDateString(
              language,
              { weekday: 'long', month: 'long', day: 'numeric' }
            ) }}
          </time>
        </label>
        <ul
          class="event-block-schedule__itemlist"
          :key="`content-${eventDay.id}`"
        >
          <li
            v-for="scheduleItem in eventDay.scheduleItems"
            :key="scheduleItem.id"
          >
            <details class="event-block-schedule__item">
              <summary class="event-block-schedule__summary">
                <span class="event-block-schedule__time">
                  {{ scheduleItem.startTime }} - {{ scheduleItem.endTime }}
                </span>
                <span class="event-block-schedule__body">
                  <span class="event-block-schedule__copy">
                    <span class="event-block-schedule__copy-title">{{ scheduleItem.title }}</span>
                    <span>{{ scheduleItem.topic }}</span>
                  </span>
                  <img
                    class="event-block-schedule__icon-closed"
                    src="/assets/plus-icon.svg"
                    width="16"
                    height="16"
                    alt=""
                  >
                  <img
                    class="event-block-schedule__icon-open"
                    src="/assets/min-icon.svg"
                    width="16"
                    height="2"
                    alt=""
                  >
                </span>
              </summary>
              <div class="event-block-schedule__description">
                <span class="event-block-schedule__description-label">Description</span>
                {{ scheduleItem.description }}
              </div>
            </details>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      timezone: String,
      timezoneComment: String,
      eventDays: Array,
      language: String,
    },
    data({ timezone, eventDays }) {
      const currentDate = new Date();
      const eventDayToday = eventDays.find(eventDay =>
        currentDate.toDateString() === new Date(eventDay.date).toDateString(),
      );

      return {
        parsedEventDays: eventDays.map(eventDay => ({
          ...eventDay,
          scheduleItems: eventDay.scheduleItems.map(scheduleItem => ({
            ...scheduleItem,
            isNow: eventDayToday
              && currentDate > new Date(`${eventDay.date}T${scheduleItem.startTime}${timezone}`)
              && currentDate < new Date(`${eventDay.date}T${scheduleItem.endTime}${timezone}`),
          })),
        })),
        activeEventDayId: eventDayToday ? eventDayToday.id : eventDays[0].id,
      };
    },
  };
</script>

<style>
  .event-block-schedule {
    display: flex;
    flex-wrap: wrap;
  }

  .event-block-schedule-wide {
    display: none;
  }

  @media (--md-viewport) {
    .event-block-schedule {
      display: none;
    }

    .event-block-schedule-wide {
      display: block;
    }
  }

  .event-block-schedule__tablist {
    display: flex;
    background-color: var(--blue-tertiary);
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .event-block-schedule__tablink {
    padding-bottom: 0.2rem;
    margin-top: 1.2rem;
    margin-right: 1.2rem;
    margin-bottom: 1rem;
    margin-left: 1.2rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--blue-primary);
    text-decoration: none;
  }

  .event-block-schedule__tablink:hover,
  .event-block-schedule__tablink:focus,
  .event-block-schedule__tablink:active {
    color: initial;
  }

  .event-block-schedule__tablink[aria-selected] {
    border-bottom: 2px solid var(--blue-primary);
  }

  .event-block-schedule__tab {
    position: absolute;
    opacity: 0;
  }

  .event-block-schedule__tab:focus + .event-block-schedule__date {
    z-index: 1;
  }

  .event-block-schedule__tab:checked + .event-block-schedule__date + .event-block-schedule__itemlist {
    display: block;
  }

  .event-block-schedule__tab:checked + .event-block-schedule__date {
    text-decoration: underline;
  }

  .event-block-schedule__date {
    width: 100%;
    cursor: pointer;
  }

  .event-block-schedule__date:hover {
  }

  .event-block-schedule__date:active {
  }


  @media (--lg-viewport) {
    .event-block-schedule__date {
      width: auto;
    }
  }

  .event-block-schedule__itemlist {
    list-style: none;
    width: 100%;
    display: none;
    border-left-style: solid;
    border-left-color: var(--blue-tertiary);
    border-left-width: 2px;
    padding-left: 1rem;
  }

  .event-block-schedule__item {
    margin-bottom: 1.2rem;
  }

  .event-block-schedule__item-wide {
    display: flex;
    align-items: center;
  }

  .event-block-schedule__item[open] .event-block-schedule__icon-closed {
    display: none;
  }

  .event-block-schedule__item[open] .event-block-schedule__icon-open {
    display: block;
  }

  .event-block-schedule__icon-open {
    display: none;
  }

  .event-block-schedule__item[open] .event-block-schedule__body {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .event-block-schedule__title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  @media (--md-viewport) {
    .event-block-schedule__title {
      font-size: 3.75rem;
      line-height: 1.1;
    }
  }

  .event-block-schedule__date {
    padding: 1rem;
    margin-bottom: 1rem;
    color: var(--black-primary);
    font-weight: 500;
    background-color: var(--blue-tertiary);
    list-style-type: square;
    border-radius: 4px;
  }

  .event-block-schedule__summary {
    display: flex;
    flex-direction: column;
    outline: none;
  }

  .event-block-schedule__time {
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  .event-block-schedule__now-notice {
    display: block;
    color: var(--orange);
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  .event-block-schedule__time-wrapper {
    max-width: 10rem;
    width: 100%;
    margin-right: 2rem;
  }

  .event-block-schedule__time-wide {
    font-size: 1.2rem;
    white-space: nowrap;
  }

  .event-block-schedule__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    padding-right: 1.4rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    background-color: var(--black-secondary);
    border-radius: 4px;
  }

  .event-block-schedule__body-wide {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 1.2rem;
    background-color: var(--indigo);
    border-radius: 4px;
    min-height: 8.4rem;
  }

  .event-block-schedule__body--active {
    background-color: var(--white);
    color: var(--blue-primary);
  }

  .event-block-schedule__speaker-image {
    border-radius: 100%;
    border: 4px solid var(--white);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    margin-right: 1.2rem;
  }

  .event-block-schedule__meta {
    display: flex;
    align-items: flex-start;
    margin-right: 4rem;
    width: 100%;
    max-width: 14rem;
  }

  .event-block-schedule__copy {
    display: flex;
    flex-direction: column;
  }

  .event-block-schedule__copy-wide {
    font-weight: 500;
  }

  .event-block-schedule__copy-title {
    font-weight: bold;
  }

  .event-block-schedule__copy-title-wide {
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
  }

  .event-block-schedule__description {
    padding-right: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    background-color: var(--black-secondary);
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .event-block-schedule__description-wide {
    max-width: 30rem;
    margin-right: 1rem;
  }

  .event-block-schedule__description-label {
    display: block;
    font-weight: bold;
    font-size: 0.8rem;
    color: var(--black-tertiary);
    text-transform: uppercase;
  }

  .event-block-schedule__url {
    min-width: 8rem;
    padding: 1rem;
    text-decoration: none;
    color: var(--blue-primary);
    box-shadow: 0px 6px 13px rgba(182, 187, 189, 0.5);
    border-radius: 4px;
  }

  summary::-webkit-details-marker {
    display: none;
  }
</style>
