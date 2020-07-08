<template>
  <div>
    <div class="event-block-schedule-wide">
      <div
        class="event-block-schedule-wide__tablist"
        role="tablist"
      >
        <a
          v-for="eventDay in parsedEventDays"
          :key="`tab-wide-${eventDay.id}`"
          class="event-block-schedule-wide__tablink"
          role="tab"
          href="#"
          :id="`tab-wide-${eventDay.id}`"
          :aria-controls="`section-wide-${eventDay.id}`"
          :aria-selected="eventDay.id === activeEventDayId"
          @click.prevent="selectedEventDayId = eventDay.id"
        >
          <time :datetime="eventDay.date">
            {{
              new Date(eventDay.parsedDate).toLocaleDateString(
                language,
                { weekday: 'short', month: 'long', day: 'numeric' }
              )
            }}
          </time>
        </a>
      </div>

      <p>{{ displayTimezone }}</p>

      <section
        v-for="eventDay in parsedEventDays"
        :key="`section-wide-${eventDay.id}`"
        role="tabpanel"
        :id="`section-wide-${eventDay.id}`"
        :aria-labelledby="`tab-wide-${eventDay.id}`"
        :hidden="eventDay.id !== activeEventDayId"
      >
        <ul :key="`content-${eventDay.id}`">
          <li
            v-for="scheduleItem in eventDay.scheduleItems"
            :key="scheduleItem.id"
            class="event-block-schedule__item event-block-schedule-wide__item"
          >
            <div class="event-block-schedule-wide__time-wrapper">
              <span
                v-if="scheduleItem.isNow"
                class="event-block-schedule__now-notice"
              >
                now
              </span>
              <span class="event-block-schedule-wide__time">
                {{ scheduleItem.startTime }} - {{ scheduleItem.endTime }}
              </span>
            </div>
            <div
              class="event-block-schedule-wide__body"
              :class="{
                'event-block-schedule__body--active': scheduleItem.isNow,
              }"
            >
              <div class="event-block-schedule-wide__meta">
                <img
                  class="event-block-schedule-wide__speaker"
                  v-if="scheduleItem.speaker"
                  :src="`${scheduleItem.speaker.image.url}?auto=format&mask=ellipse&w=60&h=60`"
                  alt=""
                >
                <div class="event-block-schedule__copy event-block-schedule-wide__copy">
                  <span class="event-block-schedule-wide__copy-title">{{ scheduleItem.title }}</span>
                  <span class="event-block-schedule__description-label">Topic</span>
                  <span class="event-block-schedule__topic">{{ scheduleItem.topic }}</span>
                </div>
              </div>
              <div class="event-block-schedule-wide__description">
                <span class="event-block-schedule__description-label">Description</span>
                {{ scheduleItem.description }}
              </div>
              <div class="event-block-schedule-wide__url-wrapper">
                <a
                  v-if="scheduleItem.isNow && scheduleItem.watchUrl"
                  class="event-block-schedule__url event-block-schedule-wide__url"
                  :href="scheduleItem.watchUrl"
                >
                  <img
                    class="event-block-schedule-wide__url-icon"
                    src="/assets/play-icon-dark.svg"
                    alt=""
                  >
                  {{ scheduleItem.watchLabel }}
                </a>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <div class="event-block-schedule">
      <select
        class="event-block-schedule__tablist"
        @change="(event) => selectedEventDayId = event.target.value"
      >
        <option
          v-for="eventDay in eventDays"
          :key="eventDay.id"
          :value="eventDay.id"
          :id="`tab-${eventDay.id}`"
          :aria-controls="`section-${eventDay.id}`"
          :selected="eventDay.id === activeEventDayId"
        >
          {{
            new Date(eventDay.date).toLocaleDateString(
              language,
              { weekday: 'long', month: 'long', day: 'numeric' }
            )
          }}
        </option>
      </select>

      <p class="event-block-schedule__timezone">
        {{ displayTimezone }}
      </p>


      <section
        v-for="eventDay in parsedEventDays"
        :key="`section-${eventDay.id}`"
        :id="`section-${eventDay.id}`"
        :aria-labelledby="`tab-${eventDay.id}`"
        :hidden="eventDay.id !== activeEventDayId"
      >
        <ul
          :key="`content-${eventDay.id}`"
          class="event-block-schedule__itemlist"
        >
          <li
            v-for="scheduleItem in eventDay.scheduleItems"
            :key="scheduleItem.id"
          >
            <details class="event-block-schedule__item">
              <summary class="event-block-schedule__summary">
                <span
                  v-if="scheduleItem.isNow"
                  class="event-block-schedule__now-notice"
                >
                  now
                </span>
                <span class="event-block-schedule__time">
                  {{ scheduleItem.startTime }} - {{ scheduleItem.endTime }}
                </span>
                <span
                  class="event-block-schedule__meta"
                  :class="{
                    'event-block-schedule__body--active': scheduleItem.isNow,
                  }"
                >
                  <a
                    v-if="scheduleItem.isNow && scheduleItem.watchUrl"
                    class="event-block-schedule__url"
                    :href="scheduleItem.watchUrl"
                  >
                    <img
                      class="event-block-schedule__url-icon"
                      src="/assets/play-icon-light.svg"
                      :alt="scheduleItem.watchLabel"
                    >
                  </a>
                  <span
                    class="event-block-schedule__body"
                    :class="{
                      'event-block-schedule__body--active': scheduleItem.isNow,
                    }"
                  >
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
                </span>
              </summary>
              <div
                class="event-block-schedule__description"
                :class="{
                  'event-block-schedule__body--active': scheduleItem.isNow,
                }"
              >
                <span class="event-block-schedule__description-label">Description</span>
                {{ scheduleItem.description }}
              </div>
            </details>
          </li>
        </ul>
      </section>
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
    data({ eventDayToday, eventDays, timezone, timezoneComment }) {
      return {
        currentDate: new Date(),
        selectedEventDayId: '',
        displayTimezone: `${timezoneComment} UTC ${timezone.substr(0,3)}`,
      };
    },
    computed: {
      parsedEventDays({ eventDays, currentDate, timezone }) {
        return eventDays.map(eventDay => ({
          ...eventDay,
          parsedDate: new Date(`${eventDay.date}T07:00${timezone}`),
          scheduleItems: eventDay.scheduleItems.map(scheduleItem => ({
            ...scheduleItem,
            isNow:
              currentDate > new Date(`${eventDay.date}T${scheduleItem.startTime}${timezone}`)
              && currentDate < new Date(`${eventDay.date}T${scheduleItem.endTime}${timezone}`),
          })),
        }));
      },
      eventDayToday({ currentDate, eventDays }) {
        if (currentDate === undefined)
          return;

        return eventDays.find(eventDay =>
          currentDate.toDateString() === new Date(eventDay.date).toDateString(),
        );
      },
      activeEventDayId({ eventDays, eventDayToday, selectedEventDayId }) {
        if (selectedEventDayId)
          return selectedEventDayId;

        return eventDayToday ? eventDayToday.id : eventDays[0].id;
      },
    },
    created() {
      setInterval(() => {
         this.currentDate = new Date();
      }, 1000 * 60);
    },
  };
