<template>

     <div>
          <div class="hotTop">
          热门城市
          </div>
          <!-- 获取数据为异步的，所以要判断list有没有长度（有没有数据），如果没有就先不渲染， -->
          <div class="hotCities" v-if="list.length">
               <span v-for="(item,index) in list[0].cities"  :key="index">
                   {{item.name}}
               </span>
          </div>

          <van-index-bar :index-list="indexList">
               <div v-for="(item,index) in list" :key="index">
                   <template v-if="list.prefix!=='hotCities'">
                         <van-index-anchor :index="item.prefix | toUpperCase" />
                        <van-cell  v-for="(it,i) in item.cities" :key="i" :title="it.name" @click="handleClick(it)"/>
                   </template>
               </div>
           
            </van-index-bar>
     </div>
  
</template>

<script>

import { getCitiesList }  from '../utils/api';
export default {
data(){
    return {
        list:[]
    }
},
mounted(){
    this.getList()
},
computed:{
    indexList() {
      let arr = [];
      for (let i = 1; i < this.list.length; i++) {
        arr.push(this.list[i].prefix.toUpperCase())
      }
      return arr
    }
},
filters:{
toUpperCase(value){
   return  value.toUpperCase();
}
},
methods:{
    async getList(){
        const res=await getCitiesList();
        console.log(res);
        this.list=res;
                  },
    handleClick(it){
    //   把
    console.log(it);
    this.$store.commit('changeCity',it);
        this.$router.go(-1);
        
    }

      }
}
</script>

<style>
.hotTop {
  z-index: 1;
  box-sizing: border-box;
  padding: 0 0.42667rem;
  color: #323233;
  font-weight: 500;
  font-size: 0.37333rem;
  line-height: 0.85333rem;
  background-color: transparent;
}
.hotCities {
  background: #fff;
  overflow: hidden;
}
.hotCities span {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 4%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
}
</style>