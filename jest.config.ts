export default {
    preset: 'ts-jest',
    rootDir: process.cwd(),
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    transform: {
                        optimizer: {
                            globals: {
                                vars: {
                                    'import.meta.env.VITE_GRAPHQL_URL':
                                        "'https://kf9p4bkih6.execute-api.eu-west-1.amazonaws.com/dev'",
                                },
                            },
                        },
                        react: {
                            runtime: 'automatic',
                        },
                    },
                },
            },
        ],
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['./node_modules/', 'cypress'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
