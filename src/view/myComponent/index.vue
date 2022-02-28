<template>
    <div>
      <!-- <myButton   @click="k1"></myButton> -->
       <myInput></myInput>
    </div>
</template>

<script>
import myButton from './button/index'
import myInput from './input/index'
export default {
  components: {
    myButton, myInput
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {

  },
  created () {

  },
  mounted () {
    console.log(this);
  },
  watch: {

  },
  methods: {
    k1 (event) {
      console.log(event)
    }
  }
};
</script>

<style scoped lang="scss">

</style>
