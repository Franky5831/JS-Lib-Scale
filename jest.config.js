module.exports = {
	testEnvironment: 'jsdom',
	testMatch: [
		'**/tests/**/*.test.js'
	],
	collectCoverageFrom: [
		'library/**/*.js',
		'!library/**/*.test.js'
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
