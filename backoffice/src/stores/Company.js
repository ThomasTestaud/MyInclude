import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'


export const useCompanyStore = defineStore('company', {
  state: () => ({
    api: useApiStore(),
    companies: [],
    company: {
      id: 0,
      name: '',
      avatar: '',
      email: '',
      address: '',
      phone: '',
      employees: [],
    },
  }),
  actions: {
    async getCompanies() {
      try {
        const response = await this.api.get('/company')
        if (response) {
          this.companies = response
          //console.log(response)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async getCompany(id) {
      try {
        const response = await this.api.get('/company/' + id)
        if (response) {
          //console.log(response)
          this.company = response;
          this.company.employees = response.Users
        }
      } catch (error) {
        console.error(error)
      }
    },

    async createCompany(data) {
      try {
        const response = await this.api.post('/company', data)
        if (response) {
          this.companies.push(response);
        }
      } catch (error) {
        console.error(error)
      }
    },

    async createEmployee(data) {
      try {
        data.company_id = this.company.id
        console.log(data)
        const response = await this.api.post('/user/register', data)
        if (response) {
          console.log(response)
          this.company.employees.push(response);
        }
      } catch (error) {
        console.error(error)
      }
    },

    async uploadAvatar(event) {
      try {
        const route = '/company/avatar/' + this.company.id;
        const response = await this.api.uploadPhoto(route, event);
        
        if (response) {
          this.company.avatar = response;
        } else {
          console.error('Error uploading photo');
        }
        
      } catch (error) {
        console.error(error);
      }
    }
  }
})
