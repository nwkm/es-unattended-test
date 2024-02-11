import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    e2e: {
        video: false,
        baseUrl: 'http://localhost:3301',
        env: {
            gqUrl: process.env.VITE_GRAPHQL_URL,
        },
        setupNodeEvents() {
            // implement node event listeners here
        },
    },
});
