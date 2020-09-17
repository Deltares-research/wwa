<template>
  <div>
    <section
      v-for="(section, index) in sections"
      :key="section.id"
      :class="{
        'layout-section--wave-top-black': section.showTopWave && section.backgroundColor === 'black',
        'layout-section--wave-top-blue': section.showTopWave && section.backgroundColor === 'blue',
        'layout-section--wave-bottom-black': section.showBottomWave && section.backgroundColor === 'black',
        'layout-section--wave-bottom-blue': section.showBottomWave && section.backgroundColor === 'blue',
        'layout-section--wave-top-bg-blue': section.showTopWave && sections[index - 1] && sections[index - 1].backgroundColor === 'blue',
        'layout-section--wave-top-bg-black': section.showTopWave && sections[index - 1] && sections[index - 1].backgroundColor === 'black',
        'layout-section--wave-bottom-bg-blue': section.showBottomWave && sections[index + 1] && sections[index + 1].backgroundColor === 'blue',
        'layout-section--wave-bottom-bg-black': section.showBottomWave && sections[index + 1] && sections[index + 1].backgroundColor === 'black',
        'layout-section--background-black': section.backgroundColor === 'black',
        'layout-section--background-blue': section.backgroundColor === 'blue',
      }"
    >
      <div class="layout-section__content">
        <template v-for="(block, blockIndex) in section.blocks">
          <animator
            v-if="block._modelApiKey === 'text_block'"
            :key="block.id"
            :id="block.slug"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <event-block-text v-bind="block" />
          </animator>
          <animator
            v-if="block._modelApiKey === 'media_block'"
            :key="block.id"
            :id="block.slug"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <event-block-text-media v-bind="block" />
          </animator>
          <animator
            v-if="block._modelApiKey === 'related_stories_block'"
            :key="block.id"
            :id="block.slug"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <event-block-related-stories v-bind="block" />
          </animator>
          <animator
            v-if="block._modelApiKey === 'chapters_block'"
            :key="block.id"
            :id="block.slug"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <event-block-chapters-carousel
              v-if="block.chapters.length > 3"
              :title="block.title"
              :items="block.chapters"
            />
            <event-block-chapters-list
              v-else
              v-bind="block"
            />
          </animator>
          <animator
            v-if="block._modelApiKey === 'speakers_block'"
            :key="block.id"
            :id="block.slug"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <event-block-speakers
              :show-wave-marker="block.showWaveMarker"
              :image="block.image"
              :title="block.title"
              :subtitle="block.subtitle"
              :title-color="block.titleColor"
              :speakers="block.speakers"
            />
          </animator>
          <animator
            v-if="block._modelApiKey === 'colofon_block'"
            :key="block.id"
            :id="block.slug"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <event-block-colofon v-bind="block" />
          </animator>
          <div
            v-if="block._modelApiKey === 'schedule_block'"
            :key="block.id"
            :id="block.slug"
            class="layout-section__container layout-section__container--padded"
          >
            <h3 class="event-block__title">
              {{ block.scheduleLabel }}
            </h3>
            <event-block-schedule
              :event-days="block.eventDays"
              :timezone="block.timezone"
              :timezone-comment="block.timezoneComment"
              :topic-label="block.topicLabel"
              :now-label="block.nowLabel"
              :description-label="block.descriptionLabel"
              :speakers-label="block.speakersLabel"
            />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import EventBlockChaptersCarousel from '~/components/event-block/EventBlockChaptersCarousel';
import EventBlockChaptersList from '~/components/event-block/EventBlockChaptersList';
import EventBlockColofon from '~/components/event-block/EventBlockColofon';
import EventBlockSchedule from '~/components/event-block/EventBlockSchedule';
import EventBlockText from '~/components/event-block/EventBlockText';
import EventBlockTextMedia from '~/components/event-block/EventBlockTextMedia';
import EventBlockRelatedStories from '~/components/event-block/EventBlockRelatedStories';
import EventBlockSpeakers from '~/components/event-block/EventBlockSpeakers';
import Animator from '~/components/animator/Animator';

export default {
  components: {
    EventBlockChaptersCarousel,
    EventBlockChaptersList,
    EventBlockColofon,
    EventBlockSchedule,
    EventBlockText,
    EventBlockTextMedia,
    EventBlockRelatedStories,
    EventBlockSpeakers,
    Animator,
  },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
};
</script>
