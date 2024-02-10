import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        env: {
            gqUrl: process.env.VITE_GRAPHQL_URL,
        },
        setupNodeEvents() {
            // implement node event listeners here
        },
    },
});
