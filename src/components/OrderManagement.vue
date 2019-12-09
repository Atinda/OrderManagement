<template>
  <div class="OrderManagement">
    <el-container class="order-layout">
      <el-header class="order-header">
        <el-row style="top:17%">
          <el-col :span="18" class="header-left">
            <el-date-picker
              class="dataTime"
              v-model="startTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              :picker-options="pickerOptions"
            ></el-date-picker>至
            <el-date-picker
              class="dataTime"
              v-model="endTime"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
              :picker-options="pickerOptions2"
            ></el-date-picker>
            <el-select v-model="stateValue" placeholder="请选择状态" style="margin-left:8px;width:120px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-search"
              style="margin-left:8px;"
              @click="searchBtn()"
            >查询</el-button>
            <el-button type="primary" icon="el-icon-finished" @click="dialogVisible = true">执行</el-button>
          </el-col>
          <el-col :span="6" class="header-right">
            <el-button-group>
              <el-button type="primary" icon="el-icon-paperclip" @click="exportBtn()">导出</el-button>
              <el-button type="primary" icon="el-icon-printer" @click="printingBtn()">打印</el-button>
              <el-button type="primary" icon="el-icon-printer" @click="printingBtn()">1234567测试</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="order-main">
        <el-aside class="main-left" style="border-right:1px solid gray">
          <el-table :data="tableData" style="height:100%;width: 100%" height="100%" stripe @row-click="selectRow">
            <el-table-column fixed prop="date" label="日期" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="province" label="省份" width="120"></el-table-column>
            <el-table-column prop="city" label="市区" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" width="300"></el-table-column>
            <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
          </el-table>
        </el-aside>
        <el-container class="main-right">
          <el-table :data="tableData" style="height:100%;width: 100%" height="100%" stripe>
            <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="province" label="省份" width="120"></el-table-column>
            <el-table-column prop="city" label="市区" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" width="300"></el-table-column>
            <el-table-column prop="zip" label="邮编" ></el-table-column>
          </el-table>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog
      title="状态选择项"
      :visible.sync="dialogVisible"
      width="350px"
      :before-close="handleClose"
    >
      <div style="display:flex;flex-direction: column;text-align: initial;">
        <el-radio style="margin:6px;" v-model="stateValuex" label="已接收订单">已接收订单</el-radio>
        <el-radio style="margin:6px;" v-model="stateValuex" label="备货中">备货中</el-radio>
        <el-radio style="margin:6px;" v-model="stateValuex" label="开始配送">开始配送</el-radio>
        <el-radio style="margin:6px;" v-model="stateValuex" label="已收货">已收货</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn(stateValue)">取 消</el-button>
        <el-button type="primary" @click="confirmBtn(stateValue)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 选择日期的配置
const shortcuts = [
  {
    text: "今天",
    onClick(picker) {
      picker.$emit("pick", new Date());
    }
  },
  {
    text: "昨天",
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit("pick", date);
    }
  },
  {
    text: "一周前",
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit("pick", date);
    }
  }
];
// 下拉状态值
const options = [{
          value: '已接收订单',
          label: '已接收订单'
        }, {
          value: '备货中',
          label: '备货中'
        }, {
          value: '开始配送',
          label: '开始配送'
        }, {
          value: '已收货',
          label: '已收货'
        }];
export default {
  name: "OrderManagement",
  data() {
    return {
      // 开始时间配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: shortcuts
      },
      // 结束时间配置
      pickerOptions2: {
        shortcuts: shortcuts
      },
      options:options,
      // 表格数据格式
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎2",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎3",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎4",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎5",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎6",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎7",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      startTime: null,        // 开始时间值
      endTime: null,          // 结束时间值

      dialogVisible: false,   // 是否打开状态弹窗
      stateValue: null,       // 已经选中的状态值
      stateValuex: ""         // 正在勾选状态值
    };
  },
  methods: {
    // 选择状态
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 取消选择
    cancelBtn(stateValue) {
      this.dialogVisible = false;
      console.log(stateValuex);
    },
    // 确认选择状态
    confirmBtn(stateValue) {
      this.stateValue = this.stateValuex;
      this.dialogVisible = false;
      console.log(stateValue);
      console.log("开始时间", this.startTime);
      console.log("结束时间", this.endTime);
      console.log("状态值", this.stateValue);
      this.$notify({
        message: "已经选择状态",
        type: "success",
        position: "bottom-right"
      });
    },
    // 查询
    searchBtn() {
      console.log("开始时间", this.startTime);
      console.log("结束时间", this.endTime);
      console.log("状态值", this.stateValue);
      this.$notify({
        message: "已经查询",
        type: "success",
        position: "bottom-right"
      });
      // 传参请求数据
    },
    // 导出
    exportBtn() {
      console.log("导出");
      this.$notify({
        message: "已经导出",
        type: "success",
        position: "bottom-right"
      });
    },
    // 打印
    printingBtn() {
      console.log("打印");
      this.$notify({
        message: "已经打印",
        type: "success",
        position: "bottom-right"
      });
    },
    // 选中主订单行
    selectRow(row, column, event){
      console.log(row);
      this.$notify({
        message: "已经选择"+row.name,
        type: "success",
        position: "bottom-right"
      });
    }
  }
};
</script>
<style scoped>
.OrderManagement,
.order-layout {
  height: 100%;
}
/* ---------------头部样式--------------- */
.header-left {
  display: flex;
  align-content: flex-start;
  align-items: center;
}
.dataTime {
  min-width: 100px;
}
.header-right {
  display: flex;
  justify-content: flex-end;
}
/*  ---------------表格内容样式--------------- */
.order-main {
  display: flex;
  padding: 0;
  height: 100%;
  border-top: 1px solid gray;
}
.main-left{border: gray}
.main-right{border-left: gray}
</style>
