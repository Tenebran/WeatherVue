<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { userData } from '../App.vue';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<userData>,
    },
    deletUser: {
      type: Function,
    },
  },
  data() {
    return;
  },
});
</script>

<template>
  <div class="userInput">
    <span class="userInputData">{{ user.name }}</span>
  </div>
  <div class="userInput">
    <span class="userInputData">{{ user.email }}</span>
  </div>
  <div class="userInput">
    <span class="userInputData">{{ user.password }}</span>
  </div>
  <button class="deleteUserButton" @click="deletUser(user.id)">Delete User</button>
</template>

<style scoped>
.deleteUserButton {
  display: block;
  background-color: rgb(255, 59, 59);
}
</style>
