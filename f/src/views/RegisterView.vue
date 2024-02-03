<template>
	<main>
		<div class="pt-8"></div>
		<div class="border border-gray-300 rounded-lg lg:w-4/12 md:w-6/12 w-8/12 m-auto p-4">
			<!-- Formulaire de connexion -->
			<div class="flex flex-col">
				<h2 class="text-center mb-2">Create a new account</h2>
				<p class="text-red-500 text-center text-xs">{{ errors }}</p>
				<hr>
				<label class="mt-4 text-sm text-gray-700">Username:</label>
				<input v-model="username" type="text" class="bg-gray-100 rounded-lg px-2 py-1">
				
				<label class="mt-4 text-sm text-gray-700">Email:</label>
				<input v-model="email" type="text" class="bg-gray-100 rounded-lg px-2 py-1">
				
				<label class="mt-4 text-sm text-gray-700">Password:</label>
				<input v-model="password" type="password" class="bg-gray-100 rounded-lg px-2 py-1">
				
				<label class="mt-4 text-sm text-gray-700">Confirm your password:</label>
				<input v-model="confirmPassword" type="password" class="bg-gray-100 rounded-lg px-2 py-1">

				<div class="mt-4 text-sm text-gray-700 flex align-center">
					<input v-model="rememberMe" type="checkbox" class="b-gray-400 mr-1 cursor-pointer">
					<label>Remember me</label>
				</div>

				<button @click="verifyPassword()"  class="bg-green-500 hover:bg-green-400 rounded-lg mt-2 mb-4 text-white py-1">Register</button>
				
				<router-link class="text-blue-600 hover:text-blue-900 underline" to="/login">I already have an account</router-link>

				<router-link to="/reset-password" class="text-right text-xs text-gray-500 hover:text-gray-700 underline">
					<span>I forgot my password </span>
					<i class="fa-solid fa-question p-1 rounded-xl w-5 h-5 bg-indigo-500 hover:bg-indigo-600 text-white text-center"></i>
				</router-link>
			</div>
			
		</div>
	</main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
let email = ref('');
let username = ref('');
let password = ref('');
let confirmPassword = ref('');
let errors = ref('');
let rememberMe = ref(false);

const login = () => {
	axios.post(import.meta.env.VITE_API_URL + "/user/register", {
		email: email.value,
		username: username.value,
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
		});
};

const verifyPassword = () => {
	if (password.value !== confirmPassword.value) {
		errors.value = "The two passwords must be identical.";
	} else {
		errors.value = "";
		login();
	}
}
</script>