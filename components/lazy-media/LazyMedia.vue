<template>
  <div>
    <slot v-if="isIntersected" />
    <slot
      v-if="isIntersected"
      name="content"
    />
    <slot
      v-if="!isIntersected"
      name="placeholder"
    />
  </div>
</template>

<script>

export default {
  props: {
    rootMargin: {
      type: String,
      default: '0px 0px 0px 0px',
    },
    threshold: {
      type: [Number, Array],
      default: 0,
    },
  },
  data () {
    return {
      isIntersected: false,
      observer: null,
    }
  },
  mounted () {
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
      this.observe()
    } else {
      this.isIntersected = true
    }
    window.addEventListener('beforeprint', this.onPrint)
  },
  beforeDestroy () {
    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
      this.unobserve()
    }
  },
  methods: {
    observe () {
      const { rootMargin, threshold } = this
      const config = { root: undefined, rootMargin, threshold }
      this.observer = new IntersectionObserver(this.onIntersection, config)
      this.observer.observe(this.$el)
    },
    onIntersection (entries, observer) {
      this.isIntersected = entries.some(entry => entry.intersectionRatio > 0)
      if (this.isIntersected) {
        this.unobserve()
      }
    },
    unobserve () {
      this.observer.unobserve(this.$el)
    },
    onPrint () {
      this.isIntersected = true
    },
  },
}
</script>

<style>
  .lazy-image {
    display: inline-block;
    width: 100%;
    height: 100%;
    margin: 0;
    vertical-align: bottom;
  }

  .lazy-placeholder {
    background-color: var(--ui--text--light);
    color: var(--ui--bg--light);
    display: flex;
    flex-direction: column;
    align-content: center;
  }
</style>
