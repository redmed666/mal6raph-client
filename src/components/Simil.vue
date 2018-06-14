<template>
    <div>
        <b-dropdown id="ddown1" text="Samples" class="m-md-2" data>
            <b-dropdown-item-button v-for="sample in this.samples" v-on:click="calculateSimil(sample)">{{sample}}</b-dropdown-item-button>
        </b-dropdown>
        <div>
          <div v-if="previousNode">{{this.previousNode}}</div>
        </div>
        <div v-if="nodes==0">
          <div>Nodes is empty</div>
        </div>
        <div id="graph" v-if="nodes">
            <d3-network :net-nodes="nodes" :net-links="links" :options="options" v-on:node-click="showLabel">
            </d3-network>
        </div>
    </div>
</template>

<script>
import * as bootstrapVue from "bootstrap-vue";
import axios from "axios";
import D3Network from "vue-d3-network";

export default {
  name: "simil",
  components: {
    bootstrapVue,
    D3Network
  },
  data() {
    return {
      nodes: null,
      links: null,
      samples: null,
      options: {
        force: 1000,
        nodeSize: 20,
        nodeLabels: false,
        linkWidth: 5
      },
      endpoint: "http://localhost:8080/",
      previousNode: null
    };
  },
  created() {
    this.getSamples();
  },
  methods: {
    getSamples() {
      axios.get(this.endpoint + "samples").then(res => {
        this.samples = res.data.samples;
      });
    },
    calculateSimil(sample) {
      axios
        .get(this.endpoint + "sample/" + sample)
        .then(res => {
          this.nodes = res.data.nodes;
          this.links = res.data.links;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showLabel(event, node) {
      this.previousNode = node.name;
    }
  }
};
</script>