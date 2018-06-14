<template>
    <div id="graph" v-if="nodes">
        <d3-network :net-nodes="nodes" :net-links="links" :options="options">
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
  data() {
    return {
      nodes: null,
      links: null,
      options: {
        force: 50,
        nodeSize: 20,
        nodeLabels: false,
        linkWidth: 5
      },
      endpoint: "http://localhost:8080/all"
    };
  },
  created() {
    this.getAllSamples();
  },
  methods: {
    getAllSamples() {
      axios
        .get(this.endpoint)
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
