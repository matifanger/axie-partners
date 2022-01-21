export const state = () => ({
  user: null,
  userDB: null,
  logged_in: false,
  errorRegister: false,
  errorMessage: '',
})

export const mutations = {
  set_user_handler(state, payload) {
    state.user = JSON.parse(JSON.stringify(payload));
  },

  set_userDB_handler(state, payload) {
    state.userDB = payload;
  },

  logged_in_handler(state, payload) {
    state.logged_in = payload;
  },

  errorMessage_handler(state, payload) {
    state.errorMessage = payload;
  },
}

export const actions = {
  action_create_match_menu_handler({
    commit
  }, bool) {
    commit('create_match_menu_handler', bool)
  },

  action_logged_in_handler({
    commit
  }, bool) {
    commit('logged_in_handler', bool)
  },

  action_errorMessage_handler({
    commit
  }, value) {
    commit('errorMessage_handler', value)
  },

  action_set_user_handler({
    commit
  }, bool) {
    commit('set_user_handler', bool)
  },

  action_set_userDB_handler({
    commit
  }, payload) {
    commit('set_userDB_handler', payload)
  },

  registerUser({ dispatch }, user) {
    console.log(user.email, user.password)
    this.$fireModule.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        console.log(res)
        const userCreated = {
          email: res.user.email,
          uid: res.user.uid
        }
        var docRef = this.$fire.firestore.collection('users').doc(res.user.uid);
        docRef.set({
          userid: res.user.uid,
          email: res.user.email,
          url: res.user.uid,
          preferences: {
            termOfUse: true,
            weeklyAlerts: user.weeklyAlerts,
            acceptCookies: null,
          },
          user: {
            name: user.name,
            lastname: '',
            age: '',
            gender: '',
            civil: '',
            country: '',
            occupation: '',
            languages: [],
            verified: false,
            premium: false,
          },
          profile: {
            photo: `/avatar/${Math.floor(Math.random() * (9 - 1) + 1)}.png`,
            headline: '',
            banner: '/banner/banner.jpg',
            url: '',
            aboutme: '',
            comments: { ammount: 0, data: [ { userid: '', name: '', text: '', date: ''} ] },
            followers: {
              ammount: 0,
              usersid: []
            },
            scholarship: {
              applications: [{
                photo: '',
                banner: '',
                id: '',
                creatorid: '',
                description: '',
                filter: {
                  country: '',
                  language: ''
                },
                paused: false,
                start_time: 0,
                end_time: 0,
                users: {
                  ammount: 0,
                  usersid: []
                }
              }],
              giveaways: [{
                photo: '',
                banner: '',
                id: '',
                creatorid: '',
                description: '',
                filter: {
                  byCountry: '',
                  byLanguage: ''
                },
                paused: false,
                start_time: 0,
                end_time: 0,
                users: {
                  ammount: 0,
                  usersid: []
                }
              }],
            },
          },
        }).then(
          this.$fireModule.auth().currentUser.sendEmailVerification()
          .then(() => {
            console.log('EmailVerificationSended')
          })
        )
        dispatch('action_set_user_handler', userCreated)
        this.$router.push('/password/verification')
      }).catch(err => {
        dispatch('action_errorMessage_handler', err)
      } )
  },

  loginUser({
    dispatch
  }, user) {
    console.log(user.email, user.password)
    this.$fireModule.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        dispatch('getUserDB', res.user.uid)
        this.$router.push('/')
      }).catch(err => {
        dispatch('action_errorMessage_handler', err)
      })
  },

  getUserDB({
    dispatch
  }, id) {
    const docRef = this.$fire.firestore.collection('users').doc(id)
    docRef.get().then((doc) => {
      let user = doc.data()
      //console.log(doc)
      console.log('userrr =>=>',user)
      dispatch('action_set_userDB_handler', user)
    })

  },

  handleAuthStateChange({
    dispatch
  }) {
    this.$fireModule.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('logged in:>>>>>', user)
        dispatch('action_logged_in_handler', true)
        dispatch('action_set_user_handler', user)
        dispatch('getUserDB', user.uid)
      } else {
        // No user is signed in.
        console.log('not logged in:', user)
      }
    });
  },

  handle_auth_log_out({
    commit,
    dispatch
  }) {
    this.$fireModule.auth().signOut().then(() => {
      var user = {}
      console.log('logged Out')
      dispatch('action_logged_in_handler', false)
      dispatch('action_set_user_handler', user)
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
}
