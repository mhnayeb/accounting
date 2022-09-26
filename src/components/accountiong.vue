<template>
  <div class="accounting">
    <div class="add__person">
      <AddPerson @create="createdFunction()" />
    </div>
    <div class="list__person">
      <ListPerson :created="created" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AddPerson from "./addPerson.vue";
import ListPerson from "./listPerson.vue";

const created = ref<number>(0);

function createdFunction() {
  created.value = created.value + 1;
}
</script>

<style scoped lang="scss">
.accounting {
  background-color: var(--bacground);
  padding: 30px;
  height: 100vh;
  padding: 30px;
  .add__person {
    max-width: var(--width);
    width: 100%;
  }
  .list__person {
    padding: 40px;
  }
}
</style>
