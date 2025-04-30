<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline justify-center">Connexion</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="doLogin">
              <v-text-field
                  v-model="emailId"
                  label="Email"
                  type="email"
                  required
              />
              <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  type="password"
                  required
              />
              <v-btn type="submit" color="primary" block>Se connecter</v-btn>
            </v-form>
            <v-alert
                v-if="error"
                type="error"
                dense
                text
                class="mt-3"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="justify-center">
            <router-link to="/register">Pas encore de compte ? S’inscrire</router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'LoginView',
  data() {
    return {
      emailId: '',    // <— renommé
      password: '',
      error: ''
    };
  },
  methods: {
    async doLogin() {
      this.error = '';
      try {
        await auth.login({
          emailId: this.emailId,  // <— renommé
          password: this.password
        });
        this.$router.push('/profile');
      } catch (e) {
        this.error = e.response?.data?.message || 'Erreur lors de la connexion';
      }
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
