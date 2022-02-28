<template>
<input :type="type"  id="input" placeholder="Enter some text" name="name"></input>
</template>
<script>
export default {
  mounted () {
  },
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
