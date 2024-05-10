import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    const [data, setData] = useState ([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       const fetchFromApi =()=>{    
    axios.get('https://663e4425e1913c4767971f9e.mockapi.io/articulos')
    .then(res => {
        setData(res.data);
     
    })
    .catch(err => console.log(err))
};
fetchFromApi();
}, [])

useEffect(() => {
    setFilteredData(
        data.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
}, [data, searchQuery]);

    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Deseas eliminar este artículo?");
        if (confirmDelete) {
            axios.delete(`https://663e4425e1913c4767971f9e.mockapi.io/articulos/${id}`)
                .then(res => {
                    setData(prevData => prevData.filter(item => item.id !== id));
                })
                .catch(err => console.log(err));
        }
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
const linkStyle={
    textDecoration: 'none',
  color: 'white',
  backgroundColor: 'green',
  padding: '10px 20px',
  borderRadius: '5px',
  border: '2px solid rgba(255, 255, 255, 0.5)'
   
};
const searchStyle={
    padding: '5px 10px',
    height: '5px',
    
}

 
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light ch-100'>
        <h1>Lista de articulos</h1>
        <div className='w-75 rounded bg-white border shadow p-4'>
            
            <div className='d-flex justify-content-end' >
            <input
                        type="text"
                        placeholder="🕵️Buscar..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="form-control me-2"
                        style={searchStyle}
                    />
                <Link to="/create" style={linkStyle} className='btn btn-succes'>Agregar artículo </Link>
                
            </div>

            <table className='table table-striped'>
                <thead>
                    <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((d, i) => (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>${d.price}</td>
                                <td>{d.category}</td>
                                <td>
                                    <Link to={`/read/${d.id}`} style={{border: '1px solid rgba(255, 255, 255, 0.5)',borderRadius: '5px',color:'white', padding: '4px 4px',}} className='btn btn-sm btn-info me-2' >Ver</Link>
                                    <Link to={`/update/${d.id}`}style={{border: '1px solid rgba(255, 255, 255, 0.5)',borderRadius: '5px',color:'white', padding: '4px 4px',}}className='btn btn-sm btn-primary me-2' >Editar</Link>
                                    <button  onClick={e => handleDelete(d.id)}className='btn btn-sm btn-danger'>Eliminar</button>

                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )

}

export default Home