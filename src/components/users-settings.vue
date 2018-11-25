<template>
  <div class="users-setting-container">
    <div class="users-setting-toolbar">
      <el-button  v-on:click="requestCreateUser">
        <font-awesome-icon icon="user-plus"  :style="{ color: '#CCC', fontSize:'2em' }" />
      </el-button>
    </div>
    <div class="users-box" v-loading="!isUsersLoaded">
      <el-table
        v-loading="!isUsersLoaded"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        empty-text="Aucun utilisateur à afficher"
        :data="users"
        @sort-change="sort"
        style="width: 100%">
        <el-table-column
          prop="firstName"
          label="Prénom"
          width="150">
        </el-table-column>
        <el-table-column
          prop="lastName"
          label="Nom"
          width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          label="email"
          width="200">
        </el-table-column>
        <el-table-column
          label="Actions"
          align="center"
          header-align="center"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="Accès"
          align="center"
          header-align="center"
          width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleSitesEdit(scope.$index, scope.row)">
              SITES
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <UserEdit v-if="isUsersLoaded"/>
      <UserSitesEdit v-if="isSitesLoaded" />
      <CreateUser />
    </div>
  </div>
</template>

<script>
import UserEdit from "./modals/user-edit.vue";
import UserSitesEdit from "./modals/user-sites-edit.vue";
import CreateUser from "./modals/create-user.vue";

const UsersSettings = {
  name: "UsersSettings",
  mounted() {
    this.$store.dispatch("loadUsers");
    !this.isSitesLoaded && this.$store.dispatch("loadSites");
  },
  components: {
    UserEdit,
    CreateUser,
    UserSitesEdit,
  },
  methods: {
    sort({ prop }) {
      this.$store.commit("sort", prop);
    },
    handleEdit(index, row) {
      this.$store.commit("setSelectedUser", index);
      this.$store.commit("setDisplayUserEdit", true);
    },
    handleSitesEdit(index, row) {
      this.$store.commit("setSelectedUser", index);
      this.$store.commit("setDisplayUserSitesEdit", true);
    },
    async requestCreateUser() {
      this.$store.commit("setDisplayCreateUser", true);
    },
    async requestAddUser() {
      await this.$prompt("Entrer l'adresse email", "Nouvel utilisateur", {
        confirmButtonText: "OK",
        cancelButtonText: "ANNULER",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "Email invalide",
      })
        .then(({ value }) => {
          const callback = payload => this.$message(payload);
          this.$store.dispatch("addUser", { value, callback });
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
          this.$store.dispatch("deleteUser", { callback, userId: row.id });
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
    users: {
      get() {
        return this.$store.state.users.users;
      },
    },
    sites: {
      get() {
        return this.$store.state.sites.sites;
      },
    },
    isUsersLoaded: {
      get() {
        return this.$store.state.users.isLoaded;
      },
    },
    isSitesLoaded: {
      get() {
        return this.$store.state.sites.isLoaded;
      },
    },
    isLoading: {
      get() {
        return this.$store.state.users.isLoading;
      },
    },
  },
};
export default UsersSettings;
</script>

<style scoped>
.users-setting-container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
}
.users-setting-toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.el-icon-warning {
  background-color: "yellow";
}
</style>
