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
        if(document.readyState === "complete"){
            changeTheme(1)
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