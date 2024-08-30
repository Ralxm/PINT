import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import authHeader from '../views/auth-header';
import * as lang from '../Universal/lang.json';

export default function Estatistica(){
    if(!JSON.parse(localStorage.getItem("lang"))){
        localStorage.setItem("lang", "pt");
    }
    let stolang = JSON.parse(localStorage.getItem("lang"));
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];

    const urlColaborador = "https://pint-backend-8vxk.onrender.com/colaborador/";
    const urlCidade = "https://pint-backend-8vxk.onrender.com/cidade/";
    const urlPost = "https://pint-backend-8vxk.onrender.com/post/";
    const urlCategoria = "https://pint-backend-8vxk.onrender.com/categoria/";
    const urlComentario = "https://pint-backend-8vxk.onrender.com/comentario/";

    const [Colaborador, setColaborador] = useState([]);
    const [ColaboradorCargo, setColaboradorCargo] = useState([]);
    const [NomeCidade, setNomeCidade] = useState([]);
    const [NomeCargo, setNomeCargo] = useState([]);
    const [Post, setPost] = useState([]);
    const [PostViews, setPostViews] = useState([]);
    const [Categoria, setCategoria] = useState([]);
    const [Comentario, setComentario] = useState([]);

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
        let cidade = JSON.parse(localStorage.getItem('cidade'))
        let id = JSON.parse(localStorage.getItem('id'));
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

        axios.get(urlPost + 'listByCidade/' + cidade)
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

        axios.get(urlPost + 'topViews')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setPostViews(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlCategoria + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setCategoria(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlComentario + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setComentario(data);
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
        <div className='col-10' style={{display: 'flex', overflowY: "scroll"}}>
            <div className='col-5 side-bar' style={{marginLeft: "10px"}}>
                <div className='col-lg-12 backoffice-option'>
                    {data.texto9backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{overflowY: 'scroll', maxHeight: '40vh'}}>
                    <PublicacoesCriadasUltimos30Dias></PublicacoesCriadasUltimos30Dias>
                </div>
                <div className='col-lg-12 backoffice-option'>
                    {data.texto13backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '45vh', justifyContent: "center"}}>
                    <PublicacoesComMaisViewsSempre></PublicacoesComMaisViewsSempre>
                </div>
                <div className='col-lg-12 backoffice-option' style={{marginTop: "10px"}}>
                    {data.texto14backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '45vh'}}>
                    <PublicacoesComMaisViews30DiasPorCategoria></PublicacoesComMaisViews30DiasPorCategoria>
                </div>
                <div className='col-lg-12 backoffice-option' style={{marginTop: "10px"}}>
                    {data.texto16backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '45vh', justifyContent: "center"}}>
                    <PublicacoesMaiorRating></PublicacoesMaiorRating>
                </div>
            </div>
            <div className='col-5 side-bar' style={{marginLeft: "10px"}}>
                <div className='col-lg-12 backoffice-option' style={{overflowY: 'scroll', maxHeight: '40vh'}}>
                    {data.texto11backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{overflowY: 'scroll', maxHeight: '45vh'}}>
                    <Registos30Dias></Registos30Dias>
                </div>
                <div className='col-lg-12 backoffice-option' style={{overflowY: 'scroll', maxHeight: '40vh'}}>
                    {data.texto12backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '45vh', justifyContent: "center"}}>
                    <PostsPorColaborador></PostsPorColaborador>
                </div>
                <div className='col-lg-12 backoffice-option' style={{marginTop: "10px"}}>
                    {data.texto10backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '45vh'}}>
                    <ColaboradoresInativos></ColaboradoresInativos>
                </div>
                <div className='col-lg-12 backoffice-option' style={{marginTop: "10px"}}>
                    {data.texto15backoffice}
                </div>
                <div className='col-lg-12 showTable-list' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '45vh', justifyContent: "center"}}>
                    <PublicacoesMaisComentadas></PublicacoesMaisComentadas>
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

    function PublicacoesComMaisViews30DiasPorCategoria(){
        return Categoria.map((categoria) => {
            let postFinal;
            let viewsFinal = 0;
            Post.map((post) => {
                if(post.CATEGORIA == categoria.IDCATEGORIA){
                    if(post.VIEWS > viewsFinal){
                        postFinal = post;
                        viewsFinal = post.VIEWS;
                    }
                }
            })
            if(postFinal){
                return(
                    <div className='col-12 d-flex showTable'>
                        <div className='col-4'>
                            <div className='showTableText'>
                                <a>Categoria: {categoria.NOME}</a>
                                <a>Subcategoria: {postFinal.subcategorium.NOME}</a>  
                            </div>
                        </div>
                        <div className='col-5'>
                            <div className='showTableText'>
                                <a>ID Publicação: {postFinal.IDPUBLICACAO}</a>
                                <a>Título: {postFinal.TITULO}</a>
                                <a>Visualizações: {postFinal.VIEWS}</a>
                            </div>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-outline-info' style={{maxWidth: "150px"}} onClick={() => window.location = "#/post/" + postFinal.IDPUBLICACAO}>Ver publicação</button>
                        </div>
                    </div>
                )
            }
        })
    }

    function PublicacoesComMaisViewsSempre(){
        return PostViews.map((post) =>{
            return(
                <div className='col-6 showTable'>
                    <div className='showTableText'>
                        <a>ID Publicação: {post.IDPUBLICACAO}</a>
                        <a>Título: {post.TITULO}</a>
                        <a>Visualizações: {post.VIEWS}</a>
                        <button className='btn btn-outline-info' style={{maxWidth: "150px"}} onClick={() => window.location = "#/post/" + post.IDPUBLICACAO}>Ver publicação</button>
                    </div>
                </div>
            )
        })
    }

    function PublicacoesMaisComentadas(){
        let hoje = new Date();
        if(Post.length > 0){
            let postsFinal = []
            Post.map((post) => {
                let numComs = 0;
                Comentario.map((comentario) => {
                    let datacomentario = new Date(comentario.DATACOMENTARIO)
                    const diffTime = Math.abs(datacomentario - hoje);
                    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    if(comentario.IDPOST == post.IDPUBLICACAO && diffDays <= 30){
                        numComs++;
                    }
                })
                postsFinal.push([post, numComs]);
            })
            postsFinal.sort((b, a) => a[1] - b[1]);
            return postsFinal.map((post, index) => {
                if(index < 5 && post[1] > 0){
                    return(
                        <div className='col-6 showTable'>
                            <div className='showTableText'>
                                <a>ID Publicação: {post[0].IDPUBLICACAO}</a>
                                <a>Título: {post[0].TITULO}</a>
                                <a>Quantidade de comentários: {post[1]}</a>
                                <button className='btn btn-outline-info' style={{maxWidth: "150px"}} onClick={() => window.location = "#/post/" + post[0].IDPUBLICACAO}>Ver publicação</button>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    function PublicacoesMaiorRating(){
        if(Post.length > 0){
            let postsFinal = []
            Post.map((post) => {
                postsFinal.push([post, post.RATING]);
            })
            postsFinal.sort((b, a) => a[1] - b[1]);
            return postsFinal.map((post, index) => {
                if(index < 5){
                    return(
                        <div className='col-6 showTable'>
                            <div className='showTableText'>
                                <a>ID Publicação: {post[0].IDPUBLICACAO}</a>
                                <a>Título: {post[0].TITULO}</a>
                                <a>Rating: {post[1]}</a>
                                <button className='btn btn-outline-info' style={{maxWidth: "150px"}} onClick={() => window.location = "#/post/" + post[0].IDPUBLICACAO}>Ver publicação</button>
                            </div>
                        </div>
                    )
                }
            })
        }
    }
}

