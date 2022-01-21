<template>
    <v-card class="pa-5" v-if="this.$store.state.userDB" outlined>
    
    <h3 class="title">Profile</h3>
    <span class="subtitle">This information will be displayed publicly so be careful what you share.</span>

    <v-row class="mt-3">
        <v-col cols="9">
            <span>Username</span>
            <v-text-field width="100%" outlined dense persistent-hint v-model="userDB.profile.url" hint="ex: axie.partners/username"></v-text-field>

            <span>About me</span>
              <v-textarea
              resizable
              placeholder="A description of yourself (max 1000 characters)"
                :rules="[
                  (v) =>
                    (v || '').length <= 1000 ||
                    'Description must be 1000 characters or less',
                ]"
                rows="5"
                row-height="15"

                outlined
                v-model="userDB.profile.aboutme"

                :messages="messageTextMaxLength"
                auto-grow
              ></v-textarea>


            <span>Name
            <v-text-field v-model="userDB.user.name"  outlined dense></v-text-field></span>

            <v-card flat width="100%">Headline
            <v-text-field multiple  outlined dense v-model="userDB.profile.headline"  />
            </v-card>

            <v-card flat width="100%">Occupation
            <v-text-field multiple  outlined dense v-model="userDB.user.occupation"  />
            </v-card>

            <v-card flat width="100%">Languages


    <v-combobox
      v-model="userDB.user.languages"
      :items="userDB.user.languages"
      :search-input.sync="userlanguageSearch"
      hide-selected
      multiple
      persistent-hint
      small-chips
      deletable-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>


            </v-card>


        </v-col>

        <v-col cols="3" class="text-center">

        <div>Photo
        <v-img height="9em" contain src="/avatar/1.png"></v-img></div>

        <div class="mt-15">Banner
        <v-img height="9em" contain src="/banner/banner.jpg"></v-img></div>

        </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex flex-wrap justify-space-around">

            <v-card flat>Birthday
        <v-menu
        v-model="birthdayMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
          outlined dense
            v-model="userDB.user.age"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="userDB.user.age"
          @input="birthdayMenu = false"
        ></v-date-picker>
      </v-menu>

            </v-card>

            <v-card flat>Civil
            <v-select outlined dense v-model="userDB.user.civil" :items="['Married', 'Single', 'Divorced', 'Separated', 'Widowed']" />
            </v-card>

            <v-card flat>Sex
            <v-select  outlined dense v-model="userDB.user.gender" :items="['Male', 'Female', 'Not specified']"  />
            </v-card>

            <v-card flat>In-game Experience
            <v-select  outlined dense v-model="userDB.user.gender" :items="['Never played', 'Played a few times', 'Played a lot']"  />
            </v-card>

            <v-card flat>Knowledge
            <v-select  outlined dense v-model="userDB.user.gender" :items="['Basic', 'Intermediate', 'Advanced', 'Profesional']"  />
            </v-card>

            <v-card flat>Availability
            <v-select  outlined dense v-model="userDB.user.gender" :items="['Basic', 'Intermediate', 'Advanced', 'Profesional']"  />
            </v-card>

      </v-col>

          <v-snackbar
      v-model="snackbar"
      timeout="3000"
      color="success"
      top
    >

      Settings saved successfully!

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

    </v-row>

  <v-divider />

    <v-card flat class="text-center mt-5">
      <v-btn  color="success" :loading="saveButtonLoading" :disabled="saveButtonLoading" v-on:click="saveSettings()">Save</v-btn>
    </v-card>


    </v-card>
</template>

<script>
import { mapActions } from "vuex";
    export default {
    head: {
    title: 'Settings',
      },
        data() {
            return {
                message: {text: '', date: '' },
                userDB: null,
                userProfileFound: null,
                userlanguageSearch: null,
                birthday: null,
                birthdayMenu: null,
                settingsSaved: null,
                snackbar: false,
                saveButtonLoading: false,

                // profile: { username, aboutme, name, age, gender, civil, country, languages, occupation, url, banner, weeklyAlerts, email },
            }
        },


watch: {
  stateShemes() {
    this.userDB = JSON.parse(JSON.stringify(this.stateShemes))
    this.userProfileFound = true
  }
},

beforeMount() {
  this.userDB = this.stateShemes
},

methods: {
...mapActions(["getUserDB"]),
  saveSettings() {
        this.saveButtonLoading = true
        var docRef = this.$fire.firestore.collection('users').doc(this.userDB.userid);
        docRef.update(this.userDB).then((res) => {
            this.getUserDB(this.userDB.userid)
            this.snackbar = true
        })
        this.saveButtonLoading = false
  }
},

  computed: {
    stateShemes() { 
        return JSON.parse(JSON.stringify(this.$store.state.userDB))
      },
    messageTextMaxLength() {
      return this.message.text.length.toString();
    },
    }
}
</script>

<style lang="scss" scoped>

</style>