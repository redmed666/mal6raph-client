<template>
<div class="uploadsample">
    <b-form-file v-model="files" v-on:change="handleFileUpload()" enctype="multipart/form-data" id="filesInput" ref="filesInput" :multiple=true>
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
  props: ["endpoint_upload"],
  data() {
    return {
      files: null,
      endpoint_upload: null,
      sha256: ""
    };
  },
  methods: {
    handleFileUpload() {
      this.files = this.$refs.filesInput;
    },
    submitFile() {
      console.log(this.files);
      this.files.forEach(file => {
        let formData = new FormData();
        formData.append("file", file);
        axios
          .post(this.endpoint_upload, formData, {
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
      });
    }
  }
};
</script>