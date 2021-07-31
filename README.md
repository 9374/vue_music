# music_pc2

### 前言

路过的朋友们随手点个Star。本项目仅用于学习。感谢～

### 项目介绍

在线演示 https://music.sn9374.com

后端接口来自 https://github.com/Binaryify/NeteaseCloudMusicApi

主页播放器样式来自 https://github.com/lizzz0523/limni   功能实现改为audio标签 

项目参考于网易云音乐PC版app，目前实现功能

 登录【手机登录，邮箱登录，二维码等离】，

收藏/取消收藏歌单，

喜欢/取消喜欢歌曲，

展示用户创建，收藏的歌单； 搜索功能；

播放功能，单曲循环，列表循环 (遇到无版权自动跳过，偶尔会出现跨域导致跳过失败)

歌词：主界面双语歌词展示，播放详情页面滚动默认歌词；

### 运行项目

1. 运行后端仓库

   1.1. git clone 后端仓库地址

   1.2. cnpm install

   1.3. node app

2. 运行本仓库代码 
   2.1. git clone 本仓库地址

   2.2. cnpm install

   2.3. npm run serve

3. 接口地址请在 src/api/request.js中更改

###  项目效果预览

#### 主页

![主页](https://gitee.com/mana9/img-folder/raw/master/music_pc2/home.jpg)

#### 歌单详情

![歌单详情](https://gitee.com/mana9/img-folder/raw/master/music_pc2/songListDetail.jpg)

#### 播放列表

![播放列表](https://gitee.com/mana9/img-folder/raw/master/music_pc2/playList.jpg)

#### 搜索详情

![搜索详情](https://gitee.com/mana9/img-folder/raw/master/music_pc2/searchList.jpg)

#### 歌单列表

![歌单列表](https://gitee.com/mana9/img-folder/raw/master/music_pc2/allSongList.jpg)

#### 最新音乐

![最新音乐](https://gitee.com/mana9/img-folder/raw/master/music_pc2/newSongList.jpg)

#### 播放详情

![播放详情](https://gitee.com/mana9/img-folder/raw/master/music_pc2/playDetail.jpg)

#### 登录