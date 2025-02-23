<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { computed, ref } from 'vue';
import GET_LAST_QUEUE_POINT_QUERY from './getLastQueuePoint.query';
import { useCreateQueuePointMutation } from './api/mutations/createQueuePoint.mutation';


const { result } = useQuery(GET_LAST_QUEUE_POINT_QUERY);

const { mutate: createQueuePoint } = useCreateQueuePointMutation();
const lastQueuePoint = computed(() => result.value?.getLastQueuePoint)
const lastQueuePointRow = computed(() => lastQueuePoint.value?.row ?? 0);
// Define the number of rows and columns
const rows = 120;
const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

const isQueueCell = (col: string, row: number) => [`f${row}`,'e2', 'e3', 'e5', 'e6'].includes(col + row);

async function handleCreateQueuePoint(cellRow: number) {
  await createQueuePoint({ row: cellRow }, { update: (cache) => cache.evict({ fieldName: 'getLastQueuePoint' })}) 
}

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

const zigzagSquares = [
  'e2-1', 'h2-1',
  'e2-5', 'h2-5',
  'e2-9', 'h2-9',
  'e2-13',
  'e3-1', 'f3-1', 'f3-2', 'f3-3', 'f3-4', 'g3-1', 'g3-2', 'g3-3', 'g3-4', 'h3-1',
  'e3-5', 'g3-5',
  'e3-9', 'g3-9',
  'e3-13', 'g3-13',
  'e4-4', 'e4-1', 'e4-2', 'e4-3', 'e4-4',
  'f4-1', 'g4-1',
  'f4-5', 'g4-5',
  'f4-9', 'g4-9',
  'f4-13', 'g4-13',
  'e5-1', 'f5-1', 'e5-1', 'e5-2', 'e5-3', 'e5-4', 'g5-1',
  'e5-5', 'g5-5',
  'e5-9', 'g5-9',
  'e5-13', 'g5-13',
  'e6-1', 'f6-1', 'f6-2', 'f6-3', 'f6-4', 'g6-1',
  'e6-5', 'g6-5',
  'e6-9', 'g6-9',
  'e6-13', 'g6-13',
  'e7-1', 'e7-2', 'e7-3', 'e7-4', 'f7-1', 'f7-2', 'g7-1',
  'g7-5',
  'g7-9',
]

const blocks = [
  'c13-5', 'c13-6', 'c13-7', 'c13-8',
  'c13-9', 'c13-10', 'c13-11', 'c13-12',
  'c13-13', 'c13-14', 'c13-15', 'c13-16',

  'c14-5', 'c14-6', 'c14-7', 'c14-8',
  'c14-9', 'c14-10', 'c14-11', 'c14-12',
  'c14-13', 'c14-14', 'c14-15', 'c14-16',

  'c15-5', 'c15-6', 'c15-7', 'c15-8',
  'c15-9', 'c15-10', 'c15-11', 'c15-12',
  'c15-13', 'c15-14', 'c15-15', 'c15-16',
]

const bigBlock = ['d17', 'd16', 'c17', 'c16']

const kiosk = ['g21', 'g22', 'g23', 'h23', 'h21', 'h22']

const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
</script>

<template>
  <div class="bg-zinc-900 min-h-screen flex items-center justify-center p-4">


    <div class="grid grid-cols-12 w-full max-w-sm">
      
      <div 
        v-for="(cell, cellIndex) in cells" 
        :key="cellIndex"
        class="bg-transparent flex items-center justify-center text-transparent hover:text-white text-sm aspect-square border-1 border-purple-950"
        @click="handleCreateQueuePoint(cell.row)"
      >
        <span class="absolute ">
          {{ cell.col + cell.row }}
        </span>
        <div 
          class="grid grid-cols-4 w-full gap-0.5" 
          :class="{
            'bg-zinc-700': cell.row === 1 || (cell.row >= 14  && ['a'].includes(cell.col)),
            'bg-green-900': cell.row >= 5  && ['i', 'j', 'k', 'l'].includes(cell.col) 
              || (cell.row >= 3 && cell.row <= 12) && ['a', 'b', 'c'].includes(cell.col),
            'bg-zinc-600 translate-3.5': bigBlock.includes(cell.col + cell.row),
            'bg-zinc-400': kiosk.includes(cell.col + cell.row)
          }"
        >
          <div 
            v-for="square in squares" 
            :key="square"
            :id="cell.col + cell.row + '-' + square"
            class="flex items-center justify-center text-white aspect-square "
            :class="{
              'bg-zinc-950': zigzagSquares.includes(`${cell.col + cell.row + '-' + square}`),
              'bg-zinc-600 translate-full': blocks.includes(`${cell.col + cell.row + '-' + square}`),
              'bg-indigo-900': (lastQueuePointRow >= cell.row) && isQueueCell(cell.col, cell.row)
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>