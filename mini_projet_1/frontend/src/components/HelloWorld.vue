<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
            :src="logo"
            class="my-3"
            contain
            height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <!-- … le reste de votre template … -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import logo from '@/assets/logo.svg';

export default {
  name: 'HelloWorld',
  data: () => ({
    logo
  })
};
</script>
