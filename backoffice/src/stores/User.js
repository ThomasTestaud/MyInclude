import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

export const useUserStore = defineStore('user', {
  state: () => ({
    auth: false,
    token: '',
    user: {}
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/user/login', { email, password })
        if (response.status == 200) {
          console.log(response.data)
          this.token = response.data.token
          this.auth = true
          this.user = response.data.user
          localStorage.setItem('token', this.token)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      this.auth = false
      this.token = ''
      this.user = {}
      localStorage.removeItem('token')
    },
    async refreshToken() {
      this.token = localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user/refresh-token',
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
        if (response.status == 200) {
          this.token = response.data.token
          this.auth = true
          this.user = response.data.user
          localStorage.setItem('token', this.token)
          console.log(response.data)
          return true;
        }
        router.push('/login');
        return false;
      } catch (error) {
        console.error(error);
        router.push('/login');
        return false;
      }
    }
  }
})
