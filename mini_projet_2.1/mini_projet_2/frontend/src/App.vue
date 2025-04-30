<template>
  <v-app>
    <!-- HEADER -->
    <v-app-bar app color="primary" dark elevation="2">
      <v-toolbar-title>Mon Application 2</v-toolbar-title>
    </v-app-bar>

    <!-- CONTENU PRINCIPAL -->
    <v-main>
      <v-container fluid class="pa-4">
        <router-view/>
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer app padless color="info">
      <v-col class="text-center white--text py-2">
        Made by AZ. Aurélie
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.v-application {
  background-color: #C4D6B0 !important;
}
</style>
