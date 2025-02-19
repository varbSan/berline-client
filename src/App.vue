<script setup lang="ts">
import { ref } from 'vue';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
import { Button } from '@/components/ui/button'
// Correct GraphQL query for graphqlzero.almansi.me
const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
      }
    }
  }
`;

interface Post {
  id: number;
  title: string;
}

interface QueryResponse {
  posts: {
    data: Post[];
  };
}

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

const data = ref<QueryResponse>({ posts: { data: [] } });
const loading = ref(false);
const error = ref<string | null>(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await client.query<QueryResponse>({
      query: GET_POSTS,
    });
    data.value = response.data;
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-2">GraphQL Data Fetch (Vue 3 + Apollo Client)</h1>
    <Button @click="fetchData" class="cursor-pointer">
      Fetch Data
    </Button>

    <div v-if="loading" class="text-gray-600">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <ul v-if="data.posts?.data">
      <li v-for="post in data.posts.data" :key="post.id" class="my-1">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>
