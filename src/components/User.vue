<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { userData } from '../App.vue';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<userData>,
      required: true,
    },
    deletUser: {
      type: Function,
      required: true,
    },
  },
  data() {
    return;
  },
});
</script>

<template>
  <v-card
    :variant="'elevated'"
    class="card"
    color="surface-variant"
    max-width="344"
    :subtitle="`Email: ${user.email}`"
    :title="`Name: ${user.name}`">
    <template v-slot:actions>
      <v-btn @click="deletUser(user.id)" text="Button" class="userButton">Delete</v-btn>
    </template>
  </v-card>
</template>

<style scoped>
.userButton {
  color: rgb(245, 69, 69);
}
</style>
