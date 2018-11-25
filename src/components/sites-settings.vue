<template>
  <div class="sites-setting-container">
    <div class="sites-setting-toolbar">
      <el-button  v-on:click="requestAddSite">
        <font-awesome-icon icon="plus"  :style="{ color: '#CCC', fontSize:'2em' }" />
      </el-button>
    </div>
    <div class="sites-box" v-loading="!isLoaded">
      <el-table
        v-loading="!isLoaded"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="sites"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Prénom"
          width="150">
        </el-table-column>
        <el-table-column
          label="Actions"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i> </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="Sondes"
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewProbes(scope.$index)">
              <font-awesome-icon icon="search" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <SiteEdit />
      <ProbeList />
    </div>
  </div>
</template>

<script>
import SiteEdit from "./modals/site-edit.vue";
import ProbeList from "./modals/probe-list";

const SitesSettings = {
  name: "SitesSettings",
  mounted() {
    this.$store.dispatch("loadSites");
  },
  components: {
    SiteEdit,
    ProbeList,
  },
  methods: {
    handleViewProbes(index) {
      this.$store.commit("setDisplayProbeList", true);
      this.$store.commit("setSelectedSite", index);
    },
    handleEdit(index, row) {
      this.$store.commit("setSelectedSite", index);
      this.$store.commit("setDisplaySiteEdit", true);
    },
    async requestAddSite() {
      await this.$prompt("Entrer un nom", "Nouveau site de mesure", {
        confirmButtonText: "OK",
        cancelButtonText: "ANNULER",
      })
        .then(({ value }) => {
          const callback = payload => this.$message(payload);
          this.$store.dispatch("addSite", { value, callback });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Opération annulée",
          });
        });
    },
    async handleDelete(index, row) {
      const callback = msg => this.$message(msg);
      await this.$confirm("Etes vous sur de vouloir supprimer ?", "Attention", {
        confirmButtonText: "OK",
        cancelButtonText: "ANNULER",
        type: "warning",
      })
        .then(({ value }) => {
          this.$store.dispatch("deleteSite", { callback, siteId: row.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Opération annulée",
          });
        });
    },
  },
  computed: {
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
    isLoading: {
      get() {
        return this.$store.state.sites.isLoading;
      },
    },
  },
};
export default SitesSettings;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sites-setting-container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* justify-content: center; */
  align-items: center;
  /* border: 1px solid red; */
}
.sites-setting-toolbar {
  display: flex;
  /* height: 100px; */
  justify-content: center;
  align-items: center;
  padding: 30px;
  /* border: 1px solid blue; */
}
</style>
