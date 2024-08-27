import React, {useEffect, useState} from 'react'
import { Route, Routes } from "react-router-dom";
import '../Universal/index.css';
import SideBar from '../BackOfficeComponents/SideBar';
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../views/auth-service";

import AuditLog from '../BackOfficeComponents/AuditLog';
import Colaborador from '../BackOfficeComponents/Colaborador';
import Cargo from '../BackOfficeComponents/Cargo'
import Cidade from '../BackOfficeComponents/Cidade'
import Categoria from '../BackOfficeComponents/Categoria'
import Subcategoria from '../BackOfficeComponents/Subcategoria';
import Post from '../BackOfficeComponents/Post'
import Estatistica from '../BackOfficeComponents/Estatisticas';

export default function BackOffice(){
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
        console.log("ab")
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
    
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        if (!currentUser) {
            navigate('/');
        } else if (location.pathname === '/backoffice') {
            navigate('estatistica');
        }
    }, [navigate]);

    return(
        <div className="container-fluid backoffice" style={{display: "flex"}}>
                <SideBar></SideBar>
                <Routes>
                    <Route path='auditlog' element={<AuditLog></AuditLog>}>
                    </Route>
                    <Route path='colaboradores' element={<Colaborador></Colaborador>}>
                    </Route>
                    <Route path='cargos' element={<Cargo></Cargo>}>
                    </Route>
                    <Route path='cidades' element={<Cidade></Cidade>}>
                    </Route> 
                    <Route path='categoria' element={<Categoria></Categoria>}>
                    </Route> 
                    <Route path='subcategoria' element={<Subcategoria></Subcategoria>}>
                    </Route> 
                    <Route path='post' element={<Post></Post>}>
                    </Route>
                    <Route path='estatistica' element={<Estatistica></Estatistica>}>
                    </Route>
                </Routes>
        </div>
    )
}