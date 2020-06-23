<template>
  <div class="event">
    <header class="event__layout">
      <event-header
        :name="internalEvent.name"
        :location="internalEvent.location"
        :image="internalEvent.image"
        :all-locales="internalEvent._allNameLocales"
      />

      <event-banner v-bind="internalEvent" />
    </header>

    <main class="event__content">
      <section
        v-for="(section, index) in internalEvent.eventSections"
        :key="section.id"
        class="event-section"
        :class="{
          'event-section--wave-top-black': section.showTopWave && section.backgroundColor === 'black',
          'event-section--wave-top-blue': section.showTopWave && section.backgroundColor === 'blue',
          'event-section--wave-bottom-black': section.showBottomWave && section.backgroundColor === 'black',
          'event-section--wave-bottom-blue': section.showBottomWave && section.backgroundColor === 'blue',
          'event-section--wave-top-bg-blue': section.showTopWave && internalEvent.eventSections[index - 1] && internalEvent.eventSections[index - 1].backgroundColor === 'blue',
          'event-section--wave-top-bg-black': section.showTopWave && internalEvent.eventSections[index - 1] && internalEvent.eventSections[index - 1].backgroundColor === 'black',
          'event-section--wave-bottom-bg-blue': section.showBottomWave && internalEvent.eventSections[index + 1] && internalEvent.eventSections[index + 1].backgroundColor === 'blue',
          'event-section--wave-bottom-bg-black': section.showBottomWave && internalEvent.eventSections[index + 1] && internalEvent.eventSections[index + 1].backgroundColor === 'black',
        }"
      >
        <div
          :class="{
            'event__layout--background-black': section.backgroundColor === 'black',
            'event__layout--background-blue': section.backgroundColor === 'blue',
          }"
        >
          <template v-for="block in section.blocks">
            <div
              v-if="block._modelApiKey === 'text_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              [TEXT BLOCK]
            </div>
            <div
              v-else-if="block._modelApiKey === 'video_block'"
              :key="block.id"
              class="event__layout event__layout--padded"
            >
              [VIDEO-BLOCK]
            </div>
          </template>
        </div>
      </section>
    </main>
    <event-footer v-bind="internalEvent" />
  </div>
</template>

<script>
  import fetchContent from '~/lib/fetch-content';
  import EventBanner from '~/components/event-banner/EventBanner';
  import EventHeader from '~/components/event-header/EventHeader';
  import EventFooter from '~/components/event-footer/EventFooter';

  export default {
    components: {
      EventBanner,
      EventHeader,
      EventFooter,
    },
    head ({ params }) {
      return {
        htmlAttrs: {
          lang: params.language,
        },
      };
    },
    async asyncData({ params }) {
      const query = `
        {
          internalEvent(locale: ${params.language}, filter: { slug: { eq: "${params.event}" } }) {
            slug
            name
            location
            timezone
            displayDate
            image {
              url
            }

            _allNameLocales {
              locale
            }

            eventSections {
              backgroundColor
              showBottomWave
              showTopWave
              blocks {
                ... on TextBlockRecord {
                  _modelApiKey
                  id
                  showWaveMarker
                  title
                  body(markdown: true)
                }
                ... on VideoBlockRecord {
                  _modelApiKey
                  id
                  video {
                    url
                  }
                }
              }
            }
          }
        }
      `;

      return {
        ...await fetchContent(query),
        params,
      };
    },
  };
</script>
