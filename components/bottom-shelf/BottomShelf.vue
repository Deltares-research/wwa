<template>
  <transition name="slide-up">
    <div class="bottom-shelf" v-if="show">
      <slot>
        <!-- content -->
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return { show: false }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    }, 400)
  }
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


