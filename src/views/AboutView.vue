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
        <el-main style="background: antiquewhite;height: 550px;"><div style="text-align: left">
          <el-button type="primary" @click="addbotton">新增</el-button>

            <el-input v-model="search" size="default" style="width: 200px;margin: 10px" placeholder="搜索联系人"/>
            <el-button size="default" @click="findPeople">筛选</el-button>

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
                <el-button  size="small" @click="deleteclick(scope.$index,scope.row)">删除</el-button>
                <el-button  size="small" type="danger" @click="updateclick(scope.$index,scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
        v-model="centerDialogVisible"
        title="修改"
        width="30%"
        destroy-on-close
        center
    >
      <el-form model="upData" label-width="50px">
        <el-form-item label="pid">
<!--          <el-input clearable v-model="upData.fid"/>-->
          <div>{{update.pid}}</div>
        </el-form-item>
        <el-form-item label="fid">
          <div>{{update.fid}}</div>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input clearable v-model="update.fname"/>
        </el-form-item>
        <el-form-item label="关系">
          <el-input clearable v-model="update.relation"/>
        </el-form-item>
        <el-form-item label="住址">
          <el-input clearable v-model="update.place"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input clearable v-model="update.tel"/>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input clearable v-model="update.qq"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makesurechange">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>



    <el-dialog
    v-model="addDialogVisible"
    title="增加联系人"
    width="30%"
    destroy-on-close
    center
    >
    <el-form model="add" label-width="50px">
      <el-form-item label="pid">
<!--                  <el-input clearable v-model="add.fid"/>-->
        <div>{{add.pid}}</div>
      </el-form-item>
      <el-form-item label="fid">
        <el-input clearable v-model="add.fid"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input clearable v-model="add.fname"/>
      </el-form-item>
      <el-form-item label="关系">
        <el-input clearable v-model="add.relation"/>
      </el-form-item>
      <el-form-item label="住址">
        <el-input clearable v-model="add.place"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input clearable v-model="add.tel"/>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input clearable v-model="add.qq"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makesureadd">
          确定
        </el-button>
      </span>
    </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
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


    const addDialogVisible = ref(false)
    const centerDialogVisible = ref(false)
    const  mypageinfo =reactive({
        deleteid:1,
      deletename:"",
      username:"",
      newfid:1,
      userpid:1,
    })
   interface mypageinfo{
      deleteid: number
     deletename:string
     username:string
     newfid:number
     userpid:number
   }
      const findPeople=()=>{
              axios.get("http://localhost:9090/communication-entity/findcommunicaterByName/"+search.value+','+mypageinfo.userpid).then(res=>{
                tableData.addressBookInfo =res.data
              })
      }
       const addbotton=()=>{
         addDialogVisible.value=true
         add.fid=mypageinfo.newfid
         add.pid=update.pid
         add.fname=" "
         add.relation=" "
         add.place=" "
         add.tel= " "
         add.qq=" "
       }

    const updateclick = (index:number,row:addressBookInfo)=>{
      centerDialogVisible.value = true
      update.fid=row.fid
      update.pid=row.pid
      update.tel=row.tel
      update.qq=row.qq
      update.place= row.place
      update.fname=row.fname
      update.relation=row.relation
    }
    const makesurechange=()=>{
     axios.post("http://localhost:9090/communication-entity/updateById",update).then(res=>{
       if (res.data === 1){
         ElMessage({
           showClose:true,
           message:"修改成功",
           type:'success'
         })
         centerDialogVisible.value = false
         axios.get(" http://localhost:9090/communication-entity/getAllCommunicationById/"+update.pid).then(res=>{
           tableData.addressBookInfo = res.data
           mypageinfo.newfid=res.data.length+1
           // console.log(res.data)
         })
       }
       else {
         ElMessage({
           showClose:true,
           message:'删除失败',
           type:'error'
         })
         centerDialogVisible.value = false
       }
     })


    }
    const makesureadd=()=>{

       console.log(add)
      axios.post("http://localhost:9090/communication-entity/insertcommunication",add).then(res=>{

        if (res.data === 1){
          ElMessage({
            showClose:true,
            message:"添加成功",
            type:'success'
          })
          addDialogVisible.value = false
          axios.get(" http://localhost:9090/communication-entity/getAllCommunicationById/"+add.pid).then(res=>{
            tableData.addressBookInfo = res.data
            mypageinfo.newfid =res.data.length+1
          })

        }
        else {
          ElMessage({
            showClose:true,
            message:'添加失败',
            type:'error'
          })
          centerDialogVisible.value = false
        }
      })


    }


    const deleteclick = (index:number , row:addressBookInfo)=> {
          mypageinfo.deletename = row.fname
          mypageinfo.deleteid = row.fid
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
           axios.get("http://localhost:9090/communication-entity/deleteById/"+mypageinfo.deleteid).then(res=>{
            if (res.data === 1)
            {
              ElMessage({
                type: 'success',
                message: '删除成功',
              })
              axios.get(" http://localhost:9090/communication-entity/getAllCommunicationById/"+row.pid).then(res=>{
                tableData.addressBookInfo = res.data
                mypageinfo.newfid=res.data.length+1
              })
            }
           })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '删除取消',
            })
          })

    }
    interface addressBookInfo {
      fid: number
      pid: number
      fname: string
      relation: string
      place: string
      tel: string
      qq: string
    }
    const tableData = reactive({
      addressBookInfo: [{
        fid:1,
        pid:1,
        fname: " ",
        relation: " ",
        place:" ",
        tel: " ",
        qq:" ",
      }
      ]
    })

    const update:addressBookInfo = reactive({

        fid:1,
        pid:1,
        fname: " ",
        relation: " ",
        place:" ",
        tel: " ",
        qq:" ",

    })
    const search = ref('')
    const add:addressBookInfo = reactive({

      fid:4,
      pid:1,
      fname: " ",
      relation: " ",
      place:" ",
      tel: " ",
      qq:" ",

    })

    return{
      tableData,
      mypageinfo,
      deleteclick,
      update,
      add,
      centerDialogVisible,
      addDialogVisible,
      updateclick,
      makesurechange,
      makesureadd,
       addbotton,
      search,
      findPeople,
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
      this.mypageinfo.userpid=res.data
      axios.get(" http://localhost:9090/communication-entity/getAllCommunicationById/"+res.data).then(res=>{
        this.tableData.addressBookInfo = res.data
        this.mypageinfo.newfid=res.data.length+1
        console.log(res.data)
      })

    })
  },



})

</script>
