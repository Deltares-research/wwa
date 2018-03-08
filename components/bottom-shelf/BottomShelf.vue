<template>
  <transition name="slide-up">
    <div class="bottom-shelf">
      <slot>
        <!-- content -->
      </slot>
    </div>
  </transition>
</template>

<style>
@import '../colors/colors.css';

.bottom-shelf {
  display: flex;
  align-content: flex-end;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  background-image: linear-gradient(to top, var(--ui--black) 2rem, transparent);
  bottom: -4rem; /* hack to maintain illusion of cutting off pages in cards */
}
</style>


