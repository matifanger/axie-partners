<template>
     <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs, value=true }">
        <v-btn class="my-auto" dense
          text elevation="0"
          v-bind="attrs"
          v-on="on"
          color="transparent"
        >
        <v-icon color="black">mdi-bell-outline</v-icon>
        <v-icon small color="grey darken-4" >{{value ? 'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
        </v-btn>
      </template>

        <v-card dense text rounded elevation="0" color="transparent" max-width="25em">
      <v-list class="py-5">
      <v-card elevation="0" color="#F5F5F5">
          <v-card-text>0 pending notifications</v-card-text>
      </v-card>
        <v-list-item :disabled="item.disabled" v-for="(item, i) in items" :key="i">

          <Nuxt-link :to="item.url" style="text-decoration: none;"> 
            <v-card max-width="20em" nuxt elevation="0" hover class="ma-0 pa-0">
          <v-card-title style="font-size:1em; letter-spacing:0;" class="grey--text text--darken-3 ma-0 pa-0">
            {{item.title}}
          </v-card-title>
          <v-card-text class="ma-0 pa-0" style="font-size:0.87em">
            {{item.description}}
            </v-card-text>

        </v-card>
        </Nuxt-link>

      </v-list-item>
      </v-list>
    </v-card>




    </v-menu>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Withdrawal Successful", description: "YoYou have succs immediately.You have succs immediately.You have succs immediately.u have succs immediately.", url: "/profile", date:"13/05/2023" },
        { title: "You’ve received a new task", description: "CheYou have succs immediately.You have succs immediately.You have succs immediately.ck your task center an", url: "/profile", date:"13/05/2023" },
        { title: "Login attempted from new IP", description: "TheYou have succs immediately.You have succs immediately.You have succs immediately. systediately.", url: "/account", date:"13/05/2023" },
      ],
    };
  },
  methods: {
    ...mapActions(["handle_auth_log_out"]),
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