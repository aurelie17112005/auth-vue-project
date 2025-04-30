<template>
  <v-container fluid class="fill-height">
    <v-row class="mb-4">
      <v-col>
        <v-btn text color="error" @click="logout">
          Se déconnecter
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-list two-line>
          <v-list-item v-for="m in messages" :key="m.id">
            <v-list-item-content>
              <v-list-item-title>
                {{ m.from.firstName }} {{ m.from.lastName }}
                <small class="grey--text text--darken-1">
                  {{ new Date(m.timestamp).toLocaleTimeString() }}
                </small>
              </v-list-item-title>
              <v-list-item-subtitle>{{ m.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-form @submit.prevent="send" class="mt-4">
          <v-text-field
              v-model="newMsg"
              label="Votre message…"
              outlined
              dense
          />
          <v-btn color="accent" @click="send">
            Envoyer
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from '@/services/auth'
import { connectSocket, sendMessage, onMessage } from '@/services/chat'

export default {
  name: 'Chat',
  data() {
    return {
      newMsg: '',
      messages: []
    }
  },
  async created() {
    // 1) récupérer l’historique
    const res = await fetch('http://localhost:3000/chat/history', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    const { messages } = await res.json()
    this.messages = messages

    // 2) socket
    const socket = connectSocket()
    onMessage(msg => this.messages.push(msg))
  },
  methods: {
    send() {
      if (!this.newMsg) return
      sendMessage(this.newMsg)
      this.newMsg = ''
    },
    logout() {
      auth.logout()
      this.$router.replace('/login')
    }
  }
}
</script>