</script>

<style>
  /*
    show/hide the wide and default variants
  */
  .event-block-schedule {
    display: block;
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

  /*
    wide variant specific
  */
  .event-block-schedule-wide__item {
    display: flex;
    align-items: center;
  }

  .event-block-schedule-wide__tablist {
    display: flex;
    flex-wrap: wrap;
    background-color: var(--blue-tertiary);
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .event-block-schedule-wide__tablink {
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

  .event-block-schedule-wide__tablink[aria-selected] {
    border-bottom: 2px solid var(--blue-primary);
  }

  .event-block-schedule-wide__tablink:hover,
  .event-block-schedule-wide__tablink:focus {
    color: var(--blue-primary);
  }

  .event-block-schedule-wide__body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 1.2rem;
    background-color: var(--indigo);
    border-radius: 4px;
    min-height: 8.4rem;
  }

  .event-block-schedule-wide__meta {
    display: flex;
    align-items: flex-start;
    margin-right: 4rem;
    width: 100%;
    max-width: 14rem;
  }

  .event-block-schedule-wide__copy {
    font-weight: 500;
  }

  .event-block-schedule-wide__copy-title {
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
  }

  .event-block-schedule-wide__description {
    max-width: 30rem;
    margin-right: 1rem;
  }

  .event-block-schedule-wide__time-wrapper {
    max-width: 10rem;
    width: 100%;
    margin-right: 2rem;
  }

  .event-block-schedule-wide__time {
    font-size: 1.2rem;
    align-self: center;
  }

  .event-block-schedule-wide__url {
    box-shadow: 0px 6px 13px rgba(182, 187, 189, 0.5);
  }

  .event-block-schedule-wide__url-icon {
    flex-shrink: 0;
    margin-right: 0.6rem;
    padding: 0.6rem;
    border-radius: 50%;
    background-color: var(--blue-tertiary);
    box-shadow: 0px 6px 16px rgba(84, 66, 56, 0.45);
  }

  .event-block-schedule-wide__speaker {
    border-radius: 100%;
    border: 4px solid var(--white);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    margin-right: 1.2rem;
  }

  /*
    default variant specific
  */
  .event-block-schedule__tablist {
    position: relative;
    appearance: none;
    width: 100%;
    display: block;
    padding: 0.8rem 0.6rem;
    border: 0;
    margin-bottom: 0.4rem;
    background-color: var(--blue-tertiary);
    color: var(--black-primary);
    font-weight: 500;
    font-size: 1rem;
    border-radius: 4px;
    background-image: url('/assets/arrow-icon.svg');
    background-repeat: no-repeat;
    background-position: right 1rem center;
  }

  .event-block-schedule__timezone {
    margin-bottom: 1rem;
  }

  .event-block-schedule__itemlist {
    list-style: none;
    width: 100%;
    border-left-style: solid;
    border-left-color: var(--blue-tertiary);
    border-left-width: 2px;
    padding-left: 1rem;
  }

  .event-block-schedule__item[open] .event-block-schedule__body {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .event-block-schedule__body {
    width: 100%;
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

  .event-block-schedule__summary {
    display: flex;
    flex-direction: column;
    outline: none;
  }

  .event-block-schedule__summary::-webkit-details-marker {
    display: none;
  }

  .event-block-schedule__icon-open {
    display: none;
  }

  .event-block-schedule__item[open] .event-block-schedule__icon-closed {
    display: none;
  }

  .event-block-schedule__item[open] .event-block-schedule__icon-open {
    display: block;
  }

  .event-block-schedule__time {
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  .event-block-schedule__meta {
    width: 100%;
    display: flex;
    flex-direction: row;
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

  /*
    shared styling for both variants
  */
  .event-block-schedule__item {
    margin-bottom: 1.2rem;
  }

  .event-block-schedule__description-label {
    display: block;
    font-weight: bold;
    font-size: 0.8rem;
    color: var(--black-tertiary);
    text-transform: uppercase;
  }

  .event-block-schedule__body--active {
    background-color: var(--white);
    color: var(--blue-primary);
  }

  .event-block-schedule__copy {
    display: flex;
    flex-direction: column;
  }

  .event-block-schedule__url {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.2rem;
    text-decoration: none;
    color: var(--blue-primary);
    border-radius: 4px;
    white-space: nowrap;
  }

  .event-block-schedule__url-icon {
    margin-right: 0.6rem;
    padding: 0.6rem;
    border-radius: 50%;
    background-color: var(--blue-primary);
    box-shadow: 0px 6px 16px rgba(84, 66, 56, 0.45);
  }

  .event-block-schedule__now-notice {
    display: block;
    color: var(--orange);
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
</style>
