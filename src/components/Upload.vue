<template>
<div class="uploadsample">
    <b-form-file v-model="file" v-on:change="handleFileUpload()" placeholder="Choose a file..." enctype="multipart/form-data" id="file" ref="file">
    </b-form-file>
    <b-button v-on:click="submitFile()">Submit</b-button>
    
    <div class="sha256">
      <div v-if="sha256">{{this.sha256}}</div>
    </div>

</div>
</template>

<script>
import axios from "axios";
import * as bootstrapVue from "bootstrap-vue";

export default {
  name: "uploadsample",
  components: {
    bootstrapVue
  },
  data() {
    return {
      file: "",
      endpoint: "http://localhost:8080/upload",
      sha256: ""
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file;
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(this.endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.sha256 = response.data.sha256;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>