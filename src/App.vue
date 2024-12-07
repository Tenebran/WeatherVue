<script lang="ts">
import { v1 } from 'uuid';
import { defineComponent } from 'vue';
import User from './components/User.vue';

export type userData = { name: string; email: string; password: string; id: string };

export default defineComponent({
  components: { User },
  data(this: { info: string; subtitle: string }) {
    return {
      users: [] as userData[],
      userName: '',
      userPassword: '',
      userEmail: '',
      error: '',
    };
  },
  methods: {
    sendData() {
      if (!this.userName) {
        this.error = 'user name required';
        return;
      } else if (!this.userEmail) {
        this.error = 'user email required';
        return;
      } else if (!this.userPassword) {
        this.error = 'user Password required';
        return;
      }

      this.users.push({
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        id: v1(),
      });

      this.error = '';
      this.userName = '';
      this.userPassword = '';
      this.userEmail = '';
    },
    deletUser(id: string) {
      this.users = this.users.filter((el) => el.id !== id);
    },
  },
});
</script>

<template>
  <v-card color="grey-lighten-4" height="70px" rounded="0" flat>
    <v-toolbar density="compact">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>

  <v-container class="content-container">
    <v-sheet class="bg-deep-purple pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-text-field
          v-model="userEmail"
          class="mb-2"
          label="Email"
          :error="!userEmail && !!error"
          :errorMessages="!userEmail ? error : ''"
          clearable></v-text-field>

        <v-text-field
          v-model="userName"
          class="mb-2"
          label="Name"
          :error="!userName && !!error"
          :errorMessages="!userName ? error : ''"
          clearable></v-text-field>

        <v-text-field
          v-model="userPassword"
          label="Password"
          placeholder="Enter your password"
          :error="!userPassword && !!error"
          :errorMessages="!userPassword ? error : ''"
          clearable></v-text-field>

        <br />

        <v-btn color="success" size="large" @click="sendData()" variant="elevated" block>
          send
        </v-btn>
      </v-card>
    </v-sheet>

    <v-card
      v-if="users.length === 0"
      :variant="'elevated'"
      class="card"
      color="surface-variant"
      max-width="344"
      title="You hav no Users">
    </v-card>

    <v-card
      v-if="!!users.length"
      :variant="'elevated'"
      class="card"
      color="surface-variant"
      max-width="344"
      :title="`You hav ${users.length} Users`">
    </v-card>

    <User v-for="user in users" :key="user.id" :user="user" :deletUser="deletUser" />
  </v-container>
</template>

<style lang="scss" scoped>
$primary-color: green;

input {
  display: block;
  margin-bottom: 20px;
}
.userInput {
  font-size: 25px;
  display: block;
  margin: 10px 20px;
}
.userInputData {
  font-size: 23px;
  color: $primary-color;
}
.error {
  color: red;
  font-size: 18px;
}

.my-class {
  color: $primary-color;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}
.card {
  margin: 20px 0;
}
</style>
