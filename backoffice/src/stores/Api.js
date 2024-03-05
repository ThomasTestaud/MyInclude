import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api', {
    state: () => ({
        url: import.meta.env.VITE_API_URL,
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
        },

        async patch(route, data) {
            try {
                const response = await axios.patch(import.meta.env.VITE_API_URL + route, data, {
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
        },

        async uploadPhoto(route, event) {
            const file = event.target.files[0]; // Get the file from the input

            // Prepare the file to be sent
            let formData = new FormData();
            formData.append('photo', file);

            try {
                const url = import.meta.env.VITE_API_URL + route;
                console.log(url);
                const response = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "Bearer " + localStorage.getItem('token'),
                    },
                });

                return response.data;
            } catch (error) {
                console.error('Error uploading file', error);
                return false;
            }
        },

    }
})
