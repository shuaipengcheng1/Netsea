 <template>
  <div class="buttom">
    <!-- 播放键 -->
    <audio :src="music" controls @timeupdate="update" @play="play" @pause="pause"></audio>
    <!--  -->
  </div>
</template>
 <script lang='ts'>
import { defineComponent, ref, toRaw } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  setup() {
    var music = ref();
    var store = useStore();
    var state = ref({
      picUrl: "",
      name: "",
      art: "",
    });
    var play = () => {
      // 开始播放
      console.log("开始播放");

      store.commit("play");
    };
    var update =function(e:any){
      // console.log((e.target.currentTime as number).toFixed(2))
      // 将时间戳给到vuex
      store.commit("setTime", (e.target.currentTime as number).toFixed(2))
    }
    var pause = () => {
      // 暂停播放
      // console.log("暂停播放");

      store.commit("purse");
    };
    // 获取到正在播放的音乐
    // while(music.picUrl==""){

    // }
    // console.log(music);
    // 获取是否可以播放 使用一个定时器 一直监听
    var timer = setInterval(() => {
      var stat = store.getters.getisPlay;

      if (stat) {
        //    可以播放了
        //  获取音乐信息
        music.value = store.getters.getMusic.message.data[0].url;
        var { name, picUrl, art } = store.getters.getMusic;
        state.value.picUrl = picUrl;
        state.value.name = name;
        state.value.art = art;
        // console.log(state.value);
        // clearInterval(timer);
        // 状态为false 继续等待下次通知

        stat = false;
      }
    }, 1000);
    // console.log(music);
    // music.value = store.getters.getMusic.message.data[0].url;

    //value
    // console.log(music.value);
    return {
      music,
      play,
      pause,
      update
    };
  },
});
</script>
<style lang="less">
.buttom {
  height: 100px;
  width: 100%;
  border-top: 1px solid black;
  background-color: white;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  min-width: 1366px;
}
</style>