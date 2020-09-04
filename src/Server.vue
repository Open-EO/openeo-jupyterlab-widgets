<template>
  <div class="container">
    <Capabilities v-if="capabilities" :capabilities="capabilities" :url="url" />
  </div>
</template>

<script>
const { OpenEO } = require('@openeo/js-client');
const Capabilities = require('../node_modules/@openeo/vue-components/components/Capabilities.vue').default;

module.exports = {
  components: {
    Capabilities
  },
  data() {
    return {
      url: 'https://earthengine.openeo.org',
      connection: null,
      capabilities: null
    }
  },
  async created() {
    this.connection = await OpenEO.connect(this.url);
    this.capabilities = this.connection.capabilities().toJSON();
  }
}
</script>

<style scoped>
.container {
  margin: 1%;
}
</style>
