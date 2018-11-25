<template>
<el-dialog
  title="Editer l'utilisateur"
  :visible.sync="displayUserEdit"
  :before-close="handleClose"
  width="500px"
  >
<div class="user-form-container">
  <el-form :model="editedUser" :rules="rules" class="user-form"   ref="editedUser" label-width="150px">
    <el-form-item  prop="lastName" class="user-form-item" label="Nom de famille:">
      <el-input 
      class="user-input"
      v-model="editedUser.lastName"></el-input>
    </el-form-item>
    <el-form-item prop="firstName" class="user-form-item" label="Prénom:">
      <el-input 
      class="user-input"
      v-model="editedUser.firstName"></el-input>
    </el-form-item>
    <el-form-item class="user-form-item" prop="email" label="email:">
      <el-input 
      class="user-input"
      v-model="editedUser.email"></el-input>
    </el-form-item>
    <el-form-item 
      prop="password"
      class="user-form-item" 
      label="Mot de passe:">
      <el-input
       class="user-input" 
        v-model="editedUser.password"
        type="password"
       > </el-input>
    </el-form-item>
    <el-button type="primary" v-on:click="handleClose()">ANNULER</el-button>
      <el-button 
      type="primary" 
      @click="submitForm('editedUser')"
      v-bind:disabled="!hasChanged()"
      >ENREGISTRER</el-button>
  </el-form>
</div>
</el-dialog>
</template>

<script>
import { userRules } from "./../../services/rules.service";
const UserEdit = {
  name: "UserEdit",
  props: {
    show: Boolean,
  },
  data() {
    return {
      rules: userRules,
    };
  },
  methods: {
    hasChanged() {
      let test = false;
      test =
        this.editedUser.firstName !== this.selectedUser.firstName ? true : test;
      test =
        this.editedUser.lastName !== this.selectedUser.lastName ? true : test;
      test = this.editedUser.email !== this.selectedUser.email ? true : test;
      test =
        this.editedUser.password !== this.selectedUser.password ? true : test;
      return test;
    },
    handleClose() {
      this.$store.commit("setDisplayUserEdit", false);
      this.$message({
        type: "info",
        message: "Opération annulée",
      });
    },
    submitForm(formName) {
      const callback = msg => this.$message(msg);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const callback = msg => this.$message(msg);
          this.$store.dispatch("updateUser", {
            callback,
            user: this.editedUser,
          });
          this.$store.commit("setDisplayUserEdit", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    displayUserEdit: {
      get() {
        return this.$store.state.users.displayUserEdit;
      },
    },
    editedUser: {
      get() {
        return this.$store.state.users.editedUser;
      },
      set(payload) {
        this.editedUser = payload;
      },
    },
    selectedUser: {
      get() {
        return this.$store.state.users.selectedUser;
      },
    },
  },
};
export default UserEdit;
</script>

<style scoped>
.el-dialog {
  width: 500px;
}
.user-form-container {
  margin: auto;
}
.user-form {
  width: 500px;
  margin: auto;
}
.user-form-item {
  max-width: 400px;
}
</style>
