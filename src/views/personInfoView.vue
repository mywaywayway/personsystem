<template>
  <div class="common-layout">
    <el-container>
      <el-header><el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ep-bg-purple"
        /><div style="text-align: left">个人信息管理系统</div></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /><div style="text-align: right">{{pageInfo.userName}}</div></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" />
          <el-button type="primary"  @click="onesc()">退出</el-button>
        </el-col>
      </el-row></el-header>
      <el-container>
        <el-aside style="width: 150px"   >
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              style="width: auto"

          >
            <el-sub-menu index="1" >
              <template #title>

                <span>菜单</span>
              </template>
              <!--              <el-menu-item-group title="Group One">-->
              <el-menu-item index="1-1" @click="oncommunication">联系人</el-menu-item>
              <el-menu-item index="1-2" @click="onuserinfo">用户信息</el-menu-item>
              <!--              </el-menu-item-group>-->
              <!--              <el-menu-item-group title="Group Two">-->
              <el-menu-item index="1-3" @click="onincome">收入</el-menu-item>
              <el-menu-item index="1-4" @click="onoutput">支出</el-menu-item>
              <!--              </el-menu-item-group>-->
              <el-menu-item index="1-5" @click="onmemorandum">
                <template #title >备忘录</template>
                <!--                <el-menu-item index="1-4-1">item one</el-menu-item>-->
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main style="background: antiquewhite;height: 550px;" model="persondata">
          <el-descriptions title="用户信息" :column="3" border style="height: auto" >
            <el-descriptions-item
                label="pid"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
                width="150px"
                v-model="persondata.pid"
            >{{persondata.pid}}</el-descriptions-item
            >
            <el-descriptions-item label="pname" label-align="right" align="center"
             v-model="persondata.pname">{{ persondata.pname }}</el-descriptions-item
            >
            <el-descriptions-item label="pbir" label-align="right" align="center" v-model="persondata.pbir"
            >{{ persondata.pbir }}
            </el-descriptions-item>
            <el-descriptions-item label="password" label-align="right" align="center" v-model="persondata.password">
              {{ persondata.password }}
            </el-descriptions-item>
            <el-descriptions-item label="ptel" label-align="right" align="center" v-model="persondata.ptel"
            >{{persondata.ptel}}
            </el-descriptions-item>
            <el-descriptions-item label="uage" label-align="right" align="center" v-model="persondata.uage"
            >{{persondata.uage}}
            </el-descriptions-item>
            <el-descriptions-item label="psex" label-align="right" align="center" v-model="persondata.psex"
            >{{persondata.psex}}
            </el-descriptions-item>
            <el-descriptions-item label="ujob" label-align="right" align="center" v-model="persondata.ujob"
            >{{persondata.ujob}}
            </el-descriptions-item>
            <el-descriptions-item label="uplace" label-align="right" align="center" v-model="persondata.uplace"
            >{{persondata.uplace}}
            </el-descriptions-item>
          </el-descriptions>
<!--          <el-button @click="onchange" >修改</el-button>-->
        </el-main>
      </el-container>
    </el-container>

<!--    <el-dialog-->
<!--        v-model="personDialogVisible"-->
<!--        title="修改"-->
<!--        width="40%"-->
<!--        destroy-on-close-->
<!--        center-->
<!--    >-->
<!--      <el-form model="updatedata" label-width="75px">-->
<!--        <el-form-item label="pid">-->
<!--          &lt;!&ndash;          <el-input clearable v-model="upData.fid"/>&ndash;&gt;-->
<!--          <div>{{updatedata.pid}}</div>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="psex">-->
<!--          <el-input clearable v-model="updatedata.psex"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="uage">-->
<!--          <el-input clearable v-model="updatedata.uage"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="姓名">-->
<!--          <el-input clearable v-model="updatedata.pname"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="ptel">-->
<!--          <el-input clearable v-model="updatedata.ptel"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="uplace">-->
<!--          <el-input clearable v-model="updatedata.uplace"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="ujob">-->
<!--          <el-input clearable v-model="updatedata.ujob"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="password">-->
<!--          <el-input  clearable v-model="updatedata.password"/>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="personDialogVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click="makesurechange">-->
<!--          确定-->
<!--        </el-button>-->
<!--      </span>-->
<!--      </template>-->
<!--    </el-dialog>-->
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import router from "@/router";
import axios from "axios";
import {useRouter} from "vue-router";


export default defineComponent({
  name:"personInfoView",

  data(){
    return{
      pageInfo:{
        userName:'',
      },
    }
  },
  setup(){
    const personDialogVisible = ref(false)

    const onchange=()=>{
      personDialogVisible.value=true
      updatedata.ptel=persondata.ptel

    }
   interface persondata{
       pid:number
       pname:string
       psex:string
       pbir:string
       ptel:string
       uage:number
       uqq:string
       ujob:string
       uplace:string
      password:string
    }
    const persondata=reactive({
          pid: 1,
          pname:" ",
          psex:" ",
          pbir:" ",
          ptel:" ",
          uage:1,
          ujob:" ",
          uplace:" ",
          password:" ",
    })
    const updatedata=reactive({
      pid: 1,
      pname:" ",
      psex:" ",
      pbir:" ",
      ptel:" ",
      uage:1,
      ujob:" ",
      uplace:" ",
      password:" ",
    })
    return{
     persondata,
      personDialogVisible,
      updatedata,
      onchange,
    }
  },
  methods:{
    oncommunication (){
      router.push({path:'/about/'+this.pageInfo.userName})

    },
    onuserinfo(){
      router.push({path:'/personinfo/'+this.pageInfo.userName})
    },
    onincome(){
      router.push({path:'/income/'+this.pageInfo.userName})
    },
    onoutput(){
      router.push({path:'/output/'+this.pageInfo.userName})
    },
    onmemorandum(){
      router.push({path:'/memorandum/'+this.pageInfo.userName})
    },

    onesc(){
      router.push({path:'/'})

    },

  },
  created() {
    const myroute =useRouter()
    this.pageInfo.userName = <string>myroute.currentRoute.value.params.username
    axios.get("http://localhost:9090/user-entity/findpidByname/"+this.pageInfo.userName).then(res=>{

      axios.get("http://localhost:9090/user-entity/getuserById/"+res.data).then(res=>{

        this.persondata = res.data
        console.log(this.persondata)
      })

    })
  }
})
</script>