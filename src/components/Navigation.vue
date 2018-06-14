<template>
    <div>
        <nav>
            <router-link v-for="routes in links" 
            v-bind:key="routes.id"
            :to="`${routes.page}`"
            class="spacing"><b-button>{{routes.text}}</b-button></router-link>
        </nav>
    </div>
</template>

<script>
import * as bootstrapVue from "bootstrap-vue";

export default {
  name: "Navigation",
  components: {
    bootstrapVue
  },
  data() {
    return {
      links: [
        {
          id: 0,
          text: "Home",
          page: "/"
        },
        {
          id: 1,
          text: "Upload Sample",
          page: "/upload"
        },
        {
          id: 2,
          text: "Find Similarity",
          page: "/simil"
        },
        {
          id: 3,
          text: "Update Sample",
          page: "/update"
        },
        {
          id: 4,
          text: "Search",
          page: "/search"
        }
      ]
    };
  }
};
</script>

<style>
.spacing {
  margin-right: 10px;
}
</style>