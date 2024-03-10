import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'


export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    api: useApiStore(),
    loading: true,
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
    scores: [],
  }),
  actions: {
    async getDashboard(userId) {
      this.loading = true;
      this.api.get('/dashboard/' + userId).then((response) => {
        console.log(response);
        response.user ? this.user = response.user : this.user = this.user;
        response.relations ? this.relations = response.relations : this.relations = [];
        response.tasks ? this.tasks = response.tasks.filter(task => task.done_date === null) : this.tasks = [];
        response.scores ? this.scores = response.scores : this.scores = [];
        
        this.loading = false;
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
