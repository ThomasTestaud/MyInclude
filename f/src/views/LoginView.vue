<template>
	<main>
		<div class="pt-12"></div>
		<div class="border border-gray-300 rounded-lg lg:w-4/12 md:w-6/12 w-8/12 m-auto p-4 flex flex-col relative">
			<h2 class="text-center mb-2">Log into your account</h2>

			<p class="text-red-500 text-center text-xs mb-2">{{ errors }}</p>

			<hr>

			<label class="mt-4 text-sm text-gray-700">Email or Username:</label>
			<input v-model="username" type="text" class="bg-gray-100 rounded-lg px-2 py-1">

			<label class="mt-4 text-sm text-gray-700">Password:</label>
			<input v-model="password" type="password" class="bg-gray-100 rounded-lg px-2 py-1">

			<div class="mt-4 text-sm text-gray-700 flex align-center">
				<input v-model="rememberMe" type="checkbox" class="b-gray-400 mr-1 cursor-pointer">
				<label>Remember me</label>
			</div>

			<button @click="login()" class="bg-green-500 hover:bg-green-400 rounded-lg my-4 text-white py-1">Login</button>

			<router-link class="text-blue-600 hover:text-blue-900 underline" to="/register">Or set up an
				account</router-link>

			<router-link to="/reset-password" class="text-right text-xs text-gray-500 hover:text-gray-700 underline">
				<span>I forgot my password </span>
				<i
					class="fa-solid fa-question p-1 rounded-xl w-5 h-5 bg-indigo-500 hover:bg-indigo-600 text-white text-center"></i>
			</router-link>
		</div>
	</main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
let username = ref('');
let password = ref('');
let errors = ref('');
let rememberMe = ref(false);

const login = () => {
	axios.post(import.meta.env.VITE_API_URL + "/user/login", {
		identifier: username.value,
		password: password.value,
	})
		.then((response) => {
			if (response.data.token) {

				if (rememberMe.value) {
					localStorage.setItem("token", response.data.token);
				}
				sessionStorage.setItem("token", response.data.token);

				router.push(`/`);
			}
		})
		.catch((error) => {
			console.log(error);
			errors.value = "Connexion error. Please try again later."
			if (error.response.status === 400) {
				errors.value = "Invalid email or password.";
			} else if (error.response.status === 500) {
				errors.value = "Server error. Please try again later."
			} else {
				errors.value = "Unknown error. Please try again later."
			}
		});
};
</script>