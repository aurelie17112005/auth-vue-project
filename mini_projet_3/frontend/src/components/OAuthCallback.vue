<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4 text-center">
          <v-progress-circular indeterminate color="accent" class="mb-4"/>
          <div>Connexion via {{ provider }}…</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OAuthCallback',
  computed: {
    provider() { return this.$route.params.provider }
  },
  async mounted() {
    const token = new URLSearchParams(window.location.search).get('token')
    if (token) {
      localStorage.setItem('jwt', token)
      this.$router.replace('/chat')
    } else {
      this.$router.replace('/login')
    }
  }
}
</script>
