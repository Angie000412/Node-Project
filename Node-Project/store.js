/* import {createStore} from 'vuex';
import login from './pages/login.vue'
import login from ''
import axios from 'axios';

export default createStore({
 state:{
    token:null
 },
 mutations:{
    setToken(state,payload){
        state.token=payload
    }
 },
 actions:{
 async  login({commit}, usuario){
console.log(usuario);
// 😫
try {
  const res = await fetch ('http://localhost:1337/api/auth/local',{ 
   method:'post',
   headers:{
      'Content-Type':'aplication/json'
   },
   body: JSON.stringify(usuario)
  }) 
      const resDB=   await res.json() 
      console.log(resDB);         
               }
                catch(error) {
                   console.log(error);
                   
               }
           },
           reload(){
   location.reload()
 }

   
 },
 modules:{
    
 }

})
 */