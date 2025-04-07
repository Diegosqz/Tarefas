import {defineStore} from 'pinia'


export const useAuthStore = defineStore('auth',{
	state:()=> ({
	token: localStorage.getItem('token')||'',
	user:null,
}),
actions:{
  setToken(token) {
this.token = token
localStorage.setItem('token',token)
},
clearAuth(){
this.token = ''
this.user = null
localStorage.removeItem('token')
},
})

