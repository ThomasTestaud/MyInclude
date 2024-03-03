import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api', {
    state: () => ({
    }),
    actions: {
        async get(route) {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + route,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token'),
                        },
                    })
                if (response.status == 200) {
                    return response.data;
                }
                return false;
            } catch (error) {
                console.error(error)
                return false;
            }
        },

        async post(route, data) {
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + route, data, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token'),
                    },
                });
                if (response.status === 200) {
                    return response.data;
                }
                return false;
            } catch (error) {
                console.error(error);
                return false;
            }
        }

    }
})
