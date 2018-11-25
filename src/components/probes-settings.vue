<template>
  <div class="probes-setting-container">
    <div class="probes-setting-toolbar">
      <el-select 
        v-model="selectedSiteId" 
        placeholder="Select">
        <el-option
          v-for="item in sites"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="probes-box" v-loading="!isLoaded">
      <el-table
        v-loading="!isLoaded"
        height="500px"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="probes"
        empty-text="Aucune sonde enrgistrée pour ce site de mesure"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Nom"
          width="150">
        </el-table-column>
        <el-table-column
          label="Date"
          align="center"
          header-align="center"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row.dateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Dernier energistrement"
          prop="value"
          align="center"
          header-align="center"
          width="200">
        </el-table-column>
        <el-table-column
          label="Unité"
          align="center"
          header-align="center"
          width="70">
          <template slot-scope="scope">
            <span> °C</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { formatDate } from "./../services/app.service.js";

const ProbesSettings = {
  name: "ProbesSettings",
  mounted() {
    this.$store.dispatch("loadSites");
  },
  methods: {
    formatDate(payload) {
      return formatDate(new Date(payload));
    },
  },
  computed: {
    selectedSiteId: {
      get() {
        return this.$store.state.sites.selectedSite.id;
      },
      set(siteId) {
        this.$store.commit("setSelectedSiteFromId", siteId);
      },
    },
    probes: {
      get() {
        return this.$store.state.sites.selectedSite.probes;
      },
    },
    sites: {
      get() {
        return this.$store.state.sites.sites;
      },
    },
    isLoaded: {
      get() {
        return this.$store.state.sites.isLoaded;
      },
    },
  },
};
export default ProbesSettings;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.probes-setting-container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* justify-content: center; */
  align-items: center;
  /* border: 1px solid red; */
}
.probes-setting-toolbar {
  display: flex;
  /* height: 100px; */
  justify-content: center;
  align-items: center;
  padding: 30px;
  /* border: 1px solid blue; */
}
</style>
