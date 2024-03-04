import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'


export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    api: useApiStore(),
    user: {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      position: '',
      Role: {
        name: ''
      },
    },
  }),
  actions: {
    async getDashboard(userId) {
      this.api.get('/dashboard/' + userId).then((response) => {
        this.user = response.user
        console.log(response.user)
      })
    },

  }
})
