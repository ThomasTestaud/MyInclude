<template>
	<main>
		<div class="card lg:w-4/12 md:w-6/12 w-8/12 m-auto p-4 flex flex-col relative top-[20vh] shadow-lg">
			<h1 class="text-center mb-2 text-lg font-semibold">MyInclude</h1>
			<h2 class="text-center mb-2">Connectez-vous à votre compte</h2>

			<p class="text-red-500 text-center text-xs mb-2">{{ errors }}</p>

			<hr>

			<label class="mt-4 text-sm text-gray-700">Votre adresse email :</label>
			<input v-model="username" type="text" class="bg-gray-100 rounded-lg px-2 py-1">

			<label class="mt-4 text-sm text-gray-700">Votre mot de passe :</label>
			<input v-model="password" type="password" class="bg-gray-100 rounded-lg px-2 py-1">

			<!--

				<div class="mt-4 text-sm text-gray-700 flex align-center">
					<input v-model="rememberMe" type="checkbox" class="b-gray-400 mr-1 cursor-pointer">
					<label>Rester connecté sur cet appareil</label>
				</div>
			-->

			<button @click="login()" class="btn-1 mt-4">Se connecter</button>

		</div>
	</main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'

const router = useRouter();
let username = ref('');
let password = ref('');
let errors = ref('');
let rememberMe = ref(false);


// Access the user store
const userStore = useUserStore()

// Define the login function
const login = async () => {
  await userStore.login(username.value, password.value)
  if (userStore.auth) {
    // Login successful
    console.log("Login Successful", userStore.user)
    // Redirect or perform other actions post login
	router.push(`/dashboard/${userStore.user.id}`);
  } else {
    // Handle login failure
    console.log("Login Failed")
  }
}

</script>