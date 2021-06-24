    <template>
  <el-table :data="seeSongsList.tracks" stripe style="width: 100%">
    <el-table-column prop="name" label="音乐标题" width="250">
    </el-table-column>
    <el-table-column prop="ar[0].name" label="歌手" width="250">
    </el-table-column>
    <el-table-column prop="al.name" label="专辑" width="250"> </el-table-column>
    <el-table-column prop="date" label="时长" width="250"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    seeSongsList: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  position: absolute;
  left: 300px;
  right: 0px;
  top: 60px;
  bottom: 0px;
  padding-bottom: 60px;
}
</style>
