<template>
  <div
    :class="{
      animator: isAnimated,
      'animator--active': isIntersected,
    }"
    :style="{ '--animator-delay': delay + 's', '--animator-stagger': stagger }"
    ref="container"
  >
    <slot />
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
    delay: {
      type: Number,
      default: 0.5, // in seconds
    },
    stagger: {
      type: Number,
      default: .1, // in seconds
    },
  },
  data () {
    return {
      isIntersected: false,
      observer: null,
      isAnimated: false,
    };
  },
  mounted() {
    if ('IntersectionObserver' in window) {
      this.observe();
      this.setStagger();
      this.isAnimated = true;
    } else {
      this.isIntersected = true;
    }
  },
  beforeDestroy() {
    this.unobserve();
  },
  methods: {
    observe() {
      const { rootMargin, threshold } = this;
      const config = { root: undefined, rootMargin, threshold };
      this.observer = new IntersectionObserver(this.onIntersection, config);
      this.observer.observe(this.$el);
    },
    onIntersection(entries) {
      this.isIntersected = entries.some((entry) => entry.intersectionRatio > 0);
      if (this.isIntersected) {
        this.unobserve();
      }
    },
    unobserve() {
      if ('IntersectionObserver' in window) {
        this.observer.unobserve(this.$el);
      }
    },
    setStagger() {
      const items = [...this.$refs['container'].querySelectorAll('[animator-stagger]')];
      items.forEach((item, i) => item.classList.add(`animator--stagger-${i + 1}`));
    },
  },
};
</script>

<!--
All animation types are nested in '.animator' to prevent unvisible content if 'IntersectionObserver' is not supported. Means animation type classes only work when nested within '.animator'
-->

<style>
  .animator {
    --animator-ease: cubic-bezier(.3, .51, .09, 1);
    --animator-duration: 0.7s;
  }

  /*
    clipped container
  */
  .animator .animator__clip {
    overflow: hidden;
    transform: translateX(-100%);
  }

  .animator .animator__clip-content {
    transform: translateX(100%);
  }

  .animator.animator--active .animator__clip,
  .animator.animator--active .animator__clip-content {
    transform: translateX(0);
    transition: transform var(--animator-duration) var(--animator-delay) var(--animator-ease);
  }

  /*
    simple fade in
  */
  .animator .animator__fade {
    opacity: 0;
  }

  .animator.animator--active .animator__fade {
    opacity: 1;
    transition: opacity var(--animator-duration) var(--animator-delay) linear;
  }

  /*
    slide-in and fade-in from left
  */
  .animator .animator__slide-in {
    opacity: 0;
    transform: translateX(-50px);
  }

  .animator.animator--active .animator__slide-in {
    opacity: 1;
    transform: translateX(0);
    transition:
      opacity var(--animator-duration) var(--animator-delay) linear,
      transform var(--animator-duration) var(--animator-delay) var(--animator-ease);
  }

  /*
    slide-up and fade-in from bottom
  */
  .animator .animator__slide-up {
    opacity: 0;
    transform: translateY(50px);
  }

  .animator.animator--active .animator__slide-up {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity var(--animator-duration) var(--animator-delay) linear,
      transform var(--animator-duration) var(--animator-delay) var(--animator-ease);
  }

  /*
    slide-up and fade-in from bottom
  */
  .animator .animator__scale-container {
    overflow: hidden;
  }

  .animator .animator__scale-up {
    opacity: 0;
    transform: scale(1);
  }

  .animator .animator__scale-image {
    width: 100%;
    max-width: none;
  }

  .animator.animator--active .animator__scale-up {
    opacity: 1;
    transform: scale(1.05);
    transition:
      opacity var(--animator-duration) var(--animator-delay) linear,
      transform var(--animator-duration) var(--animator-delay) var(--animator-ease);
  }

  /*
    animation stagger
  */
  .animator.animator--active .animator--stagger-1 {
    transition-delay: calc( var(--animator-delay) * (1 + var(--animator-stagger)) );
  }

  .animator.animator--active .animator--stagger-2 {
    transition-delay: calc( var(--animator-delay) * (1 + var(--animator-stagger) * 2) );
  }

  .animator.animator--active .animator--stagger-3 {
    transition-delay: calc( var(--animator-delay) * (1 + var(--animator-stagger) * 3) );
  }

  .animator.animator--active .animator--stagger-4 {
    transition-delay: calc( var(--animator-delay) * (1 + var(--animator-stagger) * 4) );
  }

  .animator.animator--active .animator--stagger-5 {
    transition-delay: calc( var(--animator-delay) * (1 + var(--animator-stagger) * 5) );
  }
</style>
