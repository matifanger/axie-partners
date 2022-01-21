<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text elevation="0"
          v-bind="attrs"
          v-on="on"
          color="transparent"
        >
          <v-list-item class="pa-0">
          <v-list-item-avatar>
              <v-img
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

              <v-list-item-title class="red--text">
                Matias Fanger
              </v-list-item-title>
          </v-list-item>
        </v-btn>
      </template>

      <v-list dense elevation="0" class="mt-1 pa-0" color="white">

    <NuxtLink to="/donate" style="text-decoration: none"> 
    <v-card style="
    background: #3A1C71;
    background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77);
    background: linear-gradient(to right, #56ab2f, #a8e063); " tile elevation="0" class="py-2" align="center">
    <strong style="font-size:1.2em;" class="grey--text text--darken-4">Donate <v-icon color="red">mdi-heart</v-icon> </strong>
    </v-card></NuxtLink>
        <template v-for="(item, index) in items">
          <template v-if="item.url != 'LogOut'">
            <NuxtLink
              :to="item.url"
              :key="index"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item  class="tile ma-0">
                <v-list-item-title class="textdark--text">
                  <v-icon color="textdark">{{ item.icon }}</v-icon
                  >&nbsp;&nbsp;  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </NuxtLink>
          </template>
        </template>
        <v-divider></v-divider>
            <v-list-item tile
              class="tile ma-0"
              :key="index"
              v-on:click="handle_auth_log_out"
            >
              <v-list-item-title class="textdark--text">
                <v-icon color="textdark">mdi-logout</v-icon
                >&nbsp;&nbsp; Logout
              </v-list-item-title>
            </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Profile", icon: "mdi-account", url: "/profile" },
        { title: "Chat", icon: "mdi-message", url: "/profile" },
        { title: "Account", icon: "mdi-lock", url: "/account" },
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