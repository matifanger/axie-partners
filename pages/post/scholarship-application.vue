<template>
  <div style="margin-top: 8em">
      {{newApplication}}
    <v-row justify="center" align="center" class="mx-1">
      <v-col sm="7" md="5">
        <v-card class="pa-5" outlined>
          <h3 class="title text-center">Creating scholarship Application</h3>
          <div class="subtitle text-center">
            This information will be displayed publicly so be careful what you
            share
          </div>

          <div class="mt-5">Title</div>
          <v-text-field
            width="100%"
            v-model="newApplication.title"
            outlined
            dense
          ></v-text-field>

          <span>Description</span>
          <v-textarea
            resizable
            placeholder="A description of what you are looking for (max 1000 characters)"
            :rules="[
              (v) =>
                (v || '').length <= 1000 ||
                'Description must be 1000 characters or less',
            ]"
            rows="5"
            row-height="15"
            outlined
            v-model="newApplication.description"
            :messages="messageTextMaxLength"
            auto-grow
          ></v-textarea>

          <v-card class="d-flex" flat>
            <v-card flat width="50%" class="mr-4">
              Banned countries
              <v-combobox
                dense
                v-model="newApplication.filter.country"
                :items="countriesList"
                :search-input.sync="userCountrySearch"
                hide-selected
                multiple
                persistent-hint
                small-chips
                deletable-chips
                outlined
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ userCountrySearch }}</strong>".
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-card>

            <v-card flat width="50%">
              Banned languages
              <v-combobox
                dense
                v-model="newApplication.filter.languages"
                item-text="name"
                item-value="name"
                :items="languagesList"
                :search-input.sync="userlanguageSearch"
                hide-selected
                multiple
                persistent-hint
                small-chips
                deletable-chips
                outlined
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ userlanguageSearch }}</strong>".
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-card>
          </v-card>

          <v-card flat class="d-flex mb-4 text-center">
            <v-card flat width="50%">
              Photo
              <v-img width="30%" class="mx-auto" src="/avatar/1.png"></v-img>
            </v-card>

            <v-card flat width="50%">
              Banner
              <v-img width="80%" class="mx-auto" src="/banner/banner.jpg"></v-img>
            </v-card>
          </v-card>

          <v-card flat width="10em" class="mx-auto mt-8">
            End time
            <v-menu
              v-model="endTimeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  dense
                  v-model="newApplication.end_time"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newApplication.end_time"
                @input="endTimeMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-card>

          <v-divider />

          <v-card flat class="text-center mt-5">
            <v-btn
              color="success"
              :loading="saveButtonLoading"
              :disabled="saveButtonLoading"
              v-on:click="createScholarship()"
              >CREATE SCHOLARSHIP</v-btn
            >
          </v-card>
        </v-card>
      </v-col>

    </v-row>

    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      color="error"
      top
    >

      Something happened!

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon> 
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  head: {
    title: "Creating scholarship application",
  },
  data() {
    return {
      newApplication: {
        description: "",
        title: "",
        filter: { country: "", language: "" },
        end_time: "",
        banner: "",
        photo: "",
        creatorid: "",
        id: "",
        paused: false,
        users: { ammount: 0, usersid: [] },
      },
      snackbar: false,
      userCountrySearch: null,
      userlanguageSearch: null,
      endTimeMenu: null,
      saveButtonLoading: false,
      countriesList: [],
      languagesList: [],
    };
  },

mounted() {
    fetch('https://gist.githubusercontent.com/matifanger/a7c7bbf502b77805ba8d331d236e86c8/raw/f51ff2a0cdc31a7e71e85680ab7cc8bb5bef0e54/CountriesAsArrays.json')
    .then(res => res.json())
    .then(data => {
        this.countriesList = data.countryList
    })
    .catch( error => {
            console.log(error)
        }
    )

    fetch('https://gist.githubusercontent.com/matifanger/60aa3c395ac83414840f3c0bd200c573/raw/578f9c7ccda598abfb8c7515551eaf7f2535adcd/language.json')
    .then(res => res.json())
    .then(data => {
        this.languagesList = data.languageList
    })
    .catch( error => {
        console.log(error)
        }
    )
},

  methods: {
    createScholarship() {

    return new Promise ((resolve, reject) => {
        var docRef = this.$fire.firestore.collection('users').doc(this.$store.state.userDB.userid);
        this.newApplication.creatorid = this.$store.state.userDB.userid
        this.newApplication.id = new Date().getTime().toString()
        docRef.update({
            'profile.scholarship.applications': this.$fireModule.firestore.FieldValue.arrayUnion(this.newApplication)
        }).then(
            this.$router.push(`/scholarships/application/${this.newApplication.id}`),
            resolve()
        ).catch(error => {
            console.log(error)
            this.snackbar = true
            reject()
        })
    })
},
},

  computed: {
    messageTextMaxLength() {
      return this.newApplication.description.length.toString();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>