 <template>
  <div class="contain">
    <div class="containBox">
      <!-- 封面 -->
      <div id="pic">
        <img
          :src="musicstate.picUrl"
          alt=""
          :class="getMusicState.isPlaying.toString()"
        />
      </div>
      <!-- 歌词 -->
      <div class="lyricBox" @scroll="scoll">
        <div class="lyric" ref="box">
          <div style="white-space: pre-wrap" >
            <li
              v-for="(item, i) in arr"
              :class="`${i == index ? 'item click' : 'item '}`"
            >
              {{ item }}
            </li>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="conmunicate"></div>
  </div>
</template>
 <script lang='ts'>
import axios from "axios";
import { defineComponent, Ref, ref, toRaw } from "vue";
// import { useRoute, useRouter } from "vue-router";
import { useStore, mapGetters } from "vuex";
export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters(["getMusicState"]),
  },
  setup() {
    var store = useStore();
    var lyric = ref("");
    var tlyric = ref("");
    var comment = ref([]);
    var box = ref();
    var timeArr: Ref<number[]> = ref([]);
    var arr: Ref<string[]> = ref([]);
    var index: Ref<number> = ref(0);
    var musicstate = ref({
      name: "",
      picUrl: "",
      art: "",
    });
    var music = toRaw(store.getters.getMusic);
    // 线程 获取歌的进度
    var num = 0;
    // 防止一个下标的歌词重复判断
    var item_recheckIndex = -1;
    setInterval(() => {
      for (var i = 0; i < timeArr.value.length; i++) {
        // 判断是否playing
        if (store.getters.getMusicState.isPlaying) {
          
          // 如果时间戳大于等于 则显示该歌词
          if (timeArr.value[i] >= store.getters.getTime) {
            if(i==item_recheckIndex){
              // 防止重复循环

              break;
            }
            item_recheckIndex=i;
            index.value = i;
            num=i;
            // console.log(i);
            // 移动
            // console.log(box.value.scrollTop)F
            box.value.scrollTop = num*16; 
       
            break;
          }
        }
      }
    }, 100);
    // 获取歌词
    axios({
      url: `https://autumnfish.cn/lyric?id=${music.id}`,
      method: "GET",
    }).then((v) => {
      // 歌词
      lyric.value = v.data.lrc.lyric;
      //    翻译
      tlyric.value = v.data.tlyric.lyric;
      // 将歌词分割为数组
      // console.log(lyric);
      arr.value = (lyric.value as string).split("\n");
      // console.log(arr.value.length);
      arr.value.forEach((item) => {
        // 将时间提取为数字
        // console.log(item);
        // 分钟
        var min = parseInt(item.slice(1, 3));
        // 秒
        var scond = parseInt(item.slice(4, 6));
        // 毫秒
        var ms = parseInt(item.slice(7, 9));

        // 每一个的时间戳
        var result = min * 60 + scond + ms * 0.01;
        timeArr.value.push(result);
      });
      // console.log(timeArr);
    });

    var { picUrl, art, name } = music;
    musicstate.value.picUrl = picUrl;
    musicstate.value.art = art;
    musicstate.value.name = name;
    // console.log(musicstate);
    // 获取评论
    axios({
      method: "GET",
      url: `https://autumnfish.cn/comment/hot?type=0&id=${music.id}`,
    }).then((v) => {
      comment = v.data.hotComments;
      // console.log(comment);
    });
    // 通知buttom组件 可以播放了
    store.commit("goPlay");
    // 滚动
    var scoll = (e: any) => {
      e.preventDefault();
    };

    return {
      lyric,
      tlyric,
      comment,
      musicstate,
      scoll,
      arr,
      index,
      box,
    };
  },
});
</script>
<style lang="less">
.contain {
  min-height: 725px;
  width: 100%;
  position: relative;
  //   overflow: scroll;
  .containBox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    height: 700px;

    #pic {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 0px;
        width: 0px;
        min-width: 100%;
        min-height: 100%;
      }
      .true {
        animation: route 100s infinite;
        animation-fill-mode: forwards;
      }
    }
    .lyricBox {
      
      width: 500-25px;
      height: 500-25px;
      overflow: hidden;
    }
    .lyric {
      height: 500px;
      width: 500px;
      .item {
        width: 100%;
        height: 1rem;
        margin-bottom: 5px;
      }
      .click {
        color: white;
        transition: 0.2s all;
        font-size: large;
        margin: 25px 0px 25px 0px;
      }
      overflow: scroll;

      padding: 0px 25px 25px 0px;
    }
  }
}
@keyframes route {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>