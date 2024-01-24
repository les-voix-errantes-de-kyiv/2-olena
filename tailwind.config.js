/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			text: [
				'GothamBook',
				'ui-sans-serif',
				'system-ui',
				' sans-serif',
				"'Apple Color Emoji'",
				"'Segoe UI Emoji'",
				"'Segoe UI Symbol'",
				"'Noto Color Emoji'"
			],
			title: [
				'Gotham-Black',
				'ui-sans-serif',
				'system-ui',
				' sans-serif',
				"'Apple Color Emoji'",
				"'Segoe UI Emoji'",
				"'Segoe UI Symbol'",
				"'Noto Color Emoji'"
			]
		},
		colors: {
			turquoise: '#00AEC7',
			yellow: '#FCD56C',
			purple: {
				DEFAULT: '#A880DA',
				dark: '#916CBF'
			},
			blue: '#023785',
			white: '#FFFFFF',
			black: '#1E1E1E',
			orange: '#FF8A35',
			gray: '#888888'
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '0.5rem',
				md: '2rem'
			}
		}
	},
	plugins: []
};
