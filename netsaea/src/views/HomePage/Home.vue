 <template  >
  <div id="Home_Contain" @mousemove="move">
    <!-- 毛玻璃效果 -->
    <Serch />
    <suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </suspense>
    <!-- 底部 -->
    <Bottom />
    <!-- 悬浮歌词 -->
    <LiveLyric />
  </div>
</template>
 <script lang='ts'>
import { defineComponent } from "vue";
import Serch from "../../components/Serch.vue";
import Bottom from "../../components/Buttom.vue";
import LiveLyric from "../../components/LiveLyric.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Home",
  components: {
    Serch,
    Bottom,
    LiveLyric,
  },
  setup() {
    var store = useStore();

    var move = (e) => {
      // var x = e.clientX;
      // var y = e.clientY;
      // // console.log(e,x,y)
      // // store.commit('setOffset',{
      // //   x,y
      // // })
    };
    return {
      move,
    };
  },
});
</script>
<style lang="less">
html {
  width: 100vw;
  height: 100vh;

  background: url("./main.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  #Home_Contain {
    // position: relative;
    width: 70vw;
    min-width: 1366px;
    height: 90vh;
    min-height: 900px;
    background-color: rgba(255, 192, 203, 0.464);
    border-radius: 10px;
  }
}
</style>