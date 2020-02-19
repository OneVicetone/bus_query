<template>
  <div>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="编号">
        <el-input v-model="searchData.routes" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="停运状态">
        <el-select v-model="searchData.status" placeholder="停运状态">
          <el-option label="停运" value="0"></el-option>
          <el-option label="未停运" value="1"></el-option>
          <el-option label="高峰期运营" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="addNewRoute">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="routes" label="公交编号"></el-table-column>
      <el-table-column prop="busSite" label="公交路线"></el-table-column>
      <el-table-column prop="status" label="停运状态">
        <template slot-scope="scope">
          {{ scope.row.status | busStatus }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="editRoute(scope.row)">编辑</el-button>
          <el-popconfirm
                title="确定要删除该路线吗？"
                confirmButtonText="删除"
                confirmButtonType="danger"
                iconColor="#f78989"
                @onConfirm="deleteRoute(scope.row._id)"
              >
                <el-button type="text" slot="reference" icon="el-icon-delete">删除</el-button>
              </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="showDialog" :modal="true" :lock-scroll="true">
      <el-form :model="editAndAddData">
        <el-form-item label="公交编号">
          <el-input v-model="editAndAddData.routes" placeholder='公交编号' style='width:80%;'></el-input>
        </el-form-item>
        <el-form-item label="公交路线">
          <el-input v-model="editAndAddData.busSite" placeholder='公交路线' style='width:80%;'></el-input>
        </el-form-item>
        <el-form-item label='停运状态'>
          <el-select v-model="editAndAddData.status" placeholder="停运状态">
            <el-option label="停运" value="0"></el-option>
            <el-option label="未停运" value="1"></el-option>
            <el-option label="高峰期运营" value="3"></el-option>

          </el-select>
        </el-form-item>
      </el-form>
      <div class='dialog-operate'>
        <el-button type='primary' @click='uploadData'>提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBusQueryList, deleteRouteById, addNewRoute, changeRoute } from "@/api";
export default {
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getBusQueryList().then(res => {
        this.tableData = res.data;
      });
    },
    deleteRoute(id) {
      deleteRouteById(id).then(res => {
        if (res.code === 200) {
          this.getData();
        }
      });
    },
    editRoute(data){
      this.editAndAddData = {...data}
      this.showDialog = true
    },
    addNewRoute() {
      this.initDialogData();
      this.showDialog = true;
    },
    search() {},
    initDialogData() {
      for (let item in this.editAndAddData) {
        this.editAndAddData[item] = "";
      }
    },
    uploadData(){
      if(this.editAndAddData._id){
        changeRoute(this.editAndAddData,this.editAndAddData._id).then(res=>{
          if(res.code === 200){
            this.showDialog = false
            this.getData()
          }
        })
      }else{
        addNewRoute(this.editAndAddData).then(res=>{
          if(res.code === 200){
            this.showDialog = false
            this.getData()
          }
        })
      }
    }
  },
  data() {
    return {
      tableData: [],
      searchData: {
        routes: "",
        status: ""
      },
      showDialog: false,
      editAndAddData: {
        routes: "",
        busSite: "",
        status: ""
      }
    };
  },
  filters:{
    busStatus(value){
      if(value === '0') return '已停运'
      if(value === '1') return '未停运'
      if(value === '3') return '高峰期运营'
    }
  }
};
</script>

<style scoped>
.dialog-operate {
  display: flex;
  justify-content: center;
}
</style>