import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'

function Read() {
    const [data, setData] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get('https://663e4425e1913c4767971f9e.mockapi.io/articulos/'+ id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, []);

    const linkStyle={
        textDecoration: 'none',
      color: 'white',
      backgroundColor: 'transparent',
      padding: '8px 20px',
      borderRadius: '5px',
      border: '1px solid rgba(255, 255, 255, 0.5)',
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow p-5 rounded'>
                <h3>Detalles del producto</h3>
                <div className='mb-2'>
                      <img src={data.imagen} alt="Artículo" style={{maxWidth: '100px',borderRadius:"20px"}} />
                </div>

                  
                <div className='mb-2'>
                    <strong>  {data.name}</strong>
                </div>
                <div className='mb-2'>
                    <strong>  ${data.price}</strong>
                </div>
                <div className='mb-2'>
                    <strong>  {data.description}</strong>
                </div>
                <div className='mb-2'>
                    <strong>  {data.category}</strong>
                </div>
                {

                }
                
                <Link to={`/update/${id}`} style={linkStyle} className='btn btn-success' >Editar</Link>
                <Link to={"/"}  style={linkStyle}className='btn btn-primary ms-3' >Volver</Link>
            </div>
        </div>
    );
}

export default Read;

