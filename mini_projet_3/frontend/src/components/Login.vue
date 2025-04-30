<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-card color="secondary" elevation="4">
          <v-card-title class="primary--text justify-center">
            Connexion
          </v-card-title>
          <v-card-text class="pa-4">
            <v-form @submit.prevent="doLogin">
              <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  outlined
                  required
                  autocomplete="email"
                  class="mb-3"
              />
              <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  type="password"
                  outlined
                  required
                  autocomplete="current-password"
                  class="mb-3"
              />
              <v-btn type="submit" color="accent" block>
                Se connecter
              </v-btn>
            </v-form>
            <v-divider class="my-4"/>
            <v-btn color="info" block @click="oauth('google')">
              → Avec Google
            </v-btn>
            <v-btn color="error" block class="mt-2" @click="oauth('github')">
              → Avec GitHub
            </v-btn>
            <v-alert v-if="error" type="error" dense class="mt-4">
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from '@/services/auth'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async doLogin() {
      this.error = ''
      try {
        const { data } = await auth.login({ email: this.email, password: this.password })
        localStorage.setItem('jwt', data.token)
        this.$router.push('/chat')
      } catch (e) {
        this.error = e.response?.data?.message || 'Erreur lors de la connexion'
      }
    },
    oauth(provider) {
      window.location = `http://localhost:3000/auth/${provider}`
    }
  }
}
</script>
