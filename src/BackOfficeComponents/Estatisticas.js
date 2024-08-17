import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import authHeader from '../views/auth-header';

export default function Estatistica(){
    const urlColaborador = "https://pint-backend-8vxk.onrender.com/colaborador/";
    const urlCidade = "https://pint-backend-8vxk.onrender.com/cidade/";
    const urlPost = "https://pint-backend-8vxk.onrender.com/post/";

    const [Colaborador, setColaborador] = useState([]);
    const [ColaboradorCargo, setColaboradorCargo] = useState([]);
    const [NomeCidade, setNomeCidade] = useState([]);
    const [NomeCargo, setNomeCargo] = useState([]);
    const [Post, setPost] = useState([]);

    const [Utilizador, setUtilizador] = useState([]);
    
    useEffect(() => {
        document.title = 'Mostrar Audit Log';

        axios.get(urlCidade + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setNomeCidade(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get('https://pint-backend-8vxk.onrender.com/cargo/list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setNomeCargo(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get('https://pint-backend-8vxk.onrender.com/colaborador_cargo/list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setColaboradorCargo(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        loadEstatistica();
    }, []);

    function loadEstatistica(){
        let id = JSON.parse(localStorage.getItem('id'));
        let token;
        try{
            let user = localStorage.getItem('user');
            let userData = JSON.parse(user);
            token = userData.token;
        }
        catch{
            console.log("Erro a ir buscar o token");
        }
        axios.get(urlColaborador + 'list', authHeader())
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setColaborador(data);
            }
            else{
                alert("Erro Web Service!");
            }
        })
        .catch(error => {
            alert("Erro " + error);
        }); 

        axios.get(urlColaborador + 'get/' + id, authHeader())
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setUtilizador(data);
            }
            else{
                alert("Erro Web Service!");
            }
        })
        .catch(error => {
            alert("Erro " + error);
        }); 

        axios.get(urlPost + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setPost(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })
    }

    return(
        <div className='col-10' style={{display: 'flex'}}>
            <div className='col-5 side-bar' style={{marginLeft: "10px"}}>
                <div className='col-lg-12 backoffice-option'>
                    Publicações Criadas nos Últimos 30 dias
                </div>
                <div className='col-lg-12 showTable-list' style={{overflowY: 'scroll', maxHeight: '40vh'}}>
                    <PublicacoesCriadasUltimos30Dias></PublicacoesCriadasUltimos30Dias>
                </div>
                <div className='col-lg-12 backoffice-option'>
                    Colaboradores Inativos
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '30vh'}}>
                    <ColaboradoresInativos></ColaboradoresInativos>
                </div>
            </div>
            <div className='col-5 side-bar' style={{marginLeft: "10px"}}>
                <div className='col-lg-12 backoffice-option' style={{overflowY: 'scroll', maxHeight: '40vh'}}>
                    Registos nos últimos 30 dias
                </div>
                <div className='col-lg-12 showTable-list'>
                    <Registos30Dias></Registos30Dias>
                </div>
                <div className='col-lg-12 backoffice-option' style={{overflowY: 'scroll', maxHeight: '30vh'}}>
                    Número de publicações por colaborador
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '30vh'}}>
                    <PostsPorColaborador></PostsPorColaborador>
                </div>
            </div>
        </div>
    )

    function ColaboradoresInativos(){
        return Colaborador.map((data, index) => {
            let cargo;
            ColaboradorCargo.map((data2) =>{
                if(data2.IDCOLABORADOR == data.IDCOLABORADOR){
                    NomeCargo.map((data3) =>{
                        if(data3.IDCARGO == data2.IDCARGO){
                            cargo = data3.NOME;
                        }
                    })
                }
            })
            let cidade;
            NomeCidade.map((data2) =>{
                if(data2.IDCIDADE == data.CIDADE){
                    cidade = data2.NOME
                }
            })
            let hoje = new Date();
            let ultimo_login = new Date(data.ULTIMOLOGIN)
            const diffTime = Math.abs(ultimo_login - hoje);
            let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
            if(diffDays >= 15 && data.CIDADE === Utilizador.CIDADE){
                return(
                    <div className='col-6 showTable'>
                        <div className='showTableText'>
                            <a>ID Colaborador: {data.IDCOLABORADOR}</a>
                            <a>Email: {data.EMAIL}</a>
                            <a>Nome: {data.NOME}</a>
                            <a>Telemovel: {data.TELEMOVEL}</a>
                            <a>Cargo: {cargo}</a>
                            <a>Cidade: {cidade}</a>
                            <a>Data do último login: {data.ULTIMOLOGIN}</a>
                        </div>
                    </div>
                )
            }
        })
    }


    function PublicacoesCriadasUltimos30Dias() {
        const [chartData, setChartData] = useState([]);
        const [totalPosts, setTotalPosts] = useState(0);
    
        useEffect(() => {
            const today = new Date();
            const past30Days = Array.from({ length: 30 }, (_, i) => {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                return date.toISOString().split('T')[0];
            }).reverse();
    
            const postsPerDay = past30Days.reduce((acc, date) => {
                acc[date] = 0;
                return acc;
            }, {});
    
            let totalCount = 0;
            Post.forEach(post => {
                if (post.CIDADE === Utilizador.CIDADE && post.aprovacao.APROVADA == 1) {
                    const postDate = post.DATAPUBLICACAO;
                    if (postsPerDay[postDate] !== undefined) {
                        postsPerDay[postDate]++;
                        totalCount++;
                    }
                }
            });
    
            const formattedData = Object.keys(postsPerDay).map(date => ({
                date,
                count: postsPerDay[date]
            }));
    
            setChartData(formattedData);
            setTotalPosts(totalCount);
        }, [Post, Utilizador.CIDADE]);
    
        return (
            <div>
                <LineChart
                    width={600}
                    height={300}
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
                <p>Total de Publicações: {totalPosts}</p>
            </div>
        );
    }

    function Registos30Dias() {
        const [chartData, setChartData] = useState([]);
        const [totalRegistos, setTotalRegistos] = useState(0);
    
        useEffect(() => {
            const today = new Date();
            const past30Days = Array.from({ length: 30 }, (_, i) => {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                return date.toISOString().split('T')[0];
            }).reverse();
    
            const registosPerDay = past30Days.reduce((acc, date) => {
                acc[date] = 0;
                return acc;
            }, {});
    
            let totalCount = 0;
            Colaborador.forEach(colaborador => {
                if (colaborador.CIDADE === Utilizador.CIDADE) {
                    const registoDate = colaborador.DATAREGISTO.split('T')[0];
                    if (registosPerDay[registoDate] !== undefined) {
                        registosPerDay[registoDate]++;
                        totalCount++;
                    }
                }
            });
    
            const formattedData = Object.keys(registosPerDay).map(date => ({
                date,
                count: registosPerDay[date]
            }));
    
            setChartData(formattedData);
            setTotalRegistos(totalCount);
        }, [Colaborador, Utilizador.CIDADE]);
    
        return (
            <div>
                <LineChart
                    width={600}
                    height={300}
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
                <p>Total de Registos: {totalRegistos}</p>
            </div>
        );
    }

    function PostsPorColaborador(){
        return Colaborador.map((colaborador, index) =>{
            let count = 0;
            Post.map((post, index2) =>{
                if(post.COLABORADOR == colaborador.IDCOLABORADOR){
                    count++;
                }
            })
            if(count > 0){
                return(
                    <div className='col-6 showTable'>
                        <div className='showTableText'>
                            <a>ID Colaborador: {colaborador.IDCOLABORADOR}</a>
                            <a>Email: {colaborador.EMAIL}</a>
                            <a>Nome: {colaborador.NOME}</a>
                            <a>Publições: {count}</a>
                        </div>
                    </div>
                )
            }
        })
    }
}

