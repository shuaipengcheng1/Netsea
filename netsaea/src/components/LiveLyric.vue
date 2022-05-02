 <template>
  <div
    class="LiveLyric"
    @mousemove="Pull"
    :style="`left:${x_p == -1 ? '50%' : x_p}px;top:${
      y_p == -1 ? 'none' : y_p
    }px`"
  >
    <p>
      {{ getLivelyric == undefined ? "欢迎来到xx音乐~~" : getLivelyric }}
    </p>
  </div>
</template>
 <script lang='ts'>
import { defineComponent, ref } from "vue";
import { mapGetters, useStore } from "vuex";
export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters(["getLivelyric"]),
  },
  setup() {
    var x_p = ref(-1);
    var y_p = ref(-1);
    var store = useStore();

    var Pull = (e) => {
      // 鼠标点击时
      //   x_p.value = e.pageX;
      //   y_p.value = e.pageY;
      // console.log(e)
      x_p.value = e.pageX;
      y_p.value = e.pageY - 16;
    };
    return {
      Pull,
      x_p,
      y_p,
    };
  },
});
</script>
<style>
.LiveLyric {
  position: absolute;
  width: auto;
  height: 1rem;
  color: pink;
  bottom: 100px;
  left: 50%;
  font-size: 25px;
  transform: translateX(-50%);
  user-select: none;
}
</style>