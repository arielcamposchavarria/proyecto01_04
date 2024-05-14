import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        imagen: ''
    })

    useEffect(() => {
        axios.get('https://663e4425e1913c4767971f9e.mockapi.io/Articulos/' + id)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('https://663e4425e1913c4767971f9e.mockapi.io/Articulos/' + id, values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg light'>
            <h1> Actualizar Articulo</h1>
            <form onSubmit={handleUpdate} >
                <div className='mb-2'>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name='name' className='form-control' placeholder='Enter name'
                        value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="price">Precio</label>
                    <input type="text" name="price" className='form-control' placeholder='Enter price'
                        value={values.price} onChange={e => setValues({...values, price: e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="description">Descripción</label>
                    <input type="text" name='description' className='form-control' placeholder='Enter description'
                        value={values.description} onChange={e => setValues({...values, description: e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" name='category' className='form-control' placeholder='Enter Category'
                        value={values.category} onChange={e => setValues({...values, category: e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="imagen">Imagen</label>
                    <input type="text" name='imagen' className='form-control' placeholder='Enter imagen Url'
                        value={values.imagen} onChange={e => setValues({...values, imagen: e.target.value})} />
                </div>
                <button className='btn btn-success'>Actualizar</button>
                <Link to='/' className='btn btn-primary ms-3'>Volver</Link>
            </form>
        </div>
    )
}

export default Update
