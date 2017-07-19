<template>
  <div id="pao-upload-img">
    <el-upload
      :action="loadHost"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'pao-upload-img',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
      };
    },
    computed: {
      loadHost() {
        return '/api/orderinfo/addimage.do'
      }
    },
    methods: {
      test() {
        uploadFile('222').then().then(function (response) {
          console.log( response.data);

        }).catch(function(err){
          console.log(err);
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }




</script>
<style>
#pao-upload-img{
  font-style:normal;
}
/*#pao-upload-img .pao-nav {
  margin:20px;
  height : 36px;
}
#pao-upload-img .pao-nav button {
  float : right;
  margin-left:10px;
}*/
</style>

