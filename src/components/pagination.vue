<template>
   <div>
     <el-pagination
      @current-change='handleCurrentChange'
      @size-change='handleSizeChange'
      :current-page='currentPage'
      :page-sizes='pageSizes'
      :page-size='pageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='value.length'>
    </el-pagination>
   </div>
</template>
<script>
export default {
  name: 'yi-pagination',
  props: {
    value: {
      type: Array
    },
    pageSizeProp: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: this.pageSizeProp
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (curPage) {
      this.currentPage = curPage
    }
  },
  computed: {
    computedList () {
      return this.value.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
    },
    pageSizes () {
      return Array.from({length: Math.floor(this.value.length / this.pageSize)}, (x, y) => this.pageSize * (y + 1))
    }
  },
  watch: {
    computedList: function (val, old) {
      this.$emit('handlerPageChange', val)
    }
  }

}
</script>
