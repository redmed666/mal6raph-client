<template>
    <div>
        <div class="controls">
        <label>Force: {{force}}</label>
          <input type="range" min="1" max="5000" v-model="force"> 
          <label>Forces X: {{fX}}</label>
          <input type="range" min="0" max="1" step=".01" v-model="fX"> 
          <label>Forces Y: {{fY}}</label>
          <input type="range" min="0" max="1" step=".01" v-model="fY"> 
        </div>
        <d3-network :net-nodes="nodes" :net-links="links" :options="options" id="graph"  v-if="nodes">
        </d3-network>
    </div>
</template>

<script>
import * as axios from "axios";
import D3Network from "vue-d3-network";

export default {
  name: "home",
  components: {
    D3Network
  },
  props: ["endpoint_all"],
  data() {
    return {
      nodes: null,
      links: null,
      force: 50,
      fX: 0.5,
      fY: 0.5,
      fMb: true,
      fC: false,
      endpoint_all: null
    };
  },
  created() {
    this.getAllSamples();
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
    getAllSamples() {
      axios
        .get(this.endpoint_all)
        .then(response => {
          this.nodes = response.data.nodes;
          this.links = response.data.links;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.net {
  height: 100%;
  margin: 0;
}
.node {
  stroke: rgba(18, 120, 98, 0.7);
  stroke-width: 3px;
  transition: fill 0.5s ease;
  fill: #dcfaf3;
}
.node.selected {
  stroke: #caa455;
}
.node.pinned {
  stroke: rgba(190, 56, 93, 0.6);
}
.link {
  stroke: rgba(18, 120, 98, 0.3);
}
.link,
.node {
  stroke-linecap: round;
}
.link:hover,
.node:hover {
  stroke: #be38b7;
  stroke-width: 5px;
}
.link.selected {
  stroke: rgba(202, 164, 85, 0.6);
}
.curve {
  fill: none;
}
.link-label,
.node-label {
  fill: #127862;
}
.link-label {
  -webkit-transform: translateY(-0.5em);
  -ms-transform: translateY(-0.5em);
  transform: translateY(-0.5em);
  text-anchor: middle;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
