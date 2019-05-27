<template>
    <div id="stage"></div>
</template>
<script>
import './ckEditor/ckeditor.js';
import './ckEditor/translations/zh-cn.js'
export default {
  name: "d3",
  
  data(){
    return {
      
    }
  },
  mounted(){
    ClassicEditor.create(document.getElementById("stage"), {
        language: 'EN',
      })
  }
}
</script>

