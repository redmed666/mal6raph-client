<template>
<div class="uploadsample">
    <b-form-file v-model="files" v-on:change="handleFileUpload()" enctype="multipart/form-data" id="filesInput" ref="filesInput" :multiple=true>
    </b-form-file>
    <b-button v-on:click="submitFile()">Submit</b-button>
    <Progress :success_counter="success_counter" :warning_counter="warning_counter" :danger_counter="danger_counter"></Progress>
</div>
</template>

<script>
import axios from "axios";
import * as bootstrapVue from "bootstrap-vue";
import Progress from "@/components/Progress";

export default {
  name: "uploadsample",
  components: {
    bootstrapVue,
    Progress
  },
  props: ["endpoint_upload"],
  data() {
    return {
      files: null,
      endpoint_upload: null,
      sha256: "",
      success_counter: 0,
      warning_counter: 0,
      danger_counter: 0,
      file_number: 0
    };
  },
  methods: {
    handleFileUpload() {
      this.files = this.$refs.filesInput;
      this.success_counter = 0;
      this.warning_counter = 0;
      this.danger_counter = 0;
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
            if (response.data.msg === "Sample already exists") {
              this.warning_counter += 100 / this.files.length;
            } else {
              this.success_counter += 100 / this.files.length;
            }
            this.sha256 = response.data.sha256;
          })
          .catch(error => {
            console.log(error);
            this.danger_counter += 100 / this.files.length;
          });
      });
    }
  }
};
</script>