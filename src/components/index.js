// 引入需要注册的组件
import isLike from '@/components/Icon/LikeIcon.vue'
import DeleteIcon from '@/components/Icon/DeleteIcon.vue'
import IsPlayIcon from '@/components/Icon/IsPlayIcon.vue'
import IsLoop from '@/components/Icon/IsLoop.vue'
import LyricsScroll from '@/components/lyricsScroll/LyricsScroll.vue'
import PlayInfo from '@/components/PlayInfo/index.vue'
import LyricFooter from '@/components/LyricFooter/index.vue'
import Playcontrol from '@/components/PlayControl/index.vue'
// 将引入的组件写入数组中
const components = [isLike, DeleteIcon, IsPlayIcon, IsLoop, LyricsScroll, PlayInfo, LyricFooter, Playcontrol]

// 获取数组长度进行循环
let len = components.length
export default {
  install: function (Vue) {
    while (len--) {
      Vue.component(components[len].name, components[len])
    }
  }
}
