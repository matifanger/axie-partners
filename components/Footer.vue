<template>
  <div style="width:100%; margin-top:5%">

    <v-footer dark padless>
      <v-card width="100%" flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-btn
        style="text-decoration: underline;"
        v-for="(link,key) in links"
        :key="key"
        text
        rounded
        :to="link.url"
        class="mx-1 my-1"
      >
        {{ link.name }}
      </v-btn>


        <v-card-text class="white--text pt-0">
          We are a fanpage and we are not affiliated with <a style="color: inherit; text-decoration: none;" href="https://www.axieinfinity.com">axieinfinity.com</a>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Axie Partners</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
        links: [
            {name: 'About', url: '/about'},
            {name: 'Pricing', url: '/pricing'},
            {name: 'Terms & Policy', url: '/terms-of-use'},
            ],
    icons: [
        'mdi-twitter',
        'mdi-instagram',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>