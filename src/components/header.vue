<template>
  <el-header class="head">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-input
          v-popover:popover
          size="small"
          v-model="input"
          placeholder="搜索音乐"
          :style="{ width: '200px', borderRadius: '30px' }"
        ></el-input>
      </el-col>
      <el-col :span="6" :offset="0" style="height: 60px"></el-col>
      <el-col class="user" :span="6" :offset="0">
        <div class="user_avatar">
          <el-avatar
            v-if="!isLogin"
            @click.native="dialogFormVisible = true"
            icon="el-icon-user-solid"
          ></el-avatar>
          <el-avatar
            v-else
            :src="
              userInfo.avatarUrl + '?param=50y50' ||
              'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            "
          ></el-avatar>
        </div>
        <div class="user_info">
          <p v-show="!isLogin" @click="dialogFormVisible = true">未登录</p>
          <p v-show="isLogin" v-popover:popoverUser>
            {{ userInfo.nickname || "未登录" }}
          </p>
        </div>
      </el-col>
    </el-row>
    <!-- 搜索预览 -->
    <el-popover
      ref="popover"
      placement="bottom-start"
      width="280"
      :title="searchlist.length === 0 ? '热门搜索' : ''"
      trigger="focus"
    >
      <div>
        <div v-if="searchlist.length === 0" class="hot_search">
          <ul class="hot_name_wrap">
            <li
              @click="addhot(item.first)"
              v-for="item in hotList"
              :key="item.first"
              class="hot_item"
            >
              {{ item.first }}
            </li>
          </ul>
        </div>
        <!-- 搜索结果 -->
        <div v-else class="hot_search">
          <div class="btn">
            <el-button type="info" size="mini" round @click="delResult"
              >清空搜索列表</el-button
            >
            <el-button
              @click="$router.push('/home/searchList/' + input)"
              type="primary"
              size="mini"
              round
              >详细列表
              <!-- <router-link to="/">详细列表</router-link> -->
            </el-button>
          </div>
          <p class="hot_title">搜索结果</p>
          <div v-for="item in searchlist" :key="item.id">
            <el-divider></el-divider>
            <SongItem
              :songName="item.name"
              :author="item.artists[0].name"
              :album="item.album.name"
              :id="item.id"
            />
          </div>
        </div>
      </div>
    </el-popover>
    <!-- 登录框 -->
    <el-dialog
      width="300px"
      :append-to-body="true"
      title="登录"
      :visible.sync="dialogFormVisible"
    >
      <!-- 标签选择页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机帐号" name="phone"></el-tab-pane>
        <el-tab-pane label="邮箱帐号" name="email"></el-tab-pane>
        <el-tab-pane label="二维码" name="Qrkey"></el-tab-pane>
      </el-tabs>
      <div v-show="activeName === 'Qrkey'">
        <canvas ref="MyCanvas"></canvas>
      </div>
      <!-- 手机登录表单 -->
      <el-form
        v-show="activeName !== 'Qrkey'"
        :model="form"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          prop="phone"
          v-show="activeName === 'phone'"
          label="手机号"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          v-show="activeName === 'email'"
          label="邮箱帐号"
        >
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">{{
          activeName === "Qrkey" ? "确定" : "登录"
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 个人详情框 退出 个人设置 -->
    <el-popover
      ref="popoverUser"
      placement="bottom"
      width="200"
      trigger="click"
    >
      <div>
        <el-button type="danger" round @click="loginOut">退出登录</el-button>
      </div>
    </el-popover>
  </el-header>
</template>

