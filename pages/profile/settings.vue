<template>
      <v-container style="margin-top:5em" fill-height class="justify-center pb-15">
  <v-card width="130vh" outlined>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>Settings</v-toolbar-title>

    </v-toolbar>

    <v-tabs vertical>

      <v-tab v-for="(item,index) in sidebarItems" :key="index">
        <v-icon left >
          {{item.icon}}
        </v-icon>
        {{item.title}}
      </v-tab>


      <v-tab-item>
        <SettingsProfile />
      </v-tab-item>

      <v-tab-item>
        <SettingsAccount />
      </v-tab-item>

    </v-tabs>
  </v-card>
      </v-container>
</template>

<script>
    export default {
      title: "Settings",
        data() {
            return {
                sidebarItems: [
                    { title: 'profile', to: '#profile', icon:"mdi-account" },
                    { title: 'account', to: '#account', icon:"mdi-cog" },
                    // { title: 'password', to: '#password' },
                    // { title: 'notifications', to: '#notifications' },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>