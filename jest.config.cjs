module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: [
		'**/tests/**/*.test.ts'
	],
	collectCoverageFrom: [
		'library/**/*.ts',
		'!library/**/*.test.ts'
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	}
};
