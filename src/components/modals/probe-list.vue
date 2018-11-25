<template>
<el-dialog
  title="Liste des sondes"
  :visible.sync="displayProbeList"
  :before-close="handleClose"
  width="500px"
  top="5vh"
  >
<div class="container">
    <el-table 
    :data="probes" 
    height="500" 
    empty-text="Aucune sonde enrgistrée pour ce site de mesure">
      <el-table-column 
        label="Nom"
        prop="name"
      >
      </el-table-column>
    </el-table>
</div>
</el-dialog>
</template>

<script>
const ProbeList = {
  name: "ProbeList",
  methods: {
    handleClose() {
      this.$store.commit("setDisplayProbeList", false);
    },
  },
  computed: {
    displayProbeList() {
      return this.$store.state.ui.displayProbeList;
    },
    probes() {
      return this.$store.state.sites.selectedSite.probes;
    },
  },
};
export default ProbeList;
</script>

<style scoped>
.el-dialog {
  width: 500px;
}
.container {
  margin: auto;
}
</style>
