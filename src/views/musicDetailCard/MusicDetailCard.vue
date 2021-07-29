<template>
  <div :class="playDetail ? '' : 'hide'" class="musicDetailCardContainer">
    <div class="closeCard" @click="closeCard">
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="Container">
      <div class="title">
        <h2>{{ currentPlay.name }}</h2>
        <div class="singer">{{ currentPlay.ar[0].name }}</div>
      </div>
      <div class="songDetail">
        <div class="songCover">
          <div class="needle" :class="isPlaying ? 'needleRotate' : ''">
            <img src="~@/assets/img/MusicDetailCard/needle.png" alt="" />
          </div>
          <div class="cover" :class="isPlaying ? 'discAnimation' : ''">
            <img
              class="coverborder"
              src="~@/assets/img/MusicDetailCard/disc.png"
              alt=""
            />
            <img
              class="coverPic"
              :src="coverUrl ? `${coverUrl}` : '~@/assets/img/cover.jpg'"
              alt=""
            />

            <!--src="~@/assets/img/cover.jpg"  -->
          </div>
        </div>

        <LyricsScroll />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'MusicDetailCard',
  data () {
    return {}
  },
  methods: {
    ...mapMutations('play', ['changePlayDetailState']),
    closeCard () {
      this.changePlayDetailState(false)
    }
  },
  computed: {
    ...mapGetters('play', ['coverUrl']),
    ...mapState('play', ['playDetail', 'currentPlay', 'isPlaying'])
  }
}
</script>

<style lang="less" scoped>
.musicDetailCardContainer {
  position: absolute;
  width: 100%;
  height: calc(100vh - 60px);
  top: 0;
  left: 0;
  z-index: 1000;
  transition: transform 0.5s;
  background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
  .Container {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .title {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      h2 {
        font-size: 26px;
        font-weight: normal;
      }
      .singer {
        font-size: 14px;
        color: #919191;
      }
    }
    .songDetail {
      flex: 1;
      display: flex;
      justify-content: space-around;
      // height: 100%;
      align-items: center;
      // 封面盒子
      .songCover {
        transform: translate(-10%, -10%);
        // 指针
        .needle {
          position: relative;
          left: 50%;
          width: 88px;
          height: 72px;
          z-index: 10000;
          transition: all 1s;
          transform-origin: 5.3px 5.3px;
          img {
            width: 100%;
          }
        }
        .needleRotate {
          transform-origin: 5.3px 5.3px;
          transform: rotate(22deg);
        }
        //封面
        .cover {
          width: 300px;
          position: relative;
          top: -10px;
          left: 0;
          .coverborder {
            width: 300px;
            height: 300px;
          }
          .coverPic {
            width: 100%;
            z-index: -1;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
}
.hide {
  transform: translateY(calc(100vh - 60px));
  // position: absolute;
  // bottom: -999px;
  // left: -999px;
  // overflow: hidden;
  // height: 60px;
}
.hide2 {
  display: none;
}
// 隐藏音乐详情按钮
.closeCard .el-icon-arrow-down {
  position: absolute;
  top: 15px;
  left: 35px;
  font-size: 30px !important;
}
// 旋转
@keyframes disc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.discAnimation {
  /* infinite动画无限循环 */
  animation: disc 25s linear infinite;
  /* 动画延迟一秒 */
  animation-delay: 0.8s;
}
</style>
