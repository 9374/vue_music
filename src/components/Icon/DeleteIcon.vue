<template>
  <div>
    <i class="el-icon-delete" @click.stop="delOne(id)"></i>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'DeleteIcon',
  props: {
    id: {
      type: Number,
      require: true
    }
  },
  methods: {
    ...mapMutations('play', ['delOneSong']),
    delOne (id) {
      this.$confirm('确定移除歌曲吗?', '提示').then(() => {
        this.delOneSong(id)
      }).catch(console.log)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
