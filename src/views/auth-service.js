import axios from 'axios';

class AuthService{
    login(email, password){
        return axios.post('https://pint-backend-8vxk.onrender.com/colaborador/login', {email, password, headers: { 'Authorization' : 'Bearer ESTGV'}})
        .then(res => {
            if(res.data.token){
                localStorage.setItem('user', JSON.stringify(res.data));   
                localStorage.setItem("id", JSON.stringify(res.data.id));
                localStorage.setItem("cargo", JSON.stringify(res.data.cargo));
                localStorage.setItem("cidade", JSON.stringify(res.data.cidade));
            }
            return res.data;
        }, reason => {throw new Error('Utilizador Inválido');});
    }
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('cargo');
        localStorage.removeItem('cidade');
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();