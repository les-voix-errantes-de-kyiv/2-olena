/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			'text': 'GothamBook',
			'title': 'Gotham-Black',
		},
		extend: {
			colors: {
				'turquoise': '#00AEC7',				
				'yellow': '#FCD56C',
				'purple': '#A880DA',
				'blue': '#023785',
				'white': '#FFFFFF',
				'black': '#1E1E1E',
				'orange': '#FF8A35',
			  },
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
