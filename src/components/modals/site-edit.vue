<template>
<el-dialog
  title="Editer le site de mesure"
  :visible.sync="displaySiteEdit"
  :before-close="handleClose"
  width="500px"
  >

<div class="site-form-container">
  <!-- <el-alert
    title="Attention !"
    type="warning"
    :center="false"
    :closable="false"
    description="Changer le nom du site de mesure nécessite une reconfiguration des boitiers de liaison."
    show-icon>
  </el-alert> -->
 <el-form class="site-form"   ref="form" label-width="100px">
    <el-form-item class="site-form-item" label="Nom :">
      <el-input 
      class="site-input"
      v-model="selectedSite.name"></el-input>
    </el-form-item>
    <el-form-item class="site-form-item" label="Id :">
      <el-input 
      class="site-input"
      v-bind:disabled="true"
      v-model="selectedSite.id"></el-input>
    </el-form-item>
  </el-form>
  <div>
    <el-button type="primary" v-on:click="handleClose()">ANNULER</el-button>
    <el-button type="primary" v-on:click="updateSite()">ENREGISTRER</el-button>
  </div>
</div>
</el-dialog>
</template>

<script>
const SiteEdit = {
  name: "SiteEdit",
  props: {
    show: Boolean,
  },
  methods: {
    handleClose() {
      this.$store.commit("setDisplaySiteEdit", false);
      this.$message({
        type: "info",
        message: "Opération annulée",
      });
    },
    updateSite() {
      const callback = msg => this.$message(msg);
      this.$store.dispatch("updateSite", { callback, site: this.selectedSite });
      this.$store.commit("setDisplaySiteEdit", false);
    },
  },
  computed: {
    displaySiteEdit: {
      get() {
        return this.$store.state.sites.displaySiteEdit;
      },
    },
    selectedSite: {
      get() {
        return { ...this.$store.state.sites.selectedSite };
      },
    },
  },
};
export default SiteEdit;
</script>

<style scoped>
.el-dialog {
  width: 500px;
}
.site-form-container {
  margin: auto;
  width: 400px;
}
.site-form {
  width: 100%;
  margin-top: 20px;
}
.site-form-item {
  width: 100%;
}
</style>
