<template>
  <div class="index-page">
    <my-header :showBack="false"/>
     <my-tabs />
<!-- 把index页面中的Hot.vue 、Wait.vue 、Cinema.vue、Classics.vue通过路由的分发，在出口中输出-->
     <router-view></router-view>
    
  </div>
</template>

<script>


import MyHeader from "../components/public/Header";
// @表示src文件夹
import MyTabs from "@/components/index/Tabs";

export default {
  data() {
    return {}
  },
  components: {
    MyHeader,
    MyTabs
  },
 
};
</script>
<style lang='scss' scoped>
//.wrap:在各个组件通过路由分发过来后，对各个组件作用
.wrap {
  position: absolute;
  top: 94px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
