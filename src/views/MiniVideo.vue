<template>
  <div>
   {{msg}}
  </div>
</template>


<script>
export default {
  //组件内的前置守卫
  beforeRouterEnter(to,from,next){
    //在渲染该组件的对应路由被confirm 前调用
    //不能 获取罪案实例 ‘this’
    // 因为当守卫执行前，组件实例还没被创建
    console.log(to);
    console.log(from);
    console.log(this);
    next();
    this.msg='nihao'
  },
  data(){
    return {
      msg:'这里是小视频'
    }
  }
}
</script>