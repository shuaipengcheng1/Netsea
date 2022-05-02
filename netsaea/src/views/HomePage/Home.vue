 <template>
  <div id="Home_Contain">
    <!-- 毛玻璃效果 -->
    <Serch />
    <suspense>
      <template #default>
        <router-view/>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </suspense>
    <!-- 底部 -->
    <Bottom/>
  </div>
</template>
 <script lang='ts'>
import { defineComponent } from "vue";
import Serch from "../../components/Serch.vue";
import Bottom from '../../components/Buttom.vue'
export default defineComponent({
  name: "Home",
  components: {
    Serch,
    Bottom
  },
  setup() {},
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
    width: 70vw;
    min-width: 1366px;
    height: 90vh;
    min-height: 900px;
    background-color: rgba(255, 192, 203, 0.464);
    border-radius: 10px;
  }
}
</style>