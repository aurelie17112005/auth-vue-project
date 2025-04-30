<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Chat OAuth / JWT</v-toolbar-title>
      <v-spacer/>
      <v-btn text to="/profile">Profil</v-btn>
      <v-btn text to="/chat">Chat</v-btn>
      <v-btn text to="/login">Login</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-4">
        <router-view/>
      </v-container>
    </v-main>

    <v-footer app color="info" padless>
      <v-col class="text-center white--text py-2">
        Made by AZ. Aurélie
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default { name: 'App' }
</script>

<style>
.v-application { background-color: #C4D6B0 !important; }
</style>
