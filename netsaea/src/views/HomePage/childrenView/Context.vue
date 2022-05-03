 <template>
  <!-- 内容 -->

  <div id="Context">
    <div
      @click="Pull"
      :style="Left_set"
      class="button iconfont icon-anniu-jiantouxiangyou_o"
    ></div>
    <!-- 左右翻页 -->
    <div
      :style="LeftButtonState"
      class="leftButton iconfont icon-anniu_jiantouxiangzuo_o"
      @click="leftButton"
    ></div>

    <div
      :style="RigthButtonState"
      class="RigthButton iconfont icon-anniu-jiantouxiangyou_o"
      @click="RigthButton"
    ></div>
    <!-- 测拉栏 -->
    <div id="SidePull" :style="Css_set">
      <div class="Box">
        <!-- 用户头像区域 -->
        <div class="usericon">
          <div class="imgbox">
            <img src="../People.jpg" alt="" />
          </div>
          <p>未登录~</p>
        </div>
        <!-- 歌单 收藏 ... -->
        <ul class="list">
          <li class="item">歌单</li>
          <li class="item">收藏</li>
          <li class="item">最近播放</li>
        </ul>
      </div>
    </div>

    <!-- 音乐展示区 -->
    <div id="show">
      <div
        class="item"
        key="index"
        v-for="(item, index) in showArr"
        @click="play(item)"
      >
        <!-- 图片 -->
        <div class="detail">
          <div class="imgBox">
            <img :src="item.picUrl" alt="" />
          </div>
          <!-- 歌名 -->
          <div class="songName">
            <p>{{ item.name }}</p>
          </div>
          <!-- 歌手 -->
          <div class="singer">
            <p>{{ item.art }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <script lang='ts'>
import { defineComponent, Ref, ref, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default defineComponent({
  name: "App",
  async setup() {
    class song {
      id: number;
      name: string;
      picUrl: string;
      art: string;
      message: any;
      constructor(id: number, name: string, picUrl: string, art: string) {
        this.id = id;
        this.name = name;
        this.picUrl = picUrl;
        this.art = art;
      }
    }
    // 歌曲数组
    var store = useStore();
    var router = useRouter();
    var route = useRoute();
    var showArr: Ref<song[]> = ref([]);
    var Songs: song[] = [];
    var pages: Ref<number> = ref(1);
    var c = 0;
    var flag = false;
    var maxpages = 0;
    //  随机请求数据
    var arr: string[] = [
      "放課後ティータイム",
      "Aimer",
      "amazarashi",
      "Avicii",
      "RADWIMPS",
    ];
    var index: number = Math.floor(Math.random() * arr.length);
    console.log("随机" + index);
    //获取封面
    //https://autumnfish.cn/song/detail?ids=426881480
    if (Songs.length != 0) {
      //  计算公式  page-1*8 -> page*8
      var startIndex = (pages.value - 1) * 8;
      if (c >= startIndex + 8 && !flag) {
        for (var i = startIndex; i < 8; i++) {
          // 要显示的数据
          showArr.value.push(Songs[i]);
        }
        // 表示已经复制了
        flag = true;
      }
    } else {
      await axios({
        method: "GET",
        url: `https://autumnfish.cn/search?keywords=${arr[index]}`,
      }).then(
        (v) => {
          var songs = v.data.result.songs;
          songs.forEach((item: any, index: object) => {
            //获取歌曲id
            var id: number = item.id as number;
            var artname: string = item.artists[0].name;

            axios({
              method: "GET",
              url: `https://autumnfish.cn/song/detail?ids=${id}`,
            }).then((v) => {
              c++;
              //   获取封面
              var imgurl: string = v.data.songs[0].al.picUrl;
              // 获取名字
              var name: string = v.data.songs[0].name;
              // 封装一个class
              var detail = new song(id, name, imgurl, artname);
              Songs.push(detail);
              // 展示的1页8个
              //  计算公式  page-1*8 -> page*8
              var startIndex = (pages.value - 1) * 8;
              if (c >= startIndex + 8 && !flag) {
                for (var i = startIndex; i < 8; i++) {
                  // 要显示的数据
                  showArr.value.push(Songs[i]);
                }
                // 表示已经有了
                flag = true;
              }
            });
          });
          console.log();
          maxpages = Math.ceil(v.data.result.songs.length / 8); //最大页数
        },
        (e) => {}
      );
    }

    console.log(showArr);

    var isPull = false; //默认为关闭
    //  点击弹出事件
    var Css_set: Ref<string> = ref("width:0px");
    var Left_set: Ref<string> = ref("left:0px");
    var Pull = () => {
      if ((isPull = !isPull)) {
        // 关闭时点击
        Css_set.value = "width:300px";
        Left_set.value = "left:300px";
      } else {
        Css_set.value = "width:0px";
        Left_set.value = "left:0px";
      }
    };

    // 左右翻页
    //  逻辑
    //  1 pages-1 小于0 说明不能向右了
    // 2 pages>=maxpage 说明没有跟多了
    var LeftButtonState = ref("color:black;");
    var RigthButtonState = ref("color:black;");

    //上一页
    var leftButton = () => {
      // console.log("zuo1边");
      if (pages.value - 1 > 0) {
        //  计算公式  page-1*8 -> page*8
        var startIndex = (pages.value - 2) * 8;
        showArr.value = [];
        for (var i = startIndex; i < startIndex + 8; i++) {
          // console.log(startIndex, pages, Songs[i]);
          // 要显示的数据
          showArr.value.push(Songs[i]);
        }
        LeftButtonState.value = "color:black;";
        RigthButtonState.value = "color:black;";
        pages.value--; //
      } else {
        LeftButtonState.value = "color:gray;";
      }
    };
    var RigthButton = () => {
      // console.log("右边", maxpages, pages.value);
      if (pages.value < maxpages) {
        //  计算公式  page-1*8 -> page*8
        var endIndex = (pages.value + 1) * 8;
        showArr.value = [];
        for (var i = pages.value * 8; i < endIndex; i++) {
          // console.log(Songs[i]);
          // 要显示的数据
          showArr.value.push(Songs[i]);
        }
        LeftButtonState.value = "color:black;";
        RigthButtonState.value = "color:black;";
        pages.value++; //
      } else {
        RigthButtonState.value = "color:gray;";
      }
    };

    // 音乐信息传递 给播放器
    var play = (item: song) => {
      //
      // 获取歌曲信息
      axios({
        method: "GET",
        url: `https://autumnfish.cn/song/url?id=${item.id}&br=128000`,
      }).then((v) => {
        item.message = v.data;
        // 存放在vuex中
        store.commit("setMusic", toRaw(item));
        console.log(item);
        router.push({
          path: "/music",
        });
      });
    };
    var value = "";
    // 等待搜索结果s
    setInterval(() => {
      var arr = store.getters.getSerch;
      if (arr.length != 0 && value != arr[0].name) {
        console.log("pass");

        // 防止重复
        value = arr[0].name;
        // 回到第一页
        pages.value=1;
        router.push({
          path:"/"
        })
        var songArray: song[] = [];
        Songs = [];

        arr.forEach((item: any) => {
          var s = new song(item.id, item.name, item.picUrl, item.art);
          songArray.push(s);
        });
        Songs = songArray;
        // 清空vuex
        store.commit('setSerch',[])

        console.log(Songs.values);
        showArr.value = [];
        //  计算公式  page-1*8 -> page*8
        var startIndex = (pages.value - 1) * 8;
        console.log(startIndex);
        for (var i = startIndex; i < 8; i++) {
          // 要显示的数据
          console.log(Songs[i]);
          showArr.value.push(Songs[i]);
        }
        console.log(showArr.value);
      }
    }, 1000);
    return {
      showArr,
      Pull,
      Css_set,
      Left_set,
      LeftButtonState,
      RigthButtonState,
      leftButton,
      RigthButton,
      play,
    };
  },
});
</script>
<style lang="less">
#Context {
  &:hover {
    .leftButton {
      opacity: 1;
    }
    .RigthButton {
      opacity: 1;
    }
  }
  height: 725px;
  width: 100%;
  position: relative;
}
.button {
  font-family: "iconfont";
  transition: all 0.2s;
  // left: 300px;
  position: absolute;
  display: flex;
  align-items: center;
  width: 10px;
  justify-content: center;
  font-size: 20px;
  color: black;
  font-weight: bold;
  height: 80px;
  border-radius: 8px;

  animation: move 2s infinite;
  background-color: white;
  top: 0px;
}
#SidePull {
  position: absolute;
  transition: all 0.2s;
  width: 0px; //300px
  height: 725px;
  overflow: hidden;
  background-color: rgba(255, 183, 183, 0.724);
  .Box {
    width: 100%;
    height: 100%;
    .usericon {
      height: 362.5px;
      width: 100%;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid black;
      p {
        font: 16px;
      }
      .imgbox {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-items: center;
        overflow: hidden;

        img {
          width: 1px;
          height: 1px;
          min-width: 100%;
          min-height: 100%;
        }
      }
      p {
      }
    }
    .list {
      width: 100%;
      height: 362.5;
      display: flex;
      flex-flow: column wrap;

      .item {
        border-bottom: 1px solid black;

        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  @keyframes move {
    0% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0px);
    }
  }
}
//1366px 700px
//  未展开 4*2
//  展开 3*2
// 每一个音乐 宽度 301.5 高度 300 一页8个 多余的分页
// 展开后 sidePull 宽度 0px -->301.5
// show的宽度 -301.5
#show {
  width: 100%; //展开后 -301.5
  min-width: 1366-301.5px;
  height: 700px;
  transition: 0.2s all;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  .item {
    transition: 0.2s all;
    min-width: 250.5px;
    width: 15%;

    margin: 50px;
    margin-bottom: 0px;
    // width: 305.5px;
    height: 300px;
    padding: 2px;
    display: flex;
    flex-flow: wrap column;
    justify-content: space-around;
    .detail {
      .imgBox {
        height: 280px;

        img {
          width: 1px;
          height: 1px;
          min-width: 100%;
          min-height: 100%;
        }
      }
      .songName {
        height: 35px;
        font-size: 12px;
        p {
          line-height: 35px;
          text-align: center;
        }
      }
      .singer {
        height: 35px;
        font-size: 12px;
        p {
          line-height: 35px;
          text-align: center;
        }
      }
    }
  }
}
@media only screen and (max-width: 1980px) {
  #show {
  }
  div.item {
    width: 1366/3px;
    height: 700/2px;
    min-width: 0px !important;
    margin: 0px;
  }
}
.leftButton {
  position: absolute;
  font-size: 60px;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: 0.2s all;
  &:hover {
    color: white;
  }
}
.RigthButton {
  opacity: 0;
  transition: 0.2s all;
  &:hover {
    color: white;
  }
  position: absolute;
  font-size: 60px;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
</style>