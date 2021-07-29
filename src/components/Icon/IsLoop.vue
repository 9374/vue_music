<template>
  <div>
    <i
      @click="changeLoop()"
      :class="isLoop ? 'el-icon-refresh' : 'el-icon-refresh-right'"
      style="margin-right: 5px"
    ></i>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'IsLoop',
  methods: {
    ...mapMutations('play', ['changeLoopState']),
    changeLoop () {
      this.changeLoopState(!this.isLoop)
      this.$message({
        message: this.isLoop ? '切换为单曲循环' : '切换为列表循环',
        type: 'success'
      })
    }
  },
  computed: {
    ...mapState('play', ['isLoop'])
  }
}
</script>

<style lang="scss" scoped>
</style>
