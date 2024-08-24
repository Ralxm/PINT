import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import authHeader from '../views/auth-header';

export default function Cidade(){
    const url = "https://pint-backend-8vxk.onrender.com/colaborador/list";

    const [Colaborador, setColaborador] = useState([]);
    
    const [IDCOLABORADOR, setIDCOLABORADOR] = useState("");
    const [EMAIL, setEMAIL] = useState("");
    const [PASSWORDCOLABORADOR, setPASSWORDCOLABORADOR] = useState("");
    const [NOME, setNOME] = useState("");
    const [TELEMOVEL, setTELEMOVEL] = useState("");
    const [CIDADE, setCIDADE] = useState("");
    const [CARGO, setCARGO] = useState("");
    const [DATANASCIMENTO, setDATANASCIMENTO] = useState("");
    const [DATAREGISTO, setDATAREGISTO] = useState("");
    const [ULTIMOLOGIN, setULTIMOLOGIN] = useState("");

    const [NomeCidade, setNomeCidade] = useState([]);
    const [NomeCargo, setNomeCargo] = useState([]);
    const [ColaboradorCargo, setColaboradorCargo] = useState([]);

    const [Filtro, setFiltro] = useState("");
    
    useEffect(() => {
        document.title = 'Mostrar Colaboradores';
        loadTables();

        axios.get('https://pint-backend-8vxk.onrender.com/cidade/list')
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
    }, []);

    function loadTables(){
        let token;
        try{
            let user = localStorage.getItem('user');
            let userData = JSON.parse(user);
            token = userData.token;
        }
        catch{
            console.log("Erro a ir buscar o token");
        }
        axios.get(url, authHeader())
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
            alert("Erro asdasd" + error);
        }); 

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
    }

    return(
        <div className='col-10' style={{display: 'flex'}}>
            <div className='side-bar col-4' style={{marginLeft: "10px"}}>
                <div className='col-lg-12 backoffice-option'>
                    Listagem Colaboradores
                </div>
                <div className='col-lg-12 d-flex' style={{justifyContent: "center"}}>
                    <nav class="navbar navbar-light bg-light">
                        <form class="form-inline d-flex">
                            <input onChange={(value) => setFiltro(value.target.value)} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id='filtrarColaboradores'/>
                        </form>
                    </nav>
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListTables></ListTables>
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px"}} id={'insertColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    Inserir Colaborador
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>Email</label>
                            <input id='contaid' onChange={(value)=> setEMAIL(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Password</label>
                            <input id='contaid' onChange={(value)=> setPASSWORDCOLABORADOR(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Nome</label>
                            <input id='contaid' onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Telemovel</label>
                            <input id='contaid' onChange={(value)=> setTELEMOVEL(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Cargo</label>
                            <select id="inputState" className="input-group-select" value = {CARGO} onChange={(value) => setCARGO(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListCargos></ListCargos>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Cidade</label>
                            <select id="inputState" className="input-group-select" value = {CIDADE} onChange={(value) => setCIDADE(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListCidades></ListCidades>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Data Nascimento</label>
                            <input id='contaid' onChange={(value)=> setDATANASCIMENTO(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Data Registo</label>
                            <input id='contaid' onChange={(value)=> setDATAREGISTO(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Ultimo Login</label>
                            <input id='contaid' onChange={(value)=> setULTIMOLOGIN(value.target.value)} type={'date'}></input>
                        </div>
                        <div>
                            <button onClick={criarColuna} className='btn btn-info'>Inserir</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px", display: 'none'}} id={'editColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    <div className='edit-header'>
                        Editar Colaborador
                        <button onClick={FecharEditar} className='btn btn-secondary fechar-button'>Fechar</button>
                    </div>
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                    <div className='input-group'>
                            <label>Email</label>
                            <input id='contaid' value={EMAIL} onChange={(value)=> setEMAIL(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Password</label>
                            <input id='contaid' value={PASSWORDCOLABORADOR} onChange={(value)=> setPASSWORDCOLABORADOR(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Nome</label>
                            <input id='contaid' value={NOME} onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Telemovel</label>
                            <input id='contaid' value={TELEMOVEL} onChange={(value)=> setTELEMOVEL(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Cargo</label>
                            <select id="inputState" className="input-group-select" value = {CARGO} onChange={(value) => setCARGO(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListCargos></ListCargos>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Cidade</label>
                            <select id="inputState" className="input-group-select" value = {CIDADE} onChange={(value) => setCIDADE(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListCidades></ListCidades>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Data Nascimento</label>
                            <input id='contaid' value={DATANASCIMENTO} onChange={(value)=> setDATANASCIMENTO(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Data Registo</label>
                            <input id='contaid' value={DATAREGISTO} onChange={(value)=> setDATAREGISTO(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Ultimo Login</label>
                            <input id='contaid' value={ULTIMOLOGIN} onChange={(value)=> setULTIMOLOGIN(value.target.value)} type={'date'}></input>
                        </div>
                        <div>
                            <button onClick={editarColuna} className='btn btn-info'>Editar</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )

    async function criarColuna(){
        let id;
        let cargo;
        const urlCriar = 'https://pint-backend-8vxk.onrender.com/colaborador/create'
        NomeCargo.map((data) =>{
            if(data.NOME == CARGO){
                cargo = data.IDCARGO;
            }
        })
        const datapost = {
            EMAIL : EMAIL,
            PASSWORDCOLABORADOR : PASSWORDCOLABORADOR,
            NOME : NOME,
            TELEMOVEL : TELEMOVEL,
            CIDADE : CIDADE,
            DATANASCIMENTO : DATANASCIMENTO,
            DATAREGISTO : DATAREGISTO,
            ULTIMOLOGIN : ULTIMOLOGIN,
            TIPOCONTA: 1,
            CARGO: cargo
        }
        await axios.post(urlCriar, datapost)
        .then(res => {
            if(res.data.success === true){
                loadTables();
                id = res.data.data;
            }
            else{
                alert(res.data.message);
            }
        })
        .catch(error =>{
            console.log('Erro: asd' + error);
        })

        /*const urlCriarColaboradorCargo = 'https://pint-backend-8vxk.onrender.com/colaborador_cargo/create'
        NomeCargo.map((data) =>{
            if(data.NOME == CARGO){
                cargo = data.IDCARGO;
            }
        })
        const datapostCargo ={
            IDCARGO: cargo,
            IDCOLABORADOR : id.IDCOLABORADOR
        }
        await axios.post(urlCriarColaboradorCargo, datapostCargo)
        .then(res => {
            if(res.data.success === true){
                loadTables();
            }
            else{
                alert(res.data.message);
            }
        })
        .catch(error =>{
            alert('Erro: ' + error);
        })*/
    }

    function editarColuna(){
        let token;
        try{
            let user = localStorage.getItem('user');
            let userData = JSON.parse(user);
            token = userData.token;
        }
        catch{
            console.log("Erro a ir buscar o token");
        }
        const urlEditar = 'https://pint-backend-8vxk.onrender.com/colaborador/update/' + IDCOLABORADOR;
        const datapost = {
            EMAIL: EMAIL,
            PASSWORDCOLABORADOR: PASSWORDCOLABORADOR,
            NOME: NOME,
            TELEMOVEL:TELEMOVEL,
            CIDADE: CIDADE,
            DATANASCIMENTO: DATANASCIMENTO,
            DATAREGISTO: DATAREGISTO,
            ULTIMOLOGIN: ULTIMOLOGIN,
            TIPOCONTA: 1
        }
        axios.put(urlEditar, datapost, authHeader())
        .then(res =>{
            if(res.data.success === true){
                loadTables();
            }
            else{
                alert('Erro');
            }
        })
        .catch(error => { 
            alert("Error: " + error);
        })

        let colabcargoid;
        ColaboradorCargo.map((data) => {
            if(data.IDCOLABORADOR == IDCOLABORADOR){
                colabcargoid = data.IDCOLABORADORCARGO;
            }
        })
        let cargo;
        NomeCargo.map((data) =>{
            if(data.NOME == CARGO){
                cargo = data.IDCARGO;
            }
        })

        const urlEditarColaboradorCargo = 'https://pint-backend-8vxk.onrender.com/colaborador_cargo/update/' + colabcargoid;
        const datapostColaboradorCargo = {
            IDCARGO: cargo, 
            IDCOLABORADOR: IDCOLABORADOR,
        }
        axios.put(urlEditarColaboradorCargo, datapostColaboradorCargo)
        .then(res =>{
            if(res.data.success === true){
                loadTables();
            }
            else{
                alert('Erro');
            }
        })
        .catch(error => { 
            alert("Error: " + error);
        })
    }

    function ListCidades(){
        return NomeCidade.map((data, index) =>{
            return <option key={index} value ={data.IDCIDADE}>{data.NOME}</option>
        })
    }

    function ListCargos(){
        return NomeCargo.map((data, index) =>{
            return <option key={index} value ={data.IDCIDADE}>{data.NOME}</option>
        })
    }

    
function ListTables() {
    const [filteredColaboradores, setFilteredColaboradores] = useState(Colaborador);

    useEffect(() => {
        if (Filtro === "") {
            setFilteredColaboradores(Colaborador);
        } else {
            const lowercasedFiltro = Filtro.toLowerCase();
            const filtered = Colaborador.filter(data =>
                data.NOME.toLowerCase().includes(lowercasedFiltro) || 
                data.TELEMOVEL.includes(Filtro)
            );
            setFilteredColaboradores(filtered);
        }
    }, [Filtro, Colaborador]);

    return filteredColaboradores.map((data, index) => {
        let cargo;
        ColaboradorCargo.forEach((data2) => {
            if (data2.IDCOLABORADOR === data.IDCOLABORADOR) {
                NomeCargo.forEach((data3) => {
                    if (data3.IDCARGO === data2.IDCARGO) {
                        cargo = data3.NOME;
                    }
                });
            }
        });

        let cidade;
        NomeCidade.forEach((data2) => {
            if (data2.IDCIDADE === data.CIDADE) {
                cidade = data2.NOME;
            }
        });

        return (
            <div key={index} className='col-12 showTable'>
                <div className='showTableText'>
                    <a>ID Colaborador: {data.IDCOLABORADOR}</a>
                    <br></br>
                    <a>Email: {data.EMAIL}</a>
                    <br></br>
                    <a>Nome: {data.NOME}</a>
                    <br></br>
                    <a>Telemovel: {data.TELEMOVEL}</a>
                    <br></br>
                    <a>Cargo: {cargo}</a>
                    <br></br>
                    <a>Cidade: {cidade}</a>
                    <br></br>
                    <a>Data de nascimento: {data.DATANASCIMENTO}</a>
                    <br></br>
                    <a>Data de registo: {data.DATAREGISTO}</a>
                    <br></br>
                    <a>Data do último login: {data.ULTIMOLOGIN}</a>
                </div>
                <div className='showTableButtons'>
                    <button className='btn btn-info' onClick={() => inserirEditarColuna(data)}>Editar</button>
                    <button className='btn btn-danger' onClick={() => ApagarColuna(data)}>Apagar</button>
                </div>
            </div>
        );
    });
}

    async function ApagarColuna(data){
        try{
            let token;
            try{
                let user = localStorage.getItem('user');
                let userData = JSON.parse(user);
                token = userData.token;
            }
            catch{
                console.log("Erro a ir buscar o token");
            }
            setIDCOLABORADOR(data.IDCOLABORADOR);

            let colaboradorcargo;
            let colaborador;
            ColaboradorCargo.map((data2) =>{
                if(data2.IDCOLABORADOR == data.IDCOLABORADOR){
                    colaboradorcargo = data2.IDCOLABORADORCARGO;
                    colaborador = data.IDCOLABORADOR;
                }
            })
    
            const urlApagarColaboradorCargo = 'https://pint-backend-8vxk.onrender.com/colaborador_cargo/delete/' + colaboradorcargo;
            await axios.put(urlApagarColaboradorCargo)
            .then(res =>{
                if(res.data.success){
                    loadTables();
                }
            })
            .catch(error => {
                console.log("Erro asdasd" + error)
            });
            
            console.log(data)
            const urlApagar = 'https://pint-backend-8vxk.onrender.com/colaborador/delete/' + data.IDCOLABORADOR;
            console.log(urlApagar)
            await axios.put(urlApagar, null, authHeader())
            .then(res =>{
                if(res.data.success){
                    loadTables();
                }
            })
            .catch(error => {
                console.log("Erro a apagar o colaborador")
            });
        }
        catch{
            console.log('erro');
        }
    }

    function inserirEditarColuna(data){
        setIDCOLABORADOR(data.IDCOLABORADOR)
        let cargo;
        ColaboradorCargo.map((data2) =>{
            if(data2.IDCOLABORADOR == IDCOLABORADOR){
                NomeCargo.map((data3) =>{
                    if(data3.IDCARGO == data2.IDCARGO){
                        cargo = data3.IDCARGO;
                    }
                })
            }
        })
        setEMAIL(data.EMAIL)
        setPASSWORDCOLABORADOR(data.PASSWORDCOLABORADOR)
        setNOME(data.NOME)
        setTELEMOVEL(data.TELEMOVEL)
        setCARGO(cargo)
        setCIDADE(data.CIDADE)
        setDATANASCIMENTO(data.DATANASCIMENTO)
        setDATAREGISTO(data.DATAREGISTO)
        setULTIMOLOGIN(data.ULTIMOLOGIN)

        document.getElementById('editColumn').style.display = 'block';
        document.getElementById('insertColumn').style.display = 'none';
    }

    function FecharEditar(){ 
        document.getElementById('editColumn').style.display = 'none';
        document.getElementById('insertColumn').style.display = 'block';
    }
}

