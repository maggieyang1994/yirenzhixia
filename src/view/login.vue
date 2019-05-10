<template>
   <div>
     <div class="wrapper">
       <el-input v-model="input" placeholder="请输入昵称" style="width:75%"></el-input>
      <el-button type="primary" @click ="login">登陆</el-button>
     </div>
     
   </div>
</template>
<script>
export default {
   name: "login",
   data(){
     return {
       input: ""
     }
   },
   methods: {
     login(){
       this.$store.commit("setUser", {name: this.input, id: this.input})
       this.$router.push({name:'chat'})
     }
   }
}
</script>
<style scoped>
  .wrapper{
    width:50%;
    height:200px;
    position:absolute;
    transform: translate(50%, 50%);
  
  }
</style>


