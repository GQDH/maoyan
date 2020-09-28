<template>
  <div class="detail-wrap">
    <main>
      <header>
        猫眼电影 > {{movieInfo.nm}}
      </header>
      <section class="info">
        <img :src="movieInfo.img" alt="" class="poster">
        <article class="right">
          <p>{{movieInfo.nm}}</p>
          <p>{{movieInfo.enm}}</p>
          <p>
            <span v-for="(item,index) in movieInfo.tags" :key="index"
            >
            {{item}}{{index===movieInfo.tags.length-1?'':'/'}}
            </span>
          </p>
          <p class="star">
            <span v-for="(item,index) in movieInfo.star" :key="index"
            >
            {{item}}{{index===movieInfo.star.length-1?'':'/'}}
            </span>
          </p>
          <p>{{ movieInfo.showTime }}</p>
          <div style="display: flex">
            <button>❤想看</button>
            <button>☆看过</button>
          </div>
        </article>
      </section>

      <section class="praise">
        <div class="top">
          
          <span><img class="img1"
          src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/logo.png" alt="">实时口碑</span>
         <span>{{ praise.watched }}人看过</span>
          <span>{{ praise.wish }}人想看</span>
        </div>
        <div class="left">
          <div class="sc-left">
            <div class="moviescore">{{ praise.score }}</div>
            <div>{{ praise.evaluate }}评</div>
          </div>
         <div class="sc">
           <detail-score
            v-for="(item,index) in praise.mark"
            :key="index"
            :item="item"
            :pic="praise.starPic"
            :evaluate="praise.evaluate"
            :num="5-index"
        />
         </div>
        </div>
       
      </section>

      <section class="minishow">
        <div class="show-wrap">
           <span class="introduce">简介</span>
           <span class="show">{{show}}</span>
        </div>
         <p class="content" @click="hide" :style="{ overflow : hd}">{{movieInfo.content}}</p>
      </section>

      <!-- 演员 -->

      <section class="moviestar" >
          <div class="star">
            <p class="per">演职人员</p>
            <p class="all">全部 &gt;</p>
          </div>
          <div class="actor">
            <div class="self" v-for="(item,index) in movieInfo.actorList" :key="index">
              <img :src="item.pic" alt=""  class="i1">
              <p class="p1">{{item.name}}</p>
              <p class="p2">{{item.role}}</p>
            </div>
          </div>
      </section>

      <!-- 短评 -->
      <div class="shortcommit">
        <p>短评</p>
      </div>

    </main>
  </div>
</template>
<script>
import DetailScore from '../components/Detail/Score'
import {getMovieInfo} from '../utils/api'
export default {
  data(){
    return {
    movieInfo:{},
    praise:{},
    discuss:[],
    show:'展开 +',
    hd:'hidden'
        }
  },
  components:{
    DetailScore
  },
  mounted(){
    this.getMovieInfo1()
  },
  methods:{
    async getMovieInfo1(){
      const res=await getMovieInfo({
        // 传参
        id:this.$route.params.id
      });
      if(res.status===0){
        this.movieInfo=res.movieInfo;
        this.praise=res.praise;
        this.discuss=res.discuss;
      }
    },
    hide(){
     
      if(this.hd=='hidden'){
      this.show="收起 -";
      this.hd='visible';
      }else{
        this.show="展开 +";
      this.hd='hidden';
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #385266;
    z-index: 999;
    main {
      background: #385266;
      .shortcommit{
        color:#fff;
        font-size: 18px;;
      }
       .moviestar{
            width:100%;
            .actor{
              display:flex;
              width:100%;
              flex-shrink: 0;
              overflow:auto;
              .self{
                width:82px;
                height:148px;
                // background:red;
                margin-right:10px;
                display:flex;
                flex-direction: column;
                .i1{
                  width:80px;
                  height:112px;
                }
                .p1{
                   font-size: 14px;
                  width:80px;
                  color:#fff;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
                .p2{
                   font-size: 14px;
                  width:80px;
                  color:#fff;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  opacity:.5
                }
              }
            }
            .star{
              width:100%;
              height:60px;
              display:flex;
              justify-content: space-between;
              align-items:center;
              .per{
                color:#fff;
                font-size: 16px;
              }
              .all{
                color:#fff;
                opacity:.6;
                font-size:14px;
              }
            }
          }
      padding: 21px 16px;
      .minishow{
        padding-top:16px;
        .show-wrap{
          overflow: hidden;
          width:100%;
          .introduce{
            font-size: .3rem;
            color:#fff;
            float:left;
          }
         
          .show{
            float:right;
            font-size: .24rem;
            opacity: .6;
            color: #fff;
          }
        }
        .hidden{
         overflow:hidden
        }
        .content{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          text-overflow: ellipsis;
              // word-wrap: break-word;
          word-break: break-all;
          // overflow: hidden;
          font-size: 14px;
          line-height: .52rem;
        margin: .14rem 0;
        text-align: justify;
        color:#fff;
        }
      }

      header {
        color: #ccc;
        font-size: 14px;
        margin-bottom: 15px;
      }

      .info {
        width: 100%;
        height: 138px;
        display: flex;
        .right{
          margin-left:10px;
        }

        .poster {
          width: 100px;
          height: 138px;
        }

        article {
          font-size: 14px;
          line-height:18px;
          width: 243px;
          color:#ccc;

          .star {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            background: hsla(0,0%,100%,.35);
            box-shadow: 0 0.02rem 0.08rem 0 rgba(0,0,0,.1);
            border-radius: .08rem;
            font-size: 16px;
            // width: 47.61904762%;
            width:150px;
            margin:10px;
            height: 30px;
            color: #fff;
            border: none;
          }
        }
      }

      .praise {
        width: 100%;
        height: 176px;
        margin-top: 15px;
        padding: 10px 12px;
        background-color: rgba(0,0,0,.2);
        box-shadow: 0 0 0.06rem 0 hsla(0,0%,100%,.03);
        border-radius: 6px;
        font-size: 14px;
        color: #fff;
        .left{
          overflow: hidden;
          width:100%;
          text-align: center;
         .sc-left{
            margin-top:50px;
            margin-left:30px;
           float:left;
            .moviescore{
            float:left;
            font-size: .68rem;
            color: #ffb400;
            line-height: .8rem;
                       }
         }
        .sc{
          // margin-top:-20px;
          float:right;
          margin-top:30px;
          margin-right:20px;
        }
          
        
        }

        .top {
          display: flex;
          justify-content: flex-end;
         
          span {
            margin: 0 10px;
             img{
              vertical-align: middle;
            width:14px;
            margin-right:4px;
          }
            
          }
        }
      }
    }
  }

</style>