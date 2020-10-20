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
            :id="block.id"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <section-block-text v-bind="block" />
          </animator>
          <animator
            v-if="block._modelApiKey === 'media_block'"
            :key="block.id"
            :id="block.id"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <section-block-text-media v-bind="block" />
          </animator>
          <animator
            v-if="block._modelApiKey === 'related_stories_block'"
            :key="block.id"
            :id="block.id"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <section-block-related-stories v-bind="block" />
          </animator>
          <animator
            v-if="block._modelApiKey === 'chapters_block'"
            :key="block.id"
            :id="block.id"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <section-block-chapters-carousel
              v-if="block.chapters.length > 3"
              :title="block.title"
              :items="block.chapters"
            />
            <section-block-chapters-list
              v-else
              v-bind="block"
            />
          </animator>
          <animator
            v-if="block._modelApiKey === 'speakers_block'"
            :key="block.id"
            :id="block.id"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <section-block-speakers
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
            :id="block.id"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <section-block-colofon v-bind="block" />
          </animator>
          <div
            v-if="block._modelApiKey === 'schedule_block'"
            :key="block.id"
            :id="block.id"
            class="layout-section__container layout-section__container--padded"
          >
            <h3 class="section-block__title">
              {{ block.scheduleLabel }}
            </h3>
            <section-block-schedule
              :event-days="block.eventDays"
              :timezone="block.timezone"
              :timezone-comment="block.timezoneComment"
              :topic-label="block.topicLabel"
              :now-label="block.nowLabel"
              :description-label="block.descriptionLabel"
              :speakers-label="block.speakersLabel"
            />
          </div>
          <animator
            v-if="block._modelApiKey === 'news_block'"
            :key="block.id"
            :id="block.id"
            :is-intersection-disabled="index === 0 && blockIndex === 0"
            class="layout-section__container layout-section__container--padded"
          >
            <section-block-news v-bind="block" />
          </animator>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import SectionBlockChaptersCarousel from '~/components/section-blocks/SectionBlockChaptersCarousel';
import SectionBlockChaptersList from '~/components/section-blocks/SectionBlockChaptersList';
import SectionBlockColofon from '~/components/section-blocks/SectionBlockColofon';
import SectionBlockNews from '@/components/section-blocks/SectionBlockNews';
import SectionBlockSchedule from '~/components/section-blocks/SectionBlockSchedule';
import SectionBlockText from '~/components/section-blocks/SectionBlockText';
import SectionBlockTextMedia from '~/components/section-blocks/SectionBlockTextMedia';
import SectionBlockRelatedStories from '~/components/section-blocks/SectionBlockRelatedStories';
import SectionBlockSpeakers from '~/components/section-blocks/SectionBlockSpeakers';
import Animator from '~/components/animator/Animator';

export default {
  components: {
    SectionBlockChaptersCarousel,
    SectionBlockChaptersList,
    SectionBlockColofon,
    SectionBlockNews,
    SectionBlockSchedule,
    SectionBlockText,
    SectionBlockTextMedia,
    SectionBlockRelatedStories,
    SectionBlockSpeakers,
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
