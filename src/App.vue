<script setup lang="ts">
import { ref } from 'vue';

// Define the number of rows and columns
const rows = 120;
const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

// Generate the cells for the matrix
const cells = ref<{ col: string, row: number }[]>([]);
for (let i = 1; i <= rows; i++) {
  for (const col of cols) {
    cells.value.push({
      row: i,
      col: col
    });
  }
}

const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<template>
  <div class="bg-zinc-900 min-h-screen flex items-center justify-center p-4">
    <div class="grid grid-cols-12 gap-0.5 w-full max-w-sm">
      <div v-for="(cell, cellIndex) in cells" :key="cellIndex"
        class="bg-transparent flex items-center justify-center text-transparent hover:text-white text-sm aspect-square border-1 border-purple-950">
        <span class="absolute ">
          {{ cell.col + cell.row }}
        </span>
        <div class="grid grid-cols-3 w-full gap-0.5">
          <div 
            v-for="square in squares" 
            :key="square"
            :id="cell.col + cell.row + '-' + square"
            class="bg-zinc-600 flex items-center justify-center text-white aspect-square"
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>