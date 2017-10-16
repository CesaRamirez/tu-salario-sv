<template lang="html">
  <div>
      Home
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: mapGetters({
            user: 'auth/user'
        }),
    }
</script>
