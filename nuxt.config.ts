// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	head: {
	    link: [
	      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
	    ]
	},
	modules: ['@nuxtjs/tailwindcss'],
	buildModules: ['@nuxtjs/composition-api'],
})
