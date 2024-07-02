import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../Universal/index.css'
import axios from 'axios';
import authHeader from '../views/auth-header';
import authService from '../views/auth-service';

export default function LoginInput(){
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
                    navigate('mainpage');
                }
            })
            .catch(err => {
                alert('Autenticação falhou')
                setmessage('Autenticação falhou');
                setloading(false);
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
