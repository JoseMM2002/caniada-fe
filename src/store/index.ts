import { defineStore } from 'pinia'
import { instance } from '@/plugins/axios'

export class User {
  email:string
  user_type:string
  name:string
  token:string
  constructor(name= "",user_type= "",email= "",token= ""){
    this.email = email
    this.user_type = user_type
    this.name = name
    this.token = token
  }
}

export const useUserStore = defineStore('token', {
  state: () => ({user: new User()}),
  getters: {
    get_user: (state) => state.user,
    auth_token: async (state) => {
      try {
        const response = await instance.get("/user/bytoken/",{params: {token: state.user.token}})
        const data = response.data
        const message = data.message
        const status = data.status
        if(status == "Success"){
          return true
        }
      } catch (error) {
        console.log(error)
      }
      state.user = new User()
      return false
    },
  },
  actions: {
    put_user(user:User){
      this.user = user
    },
    async userFromLocal(){
      try {
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")
        const user_type = localStorage.getItem("user_type")
        const name = localStorage.getItem("name")
        this.user = new User( 
          name ? name:"", 
          user_type ? user_type:"", 
          email ? email:"", 
          token ? token:"", 
        )
      } catch (error) {
        this.user = new User
      } 
    },
    userToLocal(){
      localStorage.setItem("token", this.user.token)
      localStorage.setItem("email", this.user.email)
      localStorage.setItem("user_type", this.user.user_type)
      localStorage.setItem("name", this.user.name)
    }
  },
})

export const useChatStore = defineStore('chat', {
  state: () => ({onChat: {}, info: {}}),
  getters: {
    get_onChat: (state) => state.onChat,
    get_info: (state) => state.info,
  },
  actions: {
    put_onChat(onChat:object){
      this.onChat = onChat
    },
    put_info(info:object){
      this.info = info
    },
  },
})
