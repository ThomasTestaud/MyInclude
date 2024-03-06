import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'


export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    api: useApiStore(),
    user: {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      avatar: null,
      position: null,
      role: null,
    },
    relations: [],
    tasks: [],
  }),
  actions: {
    async getDashboard(userId) {
      this.api.get('/dashboard/' + userId).then((response) => {
        if (response.user) {
          this.user = response.user
        }
        if (response.relations) {
          this.relations = response.relations
        }
        if (response.tasks) {
          this.tasks = response.tasks
        }
        console.log(response)
      })
    },

    async updateAvatar(route, event) {
      const response = await this.api.uploadPhoto(route, event);
      if (response) {
        this.user.avatar = response;
      }
    },

    verifyUserNotNull() {
      const values = Object.values(this.user);
      for (let i = 0; i < values.length; i++) {
        if (values[i] === null) {
          return false;
        }
      }
      return true;
    }

  }
})
