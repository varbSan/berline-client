
import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: process.env.VITE_API_URL,
  documents: ["src/**/*.query.ts", "src/**/*.mutation.ts", "src/**/*.subscription.ts"],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
