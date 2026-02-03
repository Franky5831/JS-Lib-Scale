import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
	// JavaScript bundle
	{
		input: 'library/main.ts',
		output: {
			file: 'dist/main.js',
			format: 'umd',
			name: 'ButtonScaleLib',
			banner: `/**
 * Button Scale Library
 * A JavaScript library for adding pixel-based scale animations to buttons
 *
 * @author Francesco Ciannavei
 * @license MIT
 * @version 1.0.2
 *
 * @see {@link https://github.com/Franky5831/JS-Lib-Scale|GitHub Repository}
 * @see {@link https://franky5831.github.io/JS-Lib-Scale/|Documentation}
 */`,
			exports: 'named',
			footer: 'if (typeof window !== "undefined") { window.ButtonScale = ButtonScaleLib.default || ButtonScaleLib.ButtonScale; }'
		},
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
				declaration: false
			})
		]
	},
	// TypeScript declarations
	{
		input: 'library/main.ts',
		output: {
			file: 'dist/main.d.ts',
			format: 'es'
		},
		plugins: [dts()]
	}
];
