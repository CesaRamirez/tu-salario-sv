<template lang="html">
  <div>
    <v-container>
      <v-layout align-content-start class="h100">
      <h5>Welcome to panel admin!</h5>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    user: "auth/user"
  })
};
</script>
