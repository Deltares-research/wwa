<template>
  <div>
    <div class="section-block-schedule-wide">
      <ul
        role="tablist"
        class="section-block-schedule-wide__tablist list--inline"
      >
        <li
          v-for="(eventDay, index) in parsedEventDays"
          :key="`tab-wide-${eventDay.id}`"
          role="presentation"
        >
          <a
            :id="`tab-wide-${eventDay.id}`"
            :href="`#article${index}`"
            role="tab"
            :aria-selected="currentTab === index"
            :tabindex="currentTab != index ? '-1' : '0'"
            @click.prevent="selectTab(index)"
            @keydown="handleKey"
            ref="scheduleTab"
            class="section-block-schedule-wide__tablink"
            :class="{ 'section-block-schedule-wide__tablink--selected': currentTab === index }"
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
        </li>
      </ul>

      <p>{{ displayTimezone }}</p>

      <section
        v-for="(eventDay, index) in parsedEventDays"
        :key="`section-wide-${eventDay.id}`"
        ref="scheduleContent"
        role="tabpanel"
        tabindex="-1"
        :aria-labelledby="`tab-wide-${eventDay.id}`"
        :hidden="currentTab != index"
        :id="`article${index}`"
      >
        <h4 class="sr-only">
          {{
            new Date(eventDay.parsedDate).toLocaleDateString(
              language,
              { weekday: 'short', month: 'long', day: 'numeric' }
            )
          }}
        </h4>
        <ul :key="`content-${eventDay.id}`">
          <li
            v-for="scheduleItem in eventDay.scheduleItems"
            :key="scheduleItem.id"
            class="section-block-schedule__item section-block-schedule-wide__item"
          >
            <div class="section-block-schedule-wide__time-wrapper">
              <span
                v-if="scheduleItem.isNow"
                class="section-block-schedule__now-notice"
              >
                {{ nowLabel }}
              </span>
              <span class="section-block-schedule-wide__time">
                {{ scheduleItem.startTime }} - {{ scheduleItem.endTime }}
              </span>
            </div>
            <div
              class="section-block-schedule-wide__body"
              :class="{
                'section-block-schedule__body--active': scheduleItem.isNow,
              }"
            >
              <div class="section-block-schedule-wide__meta">
                <img
                  class="section-block-schedule-wide__speaker"
                  v-if="scheduleItem.speaker && scheduleItem.speaker.image"
                  :src="`${scheduleItem.speaker.image.url}?auto=format,compress&mask=ellipse&w=60&h=60`"
                  alt=""
                >
                <div class="section-block-schedule__copy section-block-schedule-wide__copy">
                  <span class="section-block-schedule-wide__copy-title">{{ scheduleItem.title }}</span>
                  <span class="section-block-schedule__description-label">
                    {{ topicLabel }}
                  </span>
                  <span class="section-block-schedule__topic">{{ scheduleItem.topic }}</span>
                </div>
              </div>
              <div class="section-block-schedule-wide__description">
                <span class="section-block-schedule__description-label">
                  {{ descriptionLabel }}
                </span>

                {{ scheduleItem.description }}

                <span class="section-block-schedule__description-label">
                  {{ speakersLabel }}
                </span>

                <ul class="list--inline">
                  <li
                    v-for="speaker in scheduleItem.speakers"
                    :key="speaker.id"
                    class="section-block-schedule__description-speaker"
                  >
                    {{ speaker.name }}
                  </li>
                </ul>
              </div>
              <div
                v-if="scheduleItem.watchUrl && scheduleItem.watchLabel"
                class="section-block-schedule-wide__url-wrapper"
              >
                <a
                  class="section-block-schedule__url section-block-schedule-wide__url"
                  :href="scheduleItem.watchUrl"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    class="section-block-schedule-wide__url-icon"
                    src="~/assets/play-icon-dark.svg"
                    alt=""
                  >
                  <span class="section-block-schedule-wide__url-label">
                    {{ scheduleItem.watchLabel }}
                  </span>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <div class="section-block-schedule">
      <select
        class="section-block-schedule__tablist"
        @change="(event) => currentTab = event.target.value"
      >
        <option
          v-for="(eventDay, index) in parsedEventDays"
          :key="eventDay.id"
          :value="index"
          :id="`tab-${eventDay.id}`"
          :aria-controls="`section-${eventDay.id}`"
          :selected="currentTab === index"
        >
          {{
            new Date(eventDay.parsedDate).toLocaleDateString(
              language,
              { weekday: 'long', month: 'long', day: 'numeric' }
            )
          }}
        </option>
      </select>

      <p class="section-block-schedule__timezone">
        {{ displayTimezone }}
      </p>

      <section
        v-for="(eventDay, index) in parsedEventDays"
        :key="`section-${eventDay.id}`"
        :id="`section-${eventDay.id}`"
        :aria-labelledby="`tab-${eventDay.id}`"
        :hidden="currentTab != index"
      >
        <ul
          :key="`content-${eventDay.id}`"
          class="section-block-schedule__itemlist"
        >
          <li
            v-for="scheduleItem in eventDay.scheduleItems"
            :key="scheduleItem.id"
          >
            <details class="section-block-schedule__item">
              <summary class="section-block-schedule__summary">
                <span
                  v-if="scheduleItem.isNow"
                  class="section-block-schedule__now-notice"
                >
                  {{ nowLabel }}
                </span>
                <span class="section-block-schedule__time">
                  {{ scheduleItem.startTime }} - {{ scheduleItem.endTime }}
                </span>
                <span
                  class="section-block-schedule__meta"
                  :class="{
                    'section-block-schedule__body--active': scheduleItem.isNow,
                  }"
                >
                  <a
                    v-if="scheduleItem.watchUrl && scheduleItem.watchLabel"
                    class="section-block-schedule__url"
                    :href="scheduleItem.watchUrl"
                    target="_blank"
                    rel="noopener"
                  >
                    <img
                      class="section-block-schedule__url-icon"
                      src="~/assets/play-icon-light.svg"
                      :alt="scheduleItem.watchLabel"
                    >
                  </a>
                  <span
                    class="section-block-schedule__body"
                    :class="{
                      'section-block-schedule__body--active': scheduleItem.isNow,
                    }"
                  >
                    <span class="section-block-schedule__copy">
                      <span class="section-block-schedule__copy-title">{{ scheduleItem.title }}</span>
                      <span>{{ scheduleItem.topic }}</span>
                    </span>
                    <img
                      class="section-block-schedule__icon-closed"
                      src="~/assets/plus-icon.svg"
                      width="16"
                      height="16"
                      alt=""
                    >
                    <img
                      class="section-block-schedule__icon-open"
                      src="~/assets/min-icon.svg"
                      width="16"
                      height="2"
                      alt=""
                    >
                  </span>
                </span>
              </summary>
              <div
                class="section-block-schedule__description"
                :class="{
                  'section-block-schedule__body--active': scheduleItem.isNow,
                }"
              >
                <span class="section-block-schedule__description-label">
                  {{ descriptionLabel }}
                </span>

                {{ scheduleItem.description }}

                <span class="section-block-schedule__description-label">
                  {{ speakersLabel }}
                </span>

                <ul class="list--inline">
                  <li
                    v-for="speaker in scheduleItem.speakers"
                    :key="speaker.id"
                    class="section-block-schedule__description-speaker"
                  >
                    {{ speaker.name }}
                  </li>
                </ul>
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
      topicLabel: String,
      nowLabel: String,
      descriptionLabel: String,
      speakersLabel: String,
    },
    data() {
      return {
        currentDate: new Date(),
        interval: null,
        currentTab: 0,
        displayTimezone: `${this.timezoneComment} UTC ${this.timezone.substr(0,3)}`,
        language: this.$route.params.language || 'en',
      };
    },
    computed: {
      parsedEventDays({ eventDays, currentDate, timezone }) {
        return eventDays.map(eventDay => ({
          ...eventDay,
          parsedDate: new Date(`${eventDay.date.substr(0, 10)}T07:00${timezone}`),
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
    },
    methods: {
      selectTab (index) {
        this.currentTab = index;
      },
      handleKey (event) {
        const tabs = this.$refs.scheduleTab;

        if(event.which === 37) {
          if(this.currentTab > 0 ) {
            this.currentTab = this.currentTab - 1;
            tabs[this.currentTab].focus();
          }
        } else if (event.which === 39) {
          if(this.currentTab < this.parsedEventDays.length - 1) {
            this.currentTab = this.currentTab + 1;
            tabs[this.currentTab].focus();
          }
        } else if (event.which === 40) {
          this.$refs.scheduleContent[this.currentTab].focus();
        }
      },
    },
    mounted() {
      this.interval = setInterval(() => {
        this.currentDate = new Date();
      }, 1000 * 60);
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>

<style>
  /*
    show/hide the wide and default variants
  */
  .section-block-schedule {
    display: block;
  }

  .section-block-schedule-wide {
    display: none;
  }

  @media (--md-viewport) {
    .section-block-schedule {
      display: none;
    }

    .section-block-schedule-wide {
      display: block;
    }
  }

  /*
    wide variant specific
  */
  .section-block-schedule-wide__item {
    display: flex;
    align-items: center;
  }

  .section-block-schedule-wide__tablist {
    display: flex;
    flex-wrap: wrap;
    background-color: var(--blue-tertiary);
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .section-block-schedule-wide__tablink {
    display: block;
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

  .section-block-schedule-wide__tablink--selected {
    border-bottom: 2px solid var(--blue-primary);
  }

  .section-block-schedule-wide__tablink:hover,
  .section-block-schedule-wide__tablink:focus {
    color: var(--blue-primary);
  }

  .section-block-schedule-wide__body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 1.2rem;
    background-color: var(--indigo);
    border-radius: 4px;
    min-height: 8.4rem;
  }

  .section-block-schedule-wide__meta {
    flex: 0 0 30%;
    display: flex;
    align-items: flex-start;
    margin-right: 4rem;
  }

  .section-block-schedule-wide__copy {
    font-weight: 500;
  }

  .section-block-schedule-wide__copy-title {
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
  }

  .section-block-schedule-wide__description {
    max-width: 30rem;
    margin-right: 1rem;
  }

  .section-block-schedule-wide__time-wrapper {
    max-width: 10rem;
    width: 100%;
    margin-right: 2rem;
  }

  .section-block-schedule-wide__time {
    font-size: 1.2rem;
    align-self: center;
  }

  .section-block-schedule-wide__url-wrapper {
    align-self: center;
    min-width: 10rem;
  }

  .section-block-schedule-wide__url {
    box-shadow: 0px 6px 13px rgba(182, 187, 189, 0.5);
  }

  .section-block-schedule-wide__url-icon {
    flex-shrink: 0;
    margin-right: 0.6rem;
    padding: 0.6rem;
    border-radius: 50%;
    background-color: var(--blue-tertiary);
    box-shadow: 0px 6px 16px rgba(84, 66, 56, 0.45);
  }

  .section-block-schedule-wide__url-label {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .section-block-schedule-wide__speaker {
    border-radius: 100%;
    border: 4px solid var(--white);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    margin-right: 1.2rem;
  }

  /*
    default variant specific
  */
  .section-block-schedule__tablist {
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
    background-image: url('~assets/arrow-icon.svg');
    background-repeat: no-repeat;
    background-position: right 1rem center;
  }

  .section-block-schedule__timezone {
    margin-bottom: 1rem;
  }

  .section-block-schedule__itemlist {
    list-style: none;
    width: 100%;
    border-left-style: solid;
    border-left-color: var(--blue-tertiary);
    border-left-width: 2px;
    padding-left: 1rem;
  }

  .section-block-schedule__item[open] .section-block-schedule__body {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .section-block-schedule__body {
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

  .section-block-schedule__summary {
    display: flex;
    flex-direction: column;
    outline: none;
  }

  .section-block-schedule__summary::-webkit-details-marker {
    display: none;
  }

  .section-block-schedule__icon-open {
    display: none;
  }

  .section-block-schedule__item[open] .section-block-schedule__icon-closed {
    display: none;
  }

  .section-block-schedule__item[open] .section-block-schedule__icon-open {
    display: block;
  }

  .section-block-schedule__time {
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  .section-block-schedule__meta {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .section-block-schedule__copy-title {
    font-weight: bold;
  }

  .section-block-schedule__description {
    padding: 1rem;
    background-color: var(--black-secondary);
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  /*
    shared styling for both variants
  */
  .section-block-schedule__item {
    margin-bottom: 1.2rem;
  }

  .section-block-schedule__description-label {
    display: block;
    font-weight: bold;
    font-size: 0.8rem;
    color: var(--black-tertiary);
    text-transform: uppercase;
  }

  .section-block-schedule__description-label:not(:first-of-type) {
    margin-top: 1rem;
  }

  .section-block-schedule__description-speaker:not(:last-child):after {
    content: '-';
    margin-left: .25rem;
    display: inline-block;
  }

  .section-block-schedule__body--active {
    background-color: var(--white);
    color: var(--blue-primary);
  }

  .section-block-schedule__copy {
    display: flex;
    flex-direction: column;
  }

  .section-block-schedule__url {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.2rem;
    text-decoration: none;
    color: var(--blue-primary);
    border-radius: 4px;
    background: var(--white);
  }

  .section-block-schedule__url:hover,
  .section-block-schedule__url:focus {
    color: var(--blue-primary);
  }

  .section-block-schedule__url-icon {
    padding: 0.6rem;
    border-radius: 50%;
    background-color: var(--blue-primary);
    box-shadow: 0px 6px 16px rgba(84, 66, 56, 0.45);
  }

  @media (--md-viewport) {
    .section-block-schedule__url-icon {
      margin-right: 0.6rem;
    }
  }

  .section-block-schedule__now-notice {
    display: block;
    color: var(--orange);
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
</style>
