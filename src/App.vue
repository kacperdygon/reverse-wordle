<script setup lang="ts">
import { exampleFieldData } from './exampleData';
import { Wordle, WordleFieldState, type PlayerWordleField } from './wordle';
import { computed, onMounted, ref } from 'vue';

const wordle = new Wordle(5);


const fields = ref<PlayerWordleField[][]>(
  Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => {
      return {
        digit: '',
        state: WordleFieldState.NotPresent
      };
    }),
  ),
);

function onNext(){

  if (currentRowIndex == -1) {
    currentRowIndex++;
    setData('27042');
    return;
  }


  const currentRow = fields.value[currentRowIndex];
  if (!currentRow) return;
  const analyzedData = wordle.analyzeData(currentRow);
  
  const result = wordle.guess(analyzedData);

  currentRowIndex++;
  setData(result);
}

function setData(data: string){

  for (let i = 0; i < data.length; i++) {

    const currentRow = fields.value[currentRowIndex];
    if (!currentRow) return;

    const field = currentRow[i];

    if (field === undefined) continue;
    field.digit = data[i] ?? '';
  }
}

let currentRowIndex = -1;

function swapState(index: number) {

  const currentRow = fields.value[currentRowIndex];
  if (!currentRow) return;
  const field = currentRow[index];
  if (!field) return;

  switch (field.state) {
    case WordleFieldState.Correct:
      field.state = WordleFieldState.NotPresent;
      break;
    case WordleFieldState.Misplaced:
      field.state = WordleFieldState.Correct;
      break;
    case WordleFieldState.NotPresent:
      field.state = WordleFieldState.Misplaced;
      break;
  }

}

onMounted(() => {
  onNext();
});

</script>



<template>
<div class="flex flex-col justify-center items-center h-full gap-4">
    <h2 class="text-4xl sm:text-5xl">Wordle</h2>
    <ul class="flex flex-col gap-4">
      <ul v-for="(row, rowIndex) in fields" :key="rowIndex" class="flex gap-4">
        <li
          v-for="(field, fieldIndex) in row"
          :key="fieldIndex"
          class="w-16 h-16 flex justify-center items-center text-3xl text-gray-50 select-none"
          @click="rowIndex === currentRowIndex ? swapState(fieldIndex) : null"
          :class="{
            'bg-gray-500': field.state === WordleFieldState.NotPresent,
            'bg-yellow-500': field.state === WordleFieldState.Misplaced,
            'bg-green-600': field.state === WordleFieldState.Correct,
            'outline-gray-400 outline-solid outline-1': field.state === null,
          }"
        >
          {{ field.digit }}
        </li>
      </ul>
    </ul>
    <button class="rounded-lg bg-blue-600 p-4 text-white text-xl cursor-pointer" @click="onNext">
      Next
    </button>
  </div>
</template>

<style scoped></style>
