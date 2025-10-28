<script setup lang="ts">
import { Wordle } from './wordle';
import { exampleFieldData } from './exampleFieldData';

const wordle = new Wordle(5);

function useData(index: number){
  if (!exampleFieldData[index]) return;
  wordle.applyFieldData(exampleFieldData[index]);
  console.log(wordle.getAllData());
}

</script>



<template>
<button @click="useData(0)">Field data one</button>
<button @click="useData(1)">Field data two</button>
<button @click="useData(2)">Field data three</button>
</template>

<style scoped></style>
