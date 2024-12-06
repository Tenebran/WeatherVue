<script lang="ts">
import { v1 } from 'uuid';
import { defineComponent } from 'vue';

type userData = { name: string; email: string; password: string; id: string }[];

export default defineComponent({
  data(this: { info: string; subtitle: string }) {
    return {
      users: [] as userData,
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
    getUserData() {
      // this.users.map(l => r)
    },
  },
});
</script>

<template>
  <input type="text" v-model="userName" placeholder="Name" />
  <input type="password" v-model="userPassword" placeholder="Password" />
  <input type="email" v-model="userEmail" placeholder="Email" />
  <span class="userInput">
    <span class="error">{{ error }}</span></span
  >
  <div v-if="users.length === 0">You hav no Users</div>

  <div v-for="user in users" :key="user.id">
    <div class="userInput">
      <span class="userInputData">{{ user.name }}</span>
    </div>
    <div class="userInput">
      <span class="userInputData">{{ user.email }}</span>
    </div>
    <div class="userInput">
      <span class="userInputData">{{ user.password }}</span>
    </div>
  </div>
  <button @click="sendData()">send</button>
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
</style>
