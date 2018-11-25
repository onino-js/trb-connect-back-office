<template>
<el-dialog
  title="Editer les accès"
  :visible.sync="displayUserSitesEdit"
  :before-close="handleClose"
  width="500px"
  >
<div class="user-sites-edit-container">
  <el-table
    v-loading="!isSitesLoaded"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="sites">
    <el-table-column
      prop="name"
      label="Nom"
      width="300">
    </el-table-column>
    <el-table-column
      width="70">
      <template slot-scope="scope">
        <el-button v-on:click="toggleAccess(scope.row.id)" v-bind:type="getType(scope.row)">
          <font-awesome-icon v-bind:icon="getIcon(scope.row)"  :style="{ color: '#FFF' }" />
        </el-button>
      </template>
    </el-table-column>
     </el-table>
  <div>
    <el-button type="primary" v-on:click="handleClose()">ANNULER</el-button>
    <el-button 
      type="primary" 
      v-bind:disabled="!hasChanged()"
      v-on:click="updateUser()">
      ENREGISTRER
    </el-button>
  </div>
</div>
</el-dialog>
</template>

<script>
const UserSitesEdit = {
  name: "UserSitesEdit",
  props: {
    show: Boolean,
  },
  methods: {
    isSiteLocked(siteId) {
      if (this.editedUser.sites.length === 0) {
        return true;
      } else {
        const test = this.editedUser.sites.findIndex(
          site => site.id === siteId,
        );
        return test === -1 ? true : false;
      }
    },
    getIcon(site) {
      return this.isSiteLocked(site.id) ? "lock" : "lock-open";
    },
    getType(site) {
      return this.isSiteLocked(site.id) ? "warning" : "success";
    },
    toggleAccess(siteId) {
      if (this.isSiteLocked(siteId)) {
        const site = this.sites.find(site => site.id === siteId);
        const editedUser = { ...this.editedUser };
        editedUser.sites.push(site);
        this.$store.commit("setEditedUser", editedUser);
      } else {
        const editedUser = { ...this.editedUser };
        editedUser.sites = editedUser.sites.filter(site => site.id !== siteId);
        this.$store.commit("setEditedUser", editedUser);
      }
    },
    handleClose() {
      this.$store.commit("setDisplayUserSitesEdit", false);
      this.$message({
        type: "info",
        message: "Opération annulée",
      });
    },
    updateUser() {
      const callback = msg => this.$message(msg);
      this.$store.dispatch("updateUser", { callback, user: this.editedUser });
      this.$store.commit("setDisplayUserSitesEdit", false);
    },
    hasChanged() {
      if (!this.editedUser || this.editedUser === undefined) return;
      let res = false;
      this.editedUser.sites.forEach(site => {
        const index = this.selectedUser.sites.findIndex(
          site2 => site2.id === site.id,
        );
        if (index === -1) res = true;
      });
      this.selectedUser.sites.forEach(site => {
        const index = this.editedUser.sites.findIndex(
          site2 => site2.id === site.id,
        );
        if (index === -1) res = true;
      });
      return res;
    },
  },
  computed: {
    displayUserSitesEdit: {
      get() {
        return this.$store.state.ui.displayUserSitesEdit;
      },
    },
    editedUser: {
      get() {
        return this.$store.state.users.editedUser;
      },
    },
    selectedUser: {
      get() {
        return this.$store.state.users.selectedUser;
      },
    },
    sites() {
      return this.$store.state.sites.sites;
    },
    isSitesLoaded() {
      return this.$store.state.sites.isLoaded;
    },
  },
};
export default UserSitesEdit;
</script>

<style scoped>
.el-dialog {
  width: 700px;
}
.el-table {
  margin: auto;
  width: 400px;
  margin: 10px auto 30px auto;
}
.user-sites-edit-container {
  margin: auto;
}
</style>
