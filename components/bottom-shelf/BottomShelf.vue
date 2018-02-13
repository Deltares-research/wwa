<template>
  <transition name="slide-up">
    <div class="bottom-shelf">
      <slot>
        <!-- content -->
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
}
</script>

<style>
@import '../colors/colors.css';

.bottom-shelf {
  display: flex;
  align-content: flex-end;
  flex-direction: column;
  background-image: linear-gradient(to top, var(--ui--black) 50%, transparent)
}
.bottom-shelf {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>


