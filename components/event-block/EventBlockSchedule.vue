<template>
  <div>
    <h3 class="event-block-schedule__title">Schedule</h3>
    <div class="event-block-schedule__daylist">
      <template v-for="(eventDay, index) in parsedEventDays">
        <input
          class="event-block-schedule__tab"
          :key="`input-${eventDay.id}`"
          :id="`tab-${eventDay.id}`"
          :checked="eventDay.isToday || index === 0"
          name="tabs"
          type="radio"
        />
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
        <ul class="event-block-schedule__itemlist" :key="`content-${eventDay.id}`">
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

    <p>{{ timezone }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      timezone: String,
      eventDays: Array,
      language: String,
    },
    data({ eventDays }) {
      return {
        parsedEventDays: eventDays.map(eventDay => ({
          ...eventDay,
          isToday: new Date().toDateString()
            === new Date(eventDay.date).toDateString(),
        })),
      };
    },
  }
</script>

<style>
  .event-block-schedule__daylist {
    display: flex;
    flex-wrap: wrap;
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


  @media (--sm-viewport) {
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

  @media (--sm-viewport) {
    .event-block-schedule__itemlist {
      order: 99;
    }
  }

  .event-block-schedule__item {
    margin-bottom: 1.2rem;
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

  .event-block-schedule__copy {
    display: flex;
    flex-direction: column;
  }

  .event-block-schedule__copy-title {
    font-weight: bold;
  }

  .event-block-schedule__description {
    padding-right: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    background-color: var(--black-secondary);
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .event-block-schedule__description-label {
    display: block;
    font-weight: bold;
    font-size: 0.8rem;
    color: var(--black-tertiary);
    text-transform: uppercase;
  }

  summary::-webkit-details-marker {
    display: none;
  }
</style>
