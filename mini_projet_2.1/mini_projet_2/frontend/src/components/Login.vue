<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="4" color="secondary">
          <v-card-title class="primary--text justify-center">
            Connexion
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="doLogin" class="pa-4">
              <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  required
                  outlined
                  color="primary"
                  class="mb-4"
              />
              <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  type="password"
                  required
                  outlined
                  color="primary"
                  class="mb-4"
              />
              <v-btn
                  type="submit"
                  color="accent"
                  block
              >
                Se connecter
              </v-btn>
            </v-form>

            <v-alert
                v-if="error"
                type="error"
                dense
                class="mt-4"
            >
              {{ error }}
            </v-alert>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn text color="info" to="/register">
              Pas encore de compte ?
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
        const { data } = await auth.login({
          email: this.email,
          password: this.password
        })
        localStorage.setItem('jwt', data.token)
        this.$router.push('/profile')
      } catch (e) {
        this.error = e.response?.data?.message || 'Erreur lors de la connexion'
      }
    }
  }
}
</script>
