import {defineStore} from 'pinia'
import {ref} from 'vue'


export const useData = defineStore('data', ()=>{
    const username = ref('')
    const iphone = ref('')
    const avator = ref('')
    const email = ref('')


    return {
        username,
        iphone, 
        avator,
        email
    }
},{persist: true});