<script>
// 获取搜索接口
import { loginInPhone, loginInEmail, loginStatus, userSigninAPI, userLoginOut, loginCreateKey, loginInitQr, confirmQrStatus } from '@/api/userAPI.js'
import { searchApi, hotSearchNameApi } from '../api/search'
//  引入预览列表组件
import SongItem from '../components/SongItem.vue'
import Qrcode from 'qrcode'
import { mapMutations, mapGetters, mapState } from 'vuex'
const validateMobile = (rule, value, callback) => {
  if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    callback(new Error('手机号码格式错误'))
  } else {
    callback()
  }
}
const validateEamil = (rule, value, callback) => {
  if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
export default {
  data () {
    return {
      QrKey: '',
      QrInfo: '',
      // 输入框双向绑定的值
      input: '',
      // 搜索结果储存
      searchlist: [],
      // 延时器id 用来节流
      timer: null,
      // 热词列表
      hotList: [],
      // 个人详情退出按钮弹框
      visible: false,
      // 展示登录界面
      dialogFormVisible: false,
      // 当前展示页面
      form: {
        phone: '',
        email: '',
        password: ''
      },
      // 当前选择的登录页
      activeName: 'phone',
      // 校验规则
      rules: {
        phone: [
          { required: true, trigger: 'blur', validator: validateMobile }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      Qrtimer: null
    }
  },
  watch: {
    // 输入框值改变后调用获取搜索结果;
    input (newval) {
      this.getSearch()
    },
    dialogFormVisible (newval) {
      if (!newval) {
        clearInterval(this.Qrtimer)
      }
    }
  },
  // 引入搜索预览组件
  components: {
    SongItem

  },
  methods: {
    ...mapMutations(['initUserCookie', 'initUserInfo', 'clearUserInfo']),
    // 当用户停止输入后获取五个搜索结果储存展示
    getSearch () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 如果结果为空不发送请求
        if (this.input.length === 0) {
          return
        }
        const { data } = await searchApi(this.input, 5)
        console.log(data)
        this.searchlist = data.result?.songs || []
      }, 500)
    },
    // 获取热门搜索热词储存在本地
    async getHotKeys () {
      const { data: { result: { hots } } } = await hotSearchNameApi()
      // console.log(hots)
      this.hotList = hots
    },
    // 点击热门搜索改变输入框内的值
    addhot (hot) {
      this.input = hot
    },
    // 删除搜索结果
    delResult () {
      this.input = ''
      this.searchlist = []
    },
    // 登录事件
    async login () {
      if (this.activeName === 'phone') {
        this.form.email = ''
        this.form.password = encodeURIComponent(this.form.password)
        const res = await loginInPhone(this.form)
        console.log(res)
        if (res.status === 200) {
          if (res.data.code === 502) {
            this.$message.waring(res.data.msg)
          } else {
            this.$message.success('登录成功')
            this.dialogFormVisible = false
            this.initUserCookie(res.data.cookie)
            this.initUserInfo(res.data.profile)
          }
        }
      }
      if (this.activeName === 'email') {
        this.form.phone = ''
        this.form.password = encodeURIComponent(this.form.password)
        const res = await loginInEmail(this.form)
        if (res.status === 200) {
          if (res.data.code === 502) {
            this.$message.waring(res.data.msg)
          } else if (res.data.code === 200) {
            this.$message.success('登录成功')
            this.initUserCookie(res.data.cookie)
            this.initUserInfo(res.data.profile)
            this.dialogFormVisible = false
          }
        }
        console.log(res)
      }
    },
    // 切换tabs栏执行回调
    handleClick (tab) {
      // console.log(tab.name)
      if (tab.name === 'phone') {
        this.rules = {
          phone: [
            { required: true, trigger: 'blur', validator: validateMobile }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ]
        }
      } else if (tab.name === 'email') {
        this.rules = {
          email: [
            { required: true, trigger: 'blur', validator: validateEamil }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ]
        }
      } else if (tab.name === 'Qrkey') {
        if (this.QrKey) {
          console.log('有key')
          this.getQrinfo()
        } else {
          console.log('没有key')
          this.getQrKey()
        }
      }
    },
    // 获取登录状态
    async loginstate () {
      const res = await loginStatus()
      console.log(res)
      if (res.data.data.code === 200) {
        this.initUserInfo(res.data.data.profile)
      }
    },
    // 签到事件 无用
    async loginSignin () {
      const res = await userSigninAPI()
      console.log(res)
      if (res.code === 200 && res.point === 4) {
        this.$message.warning('请勿重复签到')
      }
      if (res.code === 200 && res.point === 3) {
        this.$message.success('签到成功')
      }
      // if()
      // if (res.coo)
    },
    async loginOut () {
      const res = await userLoginOut()
      console.log(res)
      if (res.data.code === 200) {
        this.clearUserInfo()
        this.visible = false
      }
    },
    // 获取生成二维码的key
    async getQrKey () {
      const res = await loginCreateKey()

      if (res.data.data.code === 200) {
        this.QrKey = res.data.data.unikey
        console.log(this.QrKey)
      }
      this.getQrinfo()
    },
    // 生成二维码
    async getQrinfo () {
      if (this.QrKey) {
        const res = await loginInitQr(this.QrKey)
        console.log(res)
        Qrcode.toCanvas(this.$refs.MyCanvas, res.data.data.qrurl)
        this.getQrState()
      }
    },
    // 轮训二维码状态
    getQrState () {
      if (!this.Qrtimer) {
        this.Qrtimer = setInterval(async () => {
          const res = await confirmQrStatus(this.QrKey)
          console.log(res)
          if (res.data.code === 400) {
            this.$message.warning(res.data.message)
            clearInterval(this.Qrtimer)
          }
          if (res.data.code === 802) {
            this.$message.success(res.data.message)
          }
          if (res.data.code === 803) {
            this.$message.success(res.data.message)
            this.dialogFormVisible = false
            clearInterval(this.Qrtimer)
            this.initUserCookie(res.data.cookie)
            // 检测登录状态
            this.loginstate()
            // this.initUserInfo(res.data.profile)
          }
          if (res.data.code === 800) {
            if (this.isLogin) {
              clearInterval(this.Qrtimer)
            }
          }
        }, 2000)
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogin'])
  },
  created () {
    // 页面加载时自动搜索热词
    this.getHotKeys()
    // this.loginstate()
  }
}
</script>

<style lang='less' scoped>
.head {
  // height: 10vh;
  background-color: #ec4141;
  line-height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  // display: flex;
  width: 100vw;
  // justify-content: space-between;
  .user {
    display: flex;
    .user_avatar {
      padding-right: 10px;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
}

.hot_title {
  font-size: 1rem;
  color: black;
  font-weight: 500;
}
.hot_name_wrap {
  margin: 0.266667rem 0;
}
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.513333rem;
  margin-bottom: 0.513333rem;
  padding: 0 0.573333rem;
  font-size: 0.973333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.btn {
  position: absolute;
  right: 10px;
  a {
    text-decoration: none;
    color: #fff;
  }
}
</style>
