import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [data, setData] = useState ([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = () => {
        const localData = localStorage.getItem('products');
        if (localData) {
            setData(JSON.parse(localData));
        } else {
            fetchFromApi();
            }
       }; 
       const fetchFromApi =()=>{    
    axios.get('https://fakestoreapi.com/products')
    .then(res => {
        setData(res.data);
    localStorage.setItem('products', JSON.stringify(res.data));
    })
    .catch(err => console.log(err))
};

    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Would you like to delete this product?");
        if (confirmDelete) {
            axios.delete(`https://fakestoreapi.com/products/${id}`)
                .then(res => {
                    setData(prevData => prevData.filter(item => item.id !== id));
                })
                .catch(err => console.log(err));
        }
    };
const linkStyle={
    textDecoration: 'none',
  color: 'white',
  backgroundColor: 'green',
  padding: '10px 20px',
  borderRadius: '5px',
  border: '2px solid rgba(255, 255, 255, 0.5)'
   
};

 
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light ch-100'>
        <h1>List of Products</h1>
        <div className='w-75 rounded bg-white border shadow p-4'>
            <div className='d-flex justify-content-end'>
                <Link to="/create" style={linkStyle} className='btn btn-succes'>Add new  </Link>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.title}</td>
                                <td>${d.price}</td>
                                <td>{d.category}</td>
                                <td>
                                    <Link to={`/read/${d.id}`} style={{border: '1px solid rgba(255, 255, 255, 0.5)',borderRadius: '5px',color:'white', padding: '4px 4px',}} className='btn btn-sm btn-info me-2' >View</Link>
                                    <Link to={`/update/${d.id}`}style={{border: '1px solid rgba(255, 255, 255, 0.5)',borderRadius: '5px',color:'white', padding: '4px 4px',}}className='btn btn-sm btn-primary me-2' >Edit</Link>
                                    <button  onClick={e => handleDelete(d.id)}className='btn btn-sm btn-danger'>Delete</button>

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