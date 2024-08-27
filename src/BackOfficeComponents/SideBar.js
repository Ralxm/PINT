import React from 'react'
import '../Universal/index.css'
import * as lang from '../Universal/lang.json';

export default function SideBar(){
    window.addEventListener('load', changeTheme(1));
    let theme = localStorage.getItem("theme");
    if(theme){
        if(JSON.parse(theme) == "dark"){
            changeTheme(1);
        }
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


    let stolang = localStorage.getItem("lang");
    if (!stolang) {
        stolang = "pt";
        localStorage.setItem("lang", JSON.stringify(stolang));
    } else {
        stolang = JSON.parse(stolang);
    }
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];

    return(
        <div className='side-bar col-2'>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/estatistica"}>
                {data.texto1backoffice}
            </div>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/auditlog"}>
                {data.texto2backoffice}
            </div>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/colaboradores"}>
                {data.texto3backoffice}
            </div>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/cargos"}>
                {data.texto4backoffice}
            </div>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/cidades"}>
                {data.texto5backoffice}
            </div>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/categoria"}>
                {data.texto6backoffice}
            </div>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/subcategoria"}>
                {data.texto7backoffice}
            </div>
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/post"}>
                {data.texto8backoffice}
            </div>
        </div>
    )
}