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
.bottom-shelf {
  display: flex;
  align-content: flex-end;
  flex-direction: column;
}
.bottom-shelf {
  position: fixed;
  bottom: 0;

}
</style>


