 <template>
  <div
    :class="className"
    @mousewheel="font"
    @mousedown="Pull"
    :style="`left:${x_p == -1 ? '50%' : x_p}px;top:${
      y_p == -1 ? 'none' : y_p
    }px;font-size:${size}px;color:rgb(${colorList.red},${colorList.Green},${
      colorList.Blue
    })`"
  >
    <p>
      {{ getLivelyric == undefined ? "欢迎来到xx音乐~~" : getLivelyric }}
    </p>
  </div>
</template>
 <script lang='ts'>
import { defineComponent, Ref, ref } from "vue";
import { mapGetters, useStore } from "vuex";
export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters(["getLivelyric"]),
  },
  setup() {
    class color {
      red: number = 255;
      Green: number = 192;
      Blue: number = 203;
    }
    var x_p = ref(-1);
    var y_p = ref(-1);
    var colorList: Ref<color> = ref(new color());

    // var store = useStore();
    var className: Ref<string> = ref("LiveLyric");
    var Pull = (e: Event) => {
      // 鼠标点击时
      x_p.value = (e as MouseEvent).pageX;
      y_p.value = (e as MouseEvent).pageY - 16;
      className.value = "LiveLyric active";
      console.log(e);
      document.onmousemove = (e: Event) => {
        x_p.value = (e as MouseEvent).pageX;
        y_p.value = (e as MouseEvent).pageY - 16;
      };
      // 随机颜色
      var c = new color();
      c.red = Math.ceil(Math.random() * 255);
      c.Green = Math.ceil(Math.random() * 255);
      c.Blue = Math.ceil(Math.random() * 255);
      colorList.value = c;

      document.onmouseup = () => {
        className.value = "LiveLyric";

        document.onmousedown = null;
        document.onmousemove = null;
      };
    };
    var size = ref(25);
    var font = (e: Event) => {
      // console.log(e);
      if ((e as WheelEvent).deltaY < 0) {
        console.log("up");
        if (size.value <= 40) {
          size.value++;
        }
      } else {
        console.log("down");
        if (size.value >= 20) {
          size.value--;
        }
      }
    };
    return {
      Pull,
      x_p,
      y_p,
      className,
      font,
      size,
      colorList,
    };
  },
});
</script>
<style lang="less">
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
.LiveLyric.active {
  p {
    border: 1px dotted pink;
  }
}
</style>