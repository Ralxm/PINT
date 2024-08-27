import NavigationBar from "./Nav";
import LoginInput from "../LoginComponents/Login";
import Footer from './Footer';
import React, {useEffect} from 'react'
import ImagemLogin from "../LoginComponents/ImagemLogin";
import { Route, Routes } from "react-router-dom";
import BackOffice from "../BackOffice/BackOffice";
import authService from "../views/auth-service";
import { useNavigate } from "react-router-dom";
import Main from '../MainPageComponents/PaginaPrincipal'
import Post from '../PostComponents/Post'
import ProfilePage from '../ProfilePageComponents/ProfilePage'


export default function MainPage() {
    if(document.readyState === "complete"){
        changeTheme(1)
    }

    function changeTheme(props){
        let theme = localStorage.getItem("theme");
        if(!theme){
            let whatTheme = "dark";
            localStorage.setItem("theme", JSON.stringify(whatTheme));
            document.documentElement.classList.toggle("darkmode");
        }
        else{
            theme = JSON.parse(theme);
            if(theme == "dark"){
                if(props == 2){
                    localStorage.removeItem("theme")
                }
                document.documentElement.classList.toggle("darkmode");
            }
        }
    }
    
        return (
            <div>
                <NavigationBar></NavigationBar> 
                    <Routes>
                        <Route path='/' element={<LoginPage></LoginPage>}>
                        </Route>
                        <Route path='mainpage' element={<PaginaPrincipal></PaginaPrincipal>}>
                        </Route>
                        <Route path='post/:id' element={<Publicacao></Publicacao>}>
                        </Route>
                        <Route path='backoffice/*' element={<BackOffice></BackOffice>}>
                        </Route>
                        <Route path='profile/:id' element={<ProfilePage></ProfilePage>}>
                        </Route>
                    </Routes>
                <Footer></Footer>
            </div>
        )
}

function LoginPage() {
    let user = authService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate('mainpage');
        }
    }, [user, navigate]);

    if(!user){
        return (
            <div className="container-fluid">
                <div className="row">
                    <LoginInput></LoginInput>
                    <ImagemLogin></ImagemLogin>
                </div>
            </div>
        )
    }
}

function PaginaPrincipal() {
    let user = authService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    }, [user, navigate]);

    if(user){
        return (
            <div className="container-fluid">
                <div className="row">
                    <Main></Main>
                </div>
            </div>
        )
    }
}

function Publicacao(){
    let user = authService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="container-fluid">
            <div className="row">
                <Post></Post>
            </div>
        </div>
    )
}