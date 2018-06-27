<template>
  <div>
    <b-progress class="mt-1" :max="max">
      <b-progress-bar :value="success_counter" variant="success"></b-progress-bar>
      <b-progress-bar :value="warning_counter" variant="warning"></b-progress-bar>
      <b-progress-bar :value="danger_counter" variant="danger"></b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
export default {
  props: ["success_counter", "warning_counter", "danger_counter"],
  data() {
    return {
      success_counter: 0,
      warning_counter: 0,
      danger_counter: 0,
      max: 100
    };
  }
};
</script>