<template>
  <v-container fluid>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>Accueil sécurisé</v-card-title>
          <v-card-text>
            <p>
              Bienvenue, <strong>{{ user.firstName }} {{ user.lastName }}</strong>
              (<em>{{ user.emailId }}</em>)
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="doLogout">Déconnexion</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'HomeView',
  data() {
    return {
      user: {}
    };
  },
  created() {
    auth.getProfile()
        .then(res => { this.user = res.data.user; })
        .catch(() => { this.$router.push('/login'); });
  },
  methods: {
    async doLogout() {
      await auth.logout();
      this.$router.push('/login');
    }
  }
};
</script>
