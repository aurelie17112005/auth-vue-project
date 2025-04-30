<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-card color="secondary" elevation="4">
          <v-card-title class="primary--text justify-center">
            Inscription
          </v-card-title>
          <v-card-text class="pa-4">
            <v-form @submit.prevent="doRegister">
              <v-text-field
                  v-model="firstName"
                  label="Prénom"
                  outlined
                  required
                  autocomplete="given-name"
                  class="mb-3"
              />
              <v-text-field
                  v-model="lastName"
                  label="Nom"
                  outlined
                  required
                  autocomplete="family-name"
                  class="mb-3"
              />
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
                  autocomplete="new-password"
                  class="mb-3"
              />
              <v-btn type="submit" color="accent" block>
                Créer un compte
              </v-btn>
            </v-form>
            <v-alert v-if="error" type="error" dense class="mt-4">
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text color="info" to="/login">
              J’ai déjà un compte
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
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async doRegister() {
      this.error = ''
      try {
        await auth.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        this.$router.push('/login')
      } catch (e) {
        this.error = e.response?.data?.message || 'Erreur lors de l’inscription'
      }
    }
  }
}
</script>
