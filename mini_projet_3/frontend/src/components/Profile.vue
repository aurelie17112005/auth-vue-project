<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-card color="secondary" elevation="2">
          <v-card-title class="primary--text">
            Mon Profil
          </v-card-title>
          <v-card-text>
            <div><strong>Prénom :</strong> {{ user.firstName }}</div>
            <div><strong>Nom :</strong> {{ user.lastName }}</div>
            <div><strong>Email :</strong> {{ user.email }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="accent" block @click="logout">
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
      this.$router.replace('/login')
    }
  },
  methods: {
    logout() {
      auth.logout()
      this.$router.replace('/login')
    }
  }
}
</script>
