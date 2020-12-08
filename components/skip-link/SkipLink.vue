<template functional>
  <div>
    <div
      id="title-alert"
      role="alert"
      tabindex="-1"
      class="sr-only"
    />
    <a
      :href="`#${props.target}`"
      class="skip-link"
    >
      Skip to main content
    </a>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
  .skip-link {
    z-index: 9999;
    position: absolute;
    padding: .5rem .7rem;
    top: 1rem;
    left: -9999px;
    background: var(--blue-tertiary);
    border: 3px solid var(--black-primary);
    color: var(--black-primary);
    text-decoration: none;
  }

  .skip-link:focus {
    left: 1rem;
    color: var(--black-primary);
  }
</style>
