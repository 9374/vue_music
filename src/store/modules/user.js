import { userPlaylistAPI, getLikeListAPI } from '@/api/userAPI.js'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: JSON.parse(localStorage.getItem("music_user")) || {
    // 用户登录成功储存的cookie
    cookie: "",
    // 用户信息
    userInfo: { avatarUrl: "", nickname :'',userId:''},
    userPlayList: {
      // 用户歌单
      playlist: [],
      // 用户喜欢的歌曲
      userLikeSongList: []
    }
  },
  mutations: {
    // 储存用户数据
    initUserInfo(state, userinfo) {
      state.userInfo = userinfo||{};
      localStorage.setItem("music_user", JSON.stringify(state));
    },
    // 储存cookie
    initUserCookie(state, cookie) {
      state.cookie = cookie;
      // localStorage.setItem('music_user', JSON.stringify(state))
    },
    // 退出登录
    clearUserInfo(state) {
      console.log("清空数据");
      state.userInfo = {};
      state.cookie = "";
      // localStorage.setItem('music_user', JSON.stringify(state))
      this.commit("user/clearAllCookie");
      // this.commit('localStorageSet')
    },
    // 清除cookie
    clearAllCookie() {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      // eslint-disable-next-line no-useless-escape
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      console.log("需要删除的cookie名字：" + keys);
      if (keys) {
        for (var i = keys.length; i--; ) {
          document.cookie =
            keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
        }
      }
    },
    changeUserPlayList(state, payload) {
      state.userPlayList.playlist = payload;
      // localStorage.setItem('music_user', JSON.stringify(state))
    },
    changeUserLikeList(state, payload) {
      state.userPlayList.userLikeSongList = payload;
      // localStorage.setItem('music_user', JSON.stringify(state))
    }
  },
  actions: {
    async initUserPlayList(ctx, id) {
      console.log("获取用户歌单");
      // 如果是登录状态获取用户歌单
      const res = await userPlaylistAPI(id);
      // console.log(res)
      console.log(res);
      if (res.data.code === 200) {
        // console.log('接受', res.data)
        ctx.commit("changeUserPlayList", res.data.playlist);
      } else if (res.data.code === 400) {
        Message.warning(res.data.message);
      }
    },
    async getUserLoveSong(ctx, id) {
      const res = await getLikeListAPI(id);
      console.log(res);
      ctx.commit("changeUserLikeList", res.data.ids);
    }
  },
  getters: {
    // 登录状态
    isLogin(state) {
      if (state.cookie && state.userInfo) {
        return true;
      } else {
        return false;
      }
    },
    // 用户创建的歌单
    userCreatePlayList(state) {
      // console.log(this.userPlayList)
      if (state.userPlayList.playlist) {
        return state.userPlayList.playlist.filter(
          item => item.userId === state.userInfo.userId
        );
      } else {
        return [];
      }
    },
    // 用户收藏的歌单
    userCollectionPlayList(state) {
      if (state.userPlayList.playlist) {
        return state.userPlayList.playlist.filter(
          item => item.userId !== state.userInfo.userId
        );
      } else {
        return [];
      }
    }
  }
};
