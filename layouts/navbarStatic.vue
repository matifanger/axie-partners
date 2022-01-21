<template>
  <v-app>
    <v-navigation-drawer
      v-model="view.drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-icon>
           <v-icon>mdi-database</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title><strong>Axie Partners</strong></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="white" elevation="0" fixed>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = true" />

      <Navbar-only-logo class="mr-5" />

     <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs, value=true }">
        <v-btn
          text elevation="0"
          v-bind="attrs"
          v-on="on"
          color="transparent"
        >
        <v-icon color="black">mdi-apps</v-icon>
        <v-icon small color="grey darken-4" >{{value ? 'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>

        </v-btn>
      </template>

    <v-card dense text rounded elevation="0" color="transparent">
      <v-list class="py-5">
        <v-list-item :to="item.to" :disabled="item.disabled" two-line v-for="(item, i) in appsItems" :key="i">
          <v-hover v-slot="{ hover }">
          <v-btn :color="hover ? 'gray' : 'transparent' " class="text-left mx-auto py-11" height="5em" text block>
        <v-avatar class="mr-5" tile size="45" color="transparent" ><v-img :src="item.icon"></v-img></v-avatar>
        <v-list-item-content class="mr-n10">
          <v-list-item-title style="font-size:1.2em; letter-spacing:0;" class="mb-1 grey--text text--darken-3">
            {{item.title}}
          </v-list-item-title>
          <v-list-item-subtitle style="letter-spacing:0; white-space: initial; max-width: 22em; font-size:0.87em">{{item.description}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-icon class="mr-2" tile size="25" :color="hover ? '#F0B90B' : 'gray' ">mdi-arrow-right</v-icon>
        </v-btn>
        </v-hover>
      </v-list-item>
      </v-list>
    </v-card>
    </v-menu>

      <v-btn text :disabled="item.disabled" class="hidden-xs-only mr-2 textdark--text" v-for="(item, i) in items" :key="i" :to="item.to">
        <v-icon :color="item.color">{{item.icon}}</v-icon>&nbsp;{{item.title}}
      </v-btn>

      
      <!--START USER INFO / LOGIN -->
      <v-layout v-if="$store.state.logged_in">
          <v-card class="mx-auto justify-space-around"/>
          <v-btn class="textdark--text my-auto" outlined>POST A SCHOLARSHIP</v-btn>
          <NotificationsBar/>
          <ProfileMenu/>
        </v-layout>
        <v-layout v-else>
          <v-card class="mx-auto justify-space-around"/>
          <v-btn class="textdark--text my-auto" outlined>POST A SCHOLARSHIP</v-btn>
          <v-btn class="textdark--text ml-2 mr-2" to="/login"  v-on:click="entrarDialog = true" text>Login</v-btn>
          <v-btn class="white--text" to="/register" color="#4F46E5">Register</v-btn>
        </v-layout>
      <!--END USER INFO / LOGIN -->


</v-app-bar>

    <v-main>
      <v-container fluid class="pa-0 ma-0">
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-account-multiple-plus',
          color: '',
          title: 'Hire scholars',
          to: '/jobs/create'
        },
        {
          icon: 'mdi-account',
          title: 'Scholar profile',
          color:'',
          to: '/account/scholar',
        },
        {
          icon: 'mdi-book',
          title: 'Learn Axie Infinity',
          color:'',
          to: '/learn',
          disabled: false,
        },
      ],
      appsItems: [
        {
          icon: '/icons/managers.png',
          title: 'Managers',
          description: 'Manage your scholarship recipients and analyze their progress',
          to: '/apps/managers',
          disabled: false,
        },
        {
          icon: '/icons/calc.png',
          title: 'Breeding',
          description: 'Calculate how much profit you will make breeding axies and simulate a combination',
          to: '/apps/breeding',
          disabled: false,
        },
        {
          icon: '/icons/magnify.png',
          title: 'Axie finder',
          description: 'Find axies in the marketplace',
          to: '/apps/axie-finder',
          disabled: false,
        },
        {
          icon: '/icons/tier.png',
          title: 'Tier list',
          description: 'Our tier list helps you to pick the best and strongest Axies',
          to: '/apps/tier-list',
          disabled: false,
        },
        {
          icon: '/icons/chart.png',
          title: 'Charts',
          description: 'See whats going on with AXS and SLP and the entire system',
          to: '/apps/charts',
          disabled: false,
        }
        ],
      view: {
        topOfPage: true,
        navColor: 'transparent',
        drawer: false,
      },
    }
  },
    beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions(['handleAuthStateChange']),
    handleScroll(){
      if(window.pageYOffset>0){
        if(this.view.topOfPage) this.view.topOfPage = false, this.view.navColor = 'white'
      } else {
        if(!this.view.topOfPage) this.view.topOfPage = true, this.view.navColor = 'transparent'
      }
    }
  },
  mounted() {
    this.$store.dispatch('handleAuthStateChange')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>
