<script setup lang="ts">
import { onMounted } from 'vue';
import { Wordle, WordleFieldState, type PlayerWordleField } from './wordleClass';

const wordle = new Wordle(5);

const exampleFieldData: PlayerWordleField[] = [
  {
    digit: "5",
    state: WordleFieldState.Correct
  },
  {
    digit: "3",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "8",
    state: WordleFieldState.NotPresent
  },
  {
    digit: "7",
    state: WordleFieldState.Misplaced
  },
  {
    digit: "7",
    state: WordleFieldState.NotPresent
  }
]

onMounted(() => {
  wordle.applyFieldData(exampleFieldData);

  console.log(wordle.getAllData());
})

</script>



<template>
  
</template>

<style scoped></style>
