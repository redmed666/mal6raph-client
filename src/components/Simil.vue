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
        <div class="controls">
        <label>Force: {{force}}</label>
          <input type="range" min="1" max="5000" v-model="force"> 
          <label>Forces X: {{fX}}</label>
          <input type="range" min="0" max="1" step=".01" v-model="fX"> 
          <label>Forces Y: {{fY}}</label>
          <input type="range" min="0" max="1" step=".01" v-model="fY"> 
        </div>
        <d3-network :net-nodes="nodes" :net-links="links" :options="options" id="graph"  v-if="nodes" v-on:node-click="showLabel">
        </d3-network>
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
  props: ["endpoint"],
  data() {
    return {
      nodes: null,
      links: null,
      force: 50,
      fX: 0.5,
      fY: 0.5,
      fMb: true,
      fC: false,
      samples: null,
      endpoint: null,
      previousNode: null
    };
  },
  created() {
    this.getSamples();
  },
  computed: {
    options() {
      return {
        force: this.force,
        forces: {
          X: this.fX,
          Y: this.fY,
          ManyBody: this.fMb,
          Center: this.fC
        },
        nodeSize: 20,
        nodeLabels: false,
        size: {
          w: Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
          ),
          h: Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          )
        }
      };
    }
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