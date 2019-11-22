<template>
  <el-table :data="tableDate" border stripe>
      <el-table-column prop="name" label="教师名称"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="path" label="部门"></el-table-column>
  </el-table>
  
</template>

<script>
export default {
data() {
    return {
        tableDate:[
            {name:'王老师',phone:'151xxxxxxxx',path:'教务处'},
            {name:'李老师',phone:'151xxxxxxxx',path:'人事办'},
            {name:'赵老师',phone:'151xxxxxxxx',path:'值班室'},
            {name:'王老师',phone:'151xxxxxxxx',path:'教务处'},
            {name:'王老师',phone:'151xxxxxxxx',path:'教务处'}
        ]
    }
},
}
</script>

<style>

</style>