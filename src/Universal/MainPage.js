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
    useEffect(() => {
        // This will execute when the entire page, including all dependent resources, has loaded
        const handleLoad = () => {
            changeTheme(1);
        };

        window.addEventListener('load', handleLoad);

        // Cleanup to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    function changeTheme(props){
        let theme = localStorage.getItem("theme");
        const isDarkMode = document.documentElement.classList.contains("darkmode");
        if(!theme && props == 1){
            if(!isDarkMode){
                localStorage.setItem("theme", JSON.stringify("light"));
            }
            else if(isDarkMode){
                localStorage.setItem("theme", JSON.stringify("dark"));
            }
        }
        theme = localStorage.getItem("theme");
        if(theme){
            theme = JSON.parse(theme);
            if(props === 2){
                if(theme == "light" && !isDarkMode){
                    localStorage.setItem("theme", JSON.stringify("dark"));
                }
                else if(theme == "dark" && isDarkMode){
                    localStorage.setItem("theme", JSON.stringify("light"));
                }
                document.documentElement.classList.toggle("darkmode");
            }
            else if(props == 1){
                if(theme === "dark" && !isDarkMode){
                    document.documentElement.classList.toggle("darkmode");
                }
                else if(theme == "light" && isDarkMode){
                    document.documentElement.classList.toggle("darkmode");
                }
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
                        <Route path='microsite' element={<ProfilePage></ProfilePage>}>
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