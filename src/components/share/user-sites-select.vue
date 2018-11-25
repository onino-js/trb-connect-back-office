<template>
  <el-select  
    v-model="userSitesIds"
    size="mini"
    multiple
    collapse-tags
    placeholder="Select">
    <el-option
      size="mini"
      v-for="site in sites"
      :key="site.name"
      :label="site.name"
      :value="site.id">
   </el-option>
  </el-select>
</template>

<script>
const UserSitesSelect = {
  name: "UserSitesSelect",
  props: {
    sites: Array,
    userSites: Array,
  },
  data: function() {
    return {
      userSitesIds: this.userSites ? this.userSites.map(site => site.id) : [],
    };
  },
};
export default UserSitesSelect;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
