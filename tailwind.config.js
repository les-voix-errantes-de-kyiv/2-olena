/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
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
