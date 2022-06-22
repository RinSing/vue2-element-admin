<template>
  <div>
    <el-card class="">
      <el-table
        :data="tableData"
        border
        fit
        style="width: 100%"
        :header-cell-style="{ background: '#f5f7fa', overflow: 'hidden' }"
      >
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="80" align="center"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center"> </el-table-column>

        <el-table-column prop="id" label="身份证" width="180" align="center"> </el-table-column>
        <el-table-column prop="email" label="email" width="230" align="center"> </el-table-column>
        <el-table-column prop="birthDate" label="出生日期" width="120" align="center"> </el-table-column>
        <el-table-column prop="city" label="地址" width="180" align="center"> </el-table-column>
        <el-table-column prop="ctitle" label="简介" width="330" align="center"> </el-table-column>

        <!-- <el-table-column fixed="right" label="操作" align="center" width="125">
          <template>
            <button></button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        class="pagination"
        :current-page="queryForm.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>
  </div>
</template>

<script>
import { getStaffList } from "@/api/get";
export default {
  data() {
    return {
      queryForm: { pageIndex: 1, pageSize: 10 },
      total: 0,

      tableData: [],
    };
  },
  created() {
    this.getStaffList();
  },
  methods: {
    async getStaffList() {
      let { data } = await getStaffList(this.queryForm);
      this.tableData = data.items;

      this.total = data.total;
      console.log("tableData", data);
    },
  },
};
</script>
<style scoped></style>
