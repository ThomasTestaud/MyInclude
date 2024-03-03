import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'


export const useCompanyStore = defineStore('company', {
  state: () => ({
    api: useApiStore(),
    companies: [],
    company: {
      id: 0,
      name: '',
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
        }
      } catch (error) {
        console.error(error)
      }
    },

    async getCompany(id) {
      try {
        const response = await this.api.get('/company/' + id)
        if (response) {
          console.log(response)
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
    }
  }
})
