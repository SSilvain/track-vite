// [vitePugPlugin()]
// vite.config.js

// import glob from 'glob';
import Inspect from 'vite-plugin-inspect'
import vitePugPlugin from 'vite-plugin-pug-transformer';
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import pxtorem from 'postcss-pxtorem'

export default defineConfig({
	root: 'src',
	build: {
		// rollupOptions: {
		// 	input: glob.sync('./src/*.html'),
		// },
		outDir: '../dist',
	},
	plugins: [
		vitePugPlugin(),
		// legacy({
		// 	targets: ['defaults', 'not IE 11'],
		// }),
		// Inspect()
	],
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			scss: {}
		},
		postcss: {
			plugins: [

				// autoprefixer(),
				// pxtorem({
				// 	rootValue: 16,
				// 	unitPrecision: 5,
				// 	propList: ['*'],
				// 	selectorBlackList: [],
				// 	replace: true,
				// 	mediaQuery: false,
				// 	minPixelValue: 0,
				// 	exclude: /node_modules/i
				// })
			]
		},
	}
})