import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'
=======
import { Modal, Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css'
>>>>>>> main

function Home() {
    const [data, setData] = useState ([])

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();
<<<<<<< HEAD

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

    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Would you like to delete this product?");
        if (confirmDelete) {
            axios.delete(`https://663e4425e1913c4767971f9e.mockapi.io/articulos/${id}`)
                .then(res => {
                    setData(prevData => prevData.filter(item => item.id !== id));
                })
                .catch(err => console.log(err));
        }
    };
=======

    useEffect(() => {
       const fetchFromApi =()=>{    
    axios.get('https://663e4425e1913c4767971f9e.mockapi.io/Articulos')
    .then(res => {
        setData(res.data);
     
    })
    .catch(err => console.log(err))
};
fetchFromApi();
}, [])

useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredData(
        data
            .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(startIndex, endIndex)
    );
}, [data, searchQuery, currentPage, itemsPerPage]);

    
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };
    const confirmDelete = () => {
        axios.delete(`https://663e4425e1913c4767971f9e.mockapi.io/Articulos/${deleteId}`)
            .then(res => {
                setData(prevData => prevData.filter(item => item.id !== deleteId));
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };
>>>>>>> main
const linkStyle={
    textDecoration: 'none',
  color: 'white',
  backgroundColor: 'green',
  padding: '10px 20px',
  borderRadius: '5px',
  border: '2px solid rgba(255, 255, 255, 0.5)'
   
};
<<<<<<< HEAD

=======
const searchStyle={
    padding: '5px 10px',
    height: '5px',
    
}
const totalPages = Math.ceil(data.length / itemsPerPage);
>>>>>>> main
 
  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center bg-light ch-100'>
        <h1>Lista de articulos</h1>
        <div className='w-75 rounded bg-white border shadow p-4'>
<<<<<<< HEAD
            <div className='d-flex justify-content-end'>
                <Link to="/create" style={linkStyle} className='btn btn-succes'>Agregar producto </Link>
=======
            
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
                
>>>>>>> main
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
            <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    style={{ display: 'inline' }} // Agregar este estilo para la visualización horizontal
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
        </div>
        
    </div>
    <Modal show={showModal} onHide={() => setShowModal(false)} style={{ zIndex: 9999 }}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas eliminar este artículo?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )

}

export default Home