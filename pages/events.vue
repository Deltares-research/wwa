<template>
  <div>
    <ol
      v-for="event in [...allInternalEvents, ...allExternalEvents]"
      :key="event.id"
    >
      <li class="event-preview">
        Date: {{ event.startDate }}
        Location: {{ event.location }}
        <img
          :src="`${event.image.url}?auto=compress&w=400`"
          alt=""
        >
        Name: {{ event.name }}

        <div class="event-preview__link">
          <a
            v-if="event.url"
            :href="event.url"
          >{{ event.url }}</a>
          <nuxt-link
            v-else
            :to="`/en/events/${event.slug}`"
          >
            Go to event page
          </nuxt-link>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';

  export default {
    async asyncData() {
      const query = `
        {
          allExternalEvents {
            name
            id
            startDate
            location
            url
            image {
              url
            }
          }

          allInternalEvents {
            name
            id
            slug
            startDate
            location
            image {
              url
            }
          }
        }
      `;

      return {
        ...await fetchContent({ query }),
      };
    },
  };
</script>

<style>
  .event-preview {
    margin: 2rem;
  }

  .event-preview__link {
    font-weight: bold;
  }
</style>
