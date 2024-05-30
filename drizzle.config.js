import { defineConfig } from 'drizzle-kit';
import '@/app/db/envConfig';
 
export default defineConfig({
  dialect: "postgresql",
  driver: "libsql",
  schema: './src/app/db/schema.js',
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
