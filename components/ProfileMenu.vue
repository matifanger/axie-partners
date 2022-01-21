<template>

     <v-menu offset-y open-on-hover v-if="this.$store.state.userDB">

       <!-- START TEMPLATE LOGOUT BUTTON  -->
      <template v-slot:activator="{ on, attrs }">

      <v-avatar v-bind="attrs" v-on="on" class="rounded-circle" color="grey" size="43">
          <v-img :src="userDB.profile.photo"></v-img>
      </v-avatar>

      </template>
      <!-- END TEMPLATE LOGOUT BUTTON  -->

<!-- START PROFILE MENU STYLING  -->
    <v-card v-if="this.$store.state.userDB" dense text rounded elevation="0" min-width="15em" max-width="25em">
      <v-card-text width="100%" class="black--text text-center" style="font-size:1em">{{this.$store.state.userDB.email}} 
      <v-tooltip bottom v-if="this.$store.state.userDB.user.verified">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" :color="userDB.user.premium ? '#FCA120':'light-blue'">mdi-check-decagram</v-icon>
      </template>
      <span>{{this.$store.state.userDB.user.verified && this.$store.state.userDB.user.premium ? 'Premium user' : 'Verified user' }}</span>
    </v-tooltip>
    <v-tooltip bottom else>
      <template v-slot:activator="{ on, attrs }">
        <NuxtLink to="../password/verification" style="color: inherit; text-decoration: none;" >
        <v-icon v-bind="attrs" v-on="on" :color="userDB.user.premium ? '#FCA120':'light-red'">mdi-alert-decagram</v-icon></NuxtLink> 
      </template>
      <span> Not verified (click to verify) </span>
    </v-tooltip>
  </v-card-text>

  <!-- START PROFILE MENU BUTTONS  -->
      <v-list class="pa-0 ma-0">
        <v-list-item class="pa-0 ma-0" :disabled="item.disabled" v-for="(item, i) in items" :key="i">
          <v-hover v-slot="{ hover }" >
          <v-btn height="3.3em" :color="hover ? 'gray' : 'transparent' " class="text-left" :to="item.url" text block>
        <v-icon class="mr-5" tile size="20" color="grey">{{item.icon}}</v-icon>
        <v-list-item-content class="mr-n10">
          <v-list-item-title style="font-size:1em; letter-spacing:0;" class="grey--text text--darken-3">
            {{item.title}}
          </v-list-item-title>
        </v-list-item-content>
        </v-btn>
        </v-hover>         
      </v-list-item>
      <!-- END PROFILE BUTTONS MENU  -->

      <v-divider></v-divider>

      <!-- START PROFILE LOGOUT BUTTON  -->
      <v-list-item class="pa-0 ma-0">
          <v-hover v-slot="{ hover }" >
          <v-btn height="3.3em" :color="hover ? 'gray' : 'transparent' " class="text-left" v-on:click="handle_auth_log_out" text block>
        <v-icon class="mr-5" tile size="20" color="grey">mdi-logout</v-icon>
        <v-list-item-content class="mr-n10">
          <v-list-item-title style="font-size:1em; letter-spacing:0;" class="grey--text text--darken-3">
            Logout
          </v-list-item-title>
        </v-list-item-content>
        </v-btn>
        </v-hover>         
      </v-list-item>
      <!-- END PROFILE LOGOUT BUTTON  -->

      {{state}}

      </v-list>
    </v-card>
    <!-- END PROFILE MENU STYLING  -->
    </v-menu>
    

</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Profile", icon: "mdi-account", url:  '' },
        { title: "Chat", icon: "mdi-message", url: "/chat" },
        { title: "Account", icon: "mdi-lock", url: "../profile/settings" },
      ],
    };
  },
  methods: {
    ...mapActions(["handle_auth_log_out"]),
  },

  computed: {
    userDB () {
    return this.$store.state.userDB
    },
    state () {
      this.items[0].url = '/profile/' + this.$store.state.userDB.userid
    }
  },

};
</script>

<style scoped>

.tile {
  margin: 5px;
  border-radius: 4px;
}
.tile:hover {
  background: rgb(128, 128, 128, 0.5);
}
.tile:active {
  background: rgb(128, 128, 128, 0.9);
}

.donateUsGradient {
  background: linear-gradient(to right, #b8007a, #ff6a00);
}
</style>