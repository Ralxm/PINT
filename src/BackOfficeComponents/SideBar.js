import React, { useEffect } from 'react'
import '../Universal/index.css'
import * as lang from '../Universal/lang.json';

export default function SideBar(){
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
            <div className='col-lg-12 backoffice-option' onClick={() => window.location= "#/backoffice/denuncias"}>
                {data.texto31backoffice}
            </div>
        </div>
    )
}