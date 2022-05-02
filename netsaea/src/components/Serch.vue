 <template>
  <div id="SerchBox" ref="box" :style="color">
    <!-- 右侧 -->
    <div class="rigth">
      <!-- 顶部栏 -->
      <div class="logoBox">
        <p class="name">网易云音乐</p>
      </div>
      <!-- 前进后退 搜索框 -->
      <div class="Controler">
        <div class="prev">
          <i class="iconfont icon-anniu_jiantouxiangzuo_o"></i>
        </div>
        <div class="back">
          <i class="iconfont icon-anniu-jiantouxiangyou_o"></i>
        </div>
        <div class="serch">
          <input type="text" name="" id="" placeholder="搜搜看" />
        </div>
      </div>
    </div>
    <!-- 左侧 -->
    <div class="left">
        <!-- 登录注册 -->



      <div class="changeColor">
        <i class="iconfont icon-anniu-jiantouxiangyou_o"></i>
        <!-- 下拉栏 -->
        <ul class="pull">
          <li
            @click="change(index)"
            v-for="(item, index) in colorArr"
            key="index"
          >
            <div :style="item.value">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 <script lang='ts'>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    var box = ref(null);
    console.log(box);
    var color = ref("background-color:rgb(255, 148, 166);");
    //   可以变更的颜色数组
    var colorArr = ref([
      {
        name: "pink",
        value: "background-color:rgb(255, 148, 166);",
      },
      {
        name: "red",
        value: "background-color:red;",
      },
      {
        name: "skyblue",
        value: "background-color:skyblue;",
      },
    ]);
    var change = (i: number) => {
  
      color.value = colorArr.value[i].value;
    };
    return {
      box,
      colorArr,
      change,
      color,
    };
  },
});
</script>
<style lang="less">
#SerchBox {
    transition: .2s all;
  width: 100%;
  background-color: rgb(255, 148, 166);
  height: 75px;
  display: flex;
  .rigth {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .logoBox {
      padding-left: 30px;
      display: flex;
      height: 100%;
      align-items: center;
      .name {
        font-size: large;
        font-weight: bold;
        color: white;
      }
    }
    .Controler {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      i {
        font-size: 25px;
        color: white;
      }
      .serch {
        height: 100%;
        display: flex;
        align-items: center;

        &::before {
          content: "";
          background-color: white;

          width: 20px;
          height: 50%;
          border-radius: 100%;
          transform: translateX(10px);
        }
        &::after {
          content: "";
          background-color: white;
          width: 20px;
          height: 50%;
          border-radius: 100%;
          margin: 0px 0px 0px -10px;
        }
        input {
          width: 150px;
          height: 50%;
          padding-left: 10px;
          outline: none;

          border: none;
        }
      }
    }
  }
  .left {
    width: 60%;
    display: flex;
    flex-direction: row-reverse;
    .changeColor {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &:hover {
        .pull {
          opacity: 1;
        }
      }
      i {
        font-size: 40px;
        transform: rotate(90deg);

        color: white;
      }
      .pull {
        border-radius: 5px;
        opacity: 0;
        position: absolute;
        transition: 0.2s all;
        z-index: 10;
        width: 80px;
        height: 200px;
        background-color: rgba(255, 255, 255, 0.511);
        top: 55px;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-around;
        li {
          width: 100%;
          height: 23%;
          div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s all;
            position: relative;
            font-family: "幼圆";
            &:hover {
              top: 2px;
              right: 2px;
              box-shadow: 5px 5px 20px black;
            }
          }
        }
      }
    }
  }
}
</style>