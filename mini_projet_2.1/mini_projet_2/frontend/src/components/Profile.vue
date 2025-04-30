<template>
  <v-container class="mt-5" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4" color="secondary">
          <v-card-title class="primary--text justify-center">
            Mon Profil
          </v-card-title>

          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Prénom</v-list-item-title>
                  <v-list-item-subtitle>{{ user.firstName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Nom</v-list-item-title>
                  <v-list-item-subtitle>{{ user.lastName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" @click="doLogout">
              Se déconnecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from '@/services/auth'

export default {
  name: 'Profile',
  data() {
    return {
      user: {}
    }
  },
  async created() {
    try {
      const { data } = await auth.profile()
      this.user = data.user
    } catch {
      this.$router.push('/login')
    }
  },
  methods: {
    doLogout() {
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    }
  }
}
</script>
