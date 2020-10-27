<template>
  <section class="event-overview-list">
    <ul
      role="tablist"
      class="event-overview-list__tabs list--inline"
    >
      <li
        role="presentation"
        class="event-overview-list__tabs-item"
      >
        <a
          id="tab1"
          href="#article1"
          role="tab"
          :aria-selected="currentTabId === 'tab1'"
          :tabindex="currentTabId === 'tab1' ? '-1' : '0'"
          @click.prevent="selectTab('tab1')"
          class="event-overview-list__tab"
          :class="{ 'event-overview-list__tab--selected': currentTabId === 'tab1' }"
        >
          Future events
        </a>
      </li>
      <li
        role="presentation"
        class="event-overview-list__tabs-item"
      >
        <a
          id="tab2"
          href="#article2"
          role="tab"
          :aria-selected="currentTabId === 'tab2'"
          :tabindex="currentTabId === 'tab2' ? '-1' : '0'"
          @click.prevent="selectTab('tab2')"
          class="event-overview-list__tab"
          :class="{ 'event-overview-list__tab--selected': currentTabId === 'tab2' }"
        >
          Past events
        </a>
      </li>
    </ul>

    <article
      :id="`tab${index + 1}`"
      role="tabpanel"
      :aria-labelledby="`tab${index + 1}`"
      :hidden="currentTabId != `tab${index + 1}`"
      v-for="(events, index) in [futureEvents, pastEvents]"
      :key="index"
    >
      <ol class="event-overview-list__list">
        <li
          v-for="event in events"
          :key="event.id"
          class="event-overview-list__list-item"
        >
          <div class="event-overview-list__list-item-header">
            <h2
              v-html="event.name"
              class="event-overview-list__name"
            />

            <p class="event-overview-list__summary">
              {{ event.summary }}
            </p>

            <a
              v-if="event.url"
              :href="event.url"
              class="event-overview-list__link"
            >
              {{ event.urlLabel }}
            </a>
            <a
              v-else
              :href="`/events/${event.slug}/`"
              class="event-overview-list__link event-overview-list__link--internal"
            >
              Go to event page
            </a>
          </div>

          <lazy-media class="event-overview-list__list-item-image">
            <img
              :src="`${event.image.url}?auto=compress,format&w=600`"
              alt=""
            >
          </lazy-media>

          <div class="event-overview-list__list-item-footer">
            <p class="event-overview-list__date">
              {{ event.displayDate }}
            </p>

            <p class="event-overview-list__location">
              {{ event.location }}
            </p>
          </div>
        </li>
      </ol>
    </article>
  </section>
</template>

<script>
  import LazyMedia from '~/components/lazy-media/LazyMedia';

  export default {
    props: {
      internalEvents: Array,
      externalEvents: Array,
    },
    components: { LazyMedia },
    data () {
      return {
        currentTabId: 'tab1',
        today: '',
      };
    },
    methods: {
      selectTab (tabId) {
        this.currentTabId = tabId;
      },
    },
    computed: {
      allEvents () {
        return [...this.internalEvents, ...this.externalEvents];
      },
      futureEvents () {
        return this.allEvents
          .filter(event => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            return startDate >= this.today || startDate < this.today && endDate >= this.today;
          })
          .sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate);
          });
      },
      pastEvents () {
        return this.allEvents
          .filter(event => {
            return new Date(event.endDate) < this.today;
          })
          .sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate);
          });
      },
    },
    mounted() {
      this.today = new Date();
    },
  };
</script>

<style>
  .event-overview-list {
    margin-bottom: 1.5rem;
  }

  @media (--md-viewport) {
    .event-overview-list {
      margin-bottom: 3rem;
    }
  }

  .event-overview-list__tabs {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }

  .event-overview-list__tabs-item {
    margin-bottom: .75rem;
  }

  .event-overview-list__tab {
    margin-right: .5rem;
    padding-bottom: .25rem;
    text-decoration: none;
  }

  .event-overview-list__tab--selected {
    font-weight: 500;
    color: var(--blue-tertiary);
    border-bottom: 2px solid var(--blue-tertiary);
  }

  .event-overview-list__tab--selected:hover,
  .event-overview-list__tab--selected:focus {
    color: var(--blue-tertiary);
  }

  .event-overview-list__list {
    list-style-type: none;
  }

  .event-overview-list__list-item {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--black-tertiary);
  }

  @media (--md-viewport) {
    .event-overview-list__list-item {
      flex-direction: row;
      justify-content: space-between;
      margin-top: 2.5rem;
    }
  }

  .event-overview-list__list-item:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .event-overview-list__list-item:first-child {
    margin-top: 0;
  }

  .event-overview-list__list-item-header {
    order: 3;
  }

  @media (--md-viewport) {
    .event-overview-list__list-item-header {
      order: 2;
      flex: 1 1 auto;
    }
  }

  .event-overview-list__list-item-image {
    order: 2;
    margin-bottom: .5rem;
  }

  .event-overview-list__list-item-image img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  @media (--md-viewport) {
    .event-overview-list__list-item-image {
      order: 3;
      flex: 0 0 290px;
      margin-left: 2rem;
      margin-bottom: 0;
    }

    .event-overview-list__list-item-image img {
      height: 197px;
    }
  }

  .event-overview-list__list-item-footer {
    order: 1;
  }

  @media (--md-viewport) {
    .event-overview-list__list-item-footer {
      flex: 0 0 20%;
      margin-right: 2rem;
    }
  }

  .event-overview-list__name {
    margin-bottom: .25rem;
    font-size: 1.25rem;
    line-height: 1;
    color: var(--orange);
  }

  @media (--md-viewport) {
    .event-overview-list__name {
      margin-bottom: .5rem;
      font-size: 2rem;
    }
  }

  .event-overview-list__name em {
    font-style: normal;
  }

  .event-overview-list__summary {
    margin-bottom: .5rem;
    line-height: 1.2;
  }

  @media (--md-viewport) {
    .event-overview-list__summary {
      margin-bottom: .75rem;
    }
  }

  .event-overview-list__link {
    font-weight: bold;
    text-decoration: none;
    color: var(--blue-tertiary);
  }

  .event-overview-list__link:hover,
  .event-overview-list__link:focus {
    color: var(--blue-tertiary);
  }

  .event-overview-list__link--internal {
    display: flex;
    align-items: center;
  }

  .event-overview-list__link--internal:after {
    content: '';
    display: block;
    margin-top: .08rem;
    margin-left: .5rem;
    width: 14px;
    height: 10px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4.7h12M9.5 1L13 4.7 9.5 8.5' stroke='%2368D4F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }

  .event-overview-list__date {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.2;
  }

  @media (--md-viewport) {
    .event-overview-list__date {
      margin-bottom: .4rem;
      line-height: 1;
    }
  }

  .event-overview-list__location {
    display: flex;
    align-items: center;
    margin-bottom: .25rem;
    font-size: 0.875rem;
    font-weight: bold;
  }

  @media (--md-viewport) {
    .event-overview-list__location {
      font-size: 1rem;
    }
  }

  .event-overview-list__location:before {
    content: '';
    display: block;
    margin-right: .4rem;
    width: 14px;
    height: 17px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 14 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='.5' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 7.1C13 12 7 16 7 16s-6-4-6-8.9c0-1.6.6-3.2 1.8-4.3a6 6 0 018.4 0A6.2 6.2 0 0113 7.1z'/%3E%3Cpath d='M7 9.2c1.1 0 2-1 2-2A2 2 0 007 5a2 2 0 00-2 2c0 1.2.9 2 2 2z'/%3E%3C/g%3E%3C/svg%3E");
  }
</style>
