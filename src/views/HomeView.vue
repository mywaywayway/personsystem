<template>
  <div style="background-color: burlywood;overflow: hidden" class="class-name">
    <div style="width: 450px;margin:200px auto">
      <div style="color: #42b983;font-size: 30px;text-align: center">欢迎登录</div>
      <el-form :model="loginForm" label-width="120px">
        <el-form-item label="name" prop="name" >
          <el-col :span="16">
            <el-input v-model="loginForm.name"/>
          </el-col>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-col :span="16">
            <el-input v-model="loginForm.password" show-password/>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" style="width: 70%">登录</el-button>

        </el-form-item>
      </el-form>



<!--            <el-button @click="onPost">Post</el-button>-->
    </div>
  </div>


</template>
<script lang="ts">

import {defineComponent, ref} from "vue";
import axios from "axios";
import router from "@/router";
import {ElMessage} from "element-plus";
// import Cookies from "js-cookie"


export default defineComponent({
  name: "HomeView",
   data(){
     return {
       loginForm: {
         name:"",
         password:""
       },



     }
   },
  methods: {
    //  onPost(){
    //
    //   axios.post("http://localhost:9090/user-entity/getUserById",{
    //
    //     pid:'1',
    //
    //   }).then(res =>{
    //     console.log(res.data)
    //   })
    // },

     onSubmit(){
      // request.post("localhost:9090/user-entity/login")


      axios.get("http://localhost:9090/user-entity/test2/"+this.loginForm.name+","+this.loginForm.password).then(res => {
        console.log(res.data)
        if (res.data=== 1){

         // Cookies.set('name',this.loginForm.name)
          ElMessage({
            message: "Login successful",
            type: 'success'
          })
          let username =this.loginForm.name
          router.push({path:'/about/'+username})
        }
        else {
          ElMessage.error("用户名或密码错误"
          )
        }
      })
    }

  }

})
</script>
<style>
.class-name{
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
