<script setup>

</script>


<template>
  <form class="row">
    <div class="col-12">
      <label for="floatingTextarea2">Make a Post!</label>
      <textarea class="form-control " placeholder="Leave a comment here" id="floatingTextarea2"
        maxlength="300"></textarea>
    </div>
  </form>
</template>


<style lang="scss" scoped>
textarea {
  resize: none;
  height: 27vh !important;
}
</style>