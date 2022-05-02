import { createStore } from 'vuex'

export default createStore({
  state: {
    // 正在播放的歌曲信息
    music: {
      id: '',
      name: "",
      picUrl: "",
      art: "",
      message: {}
    },
    isPlay: false,
    // 是否正在播放
    isPlaying: false,
    // 是否暂停
    isPurse: false,
    // 用户信息
    // 时间戳
    time: 0,
    lyric:{
      // 歌曲小标
      Index:0,
      // 歌词数组
      lyricarr:[]
    },
    // 跳转的时间
    gotoTime:-1,
    position:{
      x:"",
      y:""
    }
  },
  // 获取处理后的信息
  getters: {
    getMusic(state) {
      return state.music;
    },
    getisPlay(state) {
      return state.isPlay
    },
    getMusicState(state) {
      return {
        isPlaying: state.isPlaying,
        isPurse: state.isPurse
      }
    },
    getTime(state){
      return state.time;
    },
    getGoto(state){
      return state.gotoTime
    },
    getLivelyric(state){
      return state.lyric.lyricarr[state.lyric.Index]
    },
    getPosition(state){
      return state.position
    }
  },
  // 处理同步逻辑
  mutations: {
    // 设置music信息
    setMusic(state, data) {
      // 解构赋值
      var { id, name, picUrl, art, message } = data;
      state.music = {
        id,
        name,
        picUrl,
        art,
        message
      }
    },
    goPlay(state) {
      state.isPlay = true
    },
    play(state) {
      state.isPlaying = true;
      state.isPurse = false;
    },
    purse(state) {

      state.isPlaying = false;
      state.isPurse = true;
    },
    setTime(state,time){
        state.time=time;
    },
    // 共享的播放时间戳  后期做一个漂浮歌词
    setlyric(state,data){
      var {Index,arr} = data;
      state.lyric.Index=Index
      state.lyric.lyricarr=arr
    },
    setGoto(state,time){
      state.gotoTime=time
    },
    setOffset(state,position){
      var {x,y} = position
      state.position.x=x
      state.position.y=y


    }
  },
  // 处理异步逻辑
  actions: {
  },

  modules: {
  }
})
