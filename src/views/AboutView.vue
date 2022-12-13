<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content ep-bg-purple"
          /><div style="text-align: left">个人信息管理系统</div></el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" /><div style="text-align: right">{{pageInfo.userName}}</div></el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            <el-button type="primary"  @click="onesc()">退出</el-button>

          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside >
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>

                <span>菜单</span>
              </template>
<!--              <el-menu-item-group title="Group One">-->
                <el-menu-item index="1-1" >item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
<!--              </el-menu-item-group>-->
<!--              <el-menu-item-group title="Group Two">-->
                <el-menu-item index="1-3">item three</el-menu-item>
<!--              </el-menu-item-group>-->
              <el-menu-item index="1-4">
                <template #title>item four</template>
<!--                <el-menu-item index="1-4-1">item one</el-menu-item>-->
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main style="background: antiquewhite;height: 550px;"><div style="text-align: left">
          <el-button type="primary">新增</el-button>
          <el-button type="primary">查询</el-button>
        </div>

          <el-table :data="tableData.addressBookInfo" style="width: 100%">
            <el-table-column prop="fid" label="通讯录ID" width=auto />
            <el-table-column prop="pid" label="用户ID" width=auto />
            <el-table-column prop="fname" label="名字" width=auto />
            <el-table-column prop="relation" label="关系" width=auto />
            <el-table-column prop="place" label="住址" width=auto />
            <el-table-column prop="tel" label="电话" width=auto />
            <el-table-column prop="qq" label="QQ" width=auto />
            <el-table-column fixed="right" label="操作" width=auto>
              <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteclick(scope.$index,scope.row)">删除</el-button>
                <el-button link type="primary" size="small" @click="updateclic(scope.$index,scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive} from "vue";
import {useRouter} from "vue-router";
import router from "@/router";
import axios from "axios";
import {ElButton, ElMessage, ElMessageBox} from "element-plus";

export default defineComponent({
  name:'AboutView',
  components: {ElButton},
  inject: ['reload'],

  data(){

    return{

      pageInfo:{
          userName:'',

      },

    }
  },
  setup(){
    const  mypageinfo =reactive({
        deleteid:1,
      deletename:"",
      username:"",
    })
   interface mypageinfo{
      deleteid: bigint
     deletename:string
     username:string
   }

    const deleteclick = (index:bigint,row: addressBookInfo)=> {
          mypageinfo.deletename = row.fName,

      ElMessageBox.confirm(
          '确定要删除该联系人？',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
      )
          .then(() => {

            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            // this.reload
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '删除取消',
            })
          })
    }
    const tableData = reactive({
      addressBookInfo: [{
        fId:" ",
        pId:" ",
        fName: " ",
        relation: " ",
        place:" ",
        tel: " ",
        qq:" ",
      }
      ]
    })
    interface addressBookInfo {
      fId: bigint
      pId: bigint
      fName: string
      relation: string
      place: string
      tel: string
      qq: string
    }

    return{
      tableData,
    }
  },
  methods:{

    onesc(){
      router.push({path:'/'})

    },
    //  handleOpen = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath)
    // },
    //  handleClose = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath)
    // }
  },
  created() {
    const myroute =useRouter()
    this.pageInfo.userName = <string>myroute.currentRoute.value.params.username
    axios.get("http://localhost:9090/user-entity/findpidByname/"+this.pageInfo.userName).then(res=>{
      axios.get(" http://localhost:9090/communication-entity/getAllCommunicationById"+res.data).then(res=>{
        this.tableData.addressBookInfo = res.data
        // console.log(res.data)
      })

    })
  },

  mounted(){

  },

})

</script>
