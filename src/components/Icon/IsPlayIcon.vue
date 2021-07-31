<template>
  <div>
    <i
      v-show="id === nowPlay.playId"
      :class="isPlaying ? 'el-icon-loading' : 'el-icon-caret-right'"
    >
    </i>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IsPlayIcon',
  props: {
    id: {
      type: Number,
      require: true
    }
  },
  computed: {
    ...mapState('play', ['isPlaying', 'nowPlay'])
  }
}
</script>

<style lang="scss" scoped>
</style>
