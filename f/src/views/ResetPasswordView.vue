<template>
	<main>
		<div class="pt-20"></div>
		<div class="border border-gray-300 rounded-lg lg:w-4/12 md:w-6/12 w-8/12 m-auto p-4 flex flex-col relative">
			<h2 class="text-center">Reset your password</h2>
			<p class="text-red-500 text-center text-xs">{{ errors }}</p>
			<p class="text-green-500 text-center text-xs mb-2">{{ success }}</p>
			<hr>
			<p class="text-center text-xs text-gray-500 mt-1">If an account exist for this address, a link will be sent to your email to reset your password.</p>
			<label class="mt-4 text-sm text-gray-700">Your email:</label>
			<input v-model="username" type="text" class="bg-gray-100 rounded-lg px-2 py-1">
			
			
			<button @click="login()" class="bg-green-500 hover:bg-green-400 rounded-lg my-4 text-white py-1">Reset password</button>
			<router-link class="text-blue-600 hover:text-blue-900 underline" to="/register">Set up a new account</router-link>
			
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
let success = ref('');

const login = () => {
	axios.post(import.meta.env.VITE_API_URL + "/user/reset-password", {
		identifier: username.value,
		password: password.value,
	})
		.then((response) => {
			success.value = "An email has been sent to your address.";
		})
		.catch((error) => {
			console.log(error);
			errors.value = "Connexion error. Please try again later."
		});
};
</script>