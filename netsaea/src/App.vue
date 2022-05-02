 <template>
  <router-view/>
</template>
 <script lang='ts'>
 import { defineComponent} from 'vue';
 export default defineComponent({
   name: 'App',
});
</script>
<style>
@font-face {
  font-family: "iconfont"; /* Project id 3370101 */
  src: url('//at.alicdn.com/t/font_3370101_hrwudz3qbli.woff2?t=1651309296763') format('woff2'),
       url('//at.alicdn.com/t/font_3370101_hrwudz3qbli.woff?t=1651309296763') format('woff'),
       url('//at.alicdn.com/t/font_3370101_hrwudz3qbli.ttf?t=1651309296763') format('truetype');
}
*{
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-xiazai:before {
  content: "\e668";
}

.icon-fenxiang:before {
  content: "\e739";
}

.icon-jushoucang:before {
  content: "\e643";
}

.icon-jushoucanggift:before {
  content: "\e684";
}

.icon-tianjia:before {
  content: "\e622";
}

.icon-bofang:before {
  content: "\e87c";
}

.icon-anniu_jiantouxiangzuo_o:before {
  content: "\eb89";
}

.icon-anniu-jiantouxiangyou_o:before {
  content: "\eb8c";
}


</style>