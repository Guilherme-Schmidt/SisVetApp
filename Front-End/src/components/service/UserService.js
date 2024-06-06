import axios from "axios";

class UserService {
    static BASE_URL = "http://localhost:8080";
  
    static async login(email, password) {
        try {
          const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { email, password });
          console.log("Login response data:", response.data); // Log para verificar a resposta do backend
          return response.data;
        } catch (err) {
          if (err.response && err.response.data) {
            console.error("Login error data:", err.response.data); // Log para verificar o erro
            throw new Error(err.response.data.message || "Erro na autenticação");
          } else {
            console.error("Network or server error:", err); // Log para erros de rede
            throw new Error("Erro de rede ou servidor indisponível");
          }
        }
      }
  
    static async register(userData, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllClientes(token) {
        try {
            const response = await axios.get(
                `${UserService.BASE_URL}/listarClientes`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
       
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

   

}

export default UserService;