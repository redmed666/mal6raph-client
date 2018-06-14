<template>
  <div class="sample" v-if="sample">
    <h1 class="sample_sha256">{{sample.sha256}}</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["sha256"],
  data() {
    return {
      sample: null,
      endpoint: "http://localhost:8080/sample/"
    };
  },
  methods: {
    getSample(sha256) {
      axios(this.endpoint + sha256)
        .then(response => {
          this.sample = response.data;
          console.log(this.sample);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getSample(this.sample);
  },
  watch: {
    $route() {
      this.getSample(this.sha256);
    }
  }
};
</script>