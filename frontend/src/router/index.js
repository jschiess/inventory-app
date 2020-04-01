import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/',
		name: 'dashboard',
		component: () => import('../views/Dashboard.vue')
	},
	{
		path: '/inventory/:itemsClass?',
		name: 'Inventory',
		component: () => import('../views/Inventory.vue')
	},
	{
		path: '/lendings',
		name: 'lendings',
		component: () => import('../views/Lendings.vue')
	},
	{
		path: '/newMaterial',
		name: 'newMaterial',
		component: () => import('../views/NewMaterial.vue')
	},
	// {
	// 	path: '/test/:itemsClass?',
	// 	name: 'test',
	// 	component: () => import('../views/Test.vue')
	// }
]





const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})


// routeguarding
router.beforeEach((to, from, next) => {
	// var kek = true
	// const routes = ['', 'inventory', 'lendings', '/', 'newMaterial', 'login',]
	// pages accessable to everyone
	const publicPages = ['/login']
	// teacher routes
	const teacherRoutes = ['/newMaterial']
	// if a page is not in the public pages array, it requires login
	const authRequired = !publicPages.includes(to.path);
	// checks if the user is loggedIn
	const loggedIn = store.state.loggedIn
	// checks if the user is a teacher
	const isTeacher = store.getters.isTeacher

	// if the user is not logged in and if authorization is required

	if (authRequired && !loggedIn) {
		console.log('authRequired && !loggedIn');
		// send user to login page
		return next('/login')
		// or if the user is logged in and is going to the login page
	} else if (loggedIn && to.path === '/login') {
		console.log('loggedIn && to.path === login');

		// it redirects him to the dashboard
		next('/')
		// if not a teacher and trying to access teacher route
	} else if (!isTeacher && teacherRoutes.includes(to.path)) {
		console.log('!isTeacher && teacherRoutes.includes(to.path)');

		next(from.path)
	} else {
		next();
	}
})


export default router
