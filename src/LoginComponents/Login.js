import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../Universal/index.css'
import axios from 'axios';
import authHeader from '../views/auth-header';
import authService from '../views/auth-service';

export default function LoginInput(){
        let stolang = localStorage.getItem("lang");
        if (!stolang) {
            stolang = "pt";
            localStorage.setItem("lang", JSON.stringify(stolang));
        } else {
            stolang = JSON.parse(stolang);
        }
        const url = "https://pint-backend-8vxk.onrender.com/";
        const [Colaboradores, setColaboradores] = useState([]);

        const [EMAIL, setEMAIL] = useState("");
        const [PASSWORD, setPASSWORD    ] = useState("");
        const [loading, setloading] = useState(false);
        const [message, setmessage] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
            document.title = 'Login';
        }, []);

        function HandleLogin(event){
            event.preventDefault();
            setmessage('');
            setloading(true);
            authService.login(EMAIL, PASSWORD)
            .then(res => {
                if(res === "" || res === false){
                    setmessage('Autenticação falhou');
                    setloading(false);
                }
                else{
                    if(res.cargo == 1){
                        logLogin(EMAIL)
                        localStorage.setItem("theme", JSON.stringify("light"));
                        navigate('mainpage');
                    }
                    else{
                        alert('Website não está disponibilizado para utilizadores normais')
                    }
                }
            })
            .catch(err => {
                alert('Autenticação falhou')
                setmessage('Autenticação falhou');
                setloading(false);
            })
        }

        function logLogin(){
            let id = JSON.parse(localStorage.getItem('id'));
            let now = new Date();
            let dd = now.getDate();
            let mm = now.getMonth() + 1;
            let yyyy = now.getFullYear();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            let today = `${yyyy}-${mm}-${dd}`;
            const datapost = {
                IDCONTA: id,
                TIPOATIVIDADE: 'Login',
                DATA: today,
                DESCRICAO: 'Conta com id ' + id + ' efetuou login.'
            }
            axios.post(url + 'auditlog/create', datapost)
            .then(function(data){

            })
            .catch(err =>{
                alert("Erro a inserir audit log de login");
            })
        }

        return (
            <div className='col-lg-5 col-sm-12 big-login-box'>
                <div className='login-text-div'>
                    <span>Login</span>
                </div>
                <div className='email-div'>
                    <input type='email' id='email-login' class='login-box' placeholder='  email' value={EMAIL} onChange={(value) => setEMAIL(value.target.value)}></input>
                </div>
                <div className='password-div'>
                    <input type='password' id='password-login' class='login-box' placeholder='  password' value={PASSWORD} onChange={(value) => setPASSWORD(value.target.value)}></input>
                </div>
                <div className='login-button-div'>
                    <input type='submit' id='login' class='login-button' value="Entrar" onClick={HandleLogin}></input>
                </div>
                <div className='login-separador'>
                    <div className='separador'>

                    </div>
                    <div className='separador-text'>
                        <span>Ou continuar com</span>
                    </div>
                    <div className='separador'>

                    </div>
                </div>
                <div className='google-login'>
                    <input type='submit' id='login' class='login-button-exterior' value="Entrar com Google"></input>
                </div>
                <div className='facebook-login'>
                    <input type='submit' id='login' class='login-button-exterior' value="Entrar com Facebook"></input>
                </div>
            </div>
        )
}
