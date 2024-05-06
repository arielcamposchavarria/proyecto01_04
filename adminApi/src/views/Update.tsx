import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Update() {
  //  const [data, setData] = useState([])
    const {id} = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    })


    useEffect(() => {
    axios.get('https://fakestoreapi.com/products/'+ id)
    .then(res => {
        setValues(res.data)
    })
    .catch(err => console.log(err))
}, [id])

/*const handleUpdate = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    axios.put('https://fakestoreapi.com/products/' + id, values) 
    .then(res => {
        console.log(res);
        navigate('/')
    })
    .catch(err => console.log(err))
}*/
const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
        ...prevValues,
        [name]: value
    }));
};
const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('https://fakestoreapi.com/products/' + id, values) 
    .then(res => {
        //setValues(res.data)
        //console.log(res);
        // Almacenar en localStorage y navegar
        localStorage.setItem(`product_${id}`, JSON.stringify(res.data));
        setValues(res.data);
        navigate('/');
    })
    .catch(err => console.log(err));
};
    // Aquí podrías guardar los valores en localStorage
    // Por ejemplo:
    /*localStorage.setItem(`product_${id}`, JSON.stringify(values));
    navigate('/');*/


  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg light'>
    <h1> Update Product</h1>
    <form onSubmit={handleUpdate} >
        <div className='mb-2'>
            <label htmlFor="title">Title</label>
            <input type="text" name='title' className='form-control' placeholder='Enter title'
            value={values.title} onChange={e => setValues({...values, title: e.target.value}) }/>
        </div>
        <div className='mb-2'>
            <label htmlFor="price">Price</label>
            <input type="text" name="price" className='form-control' placeholder='Enter price'
            value={values.price} onChange={e => setValues({...values, price: e.target.value}) }/>
        </div>
        <div className='mb-2'>
            <label htmlFor="description">Description</label>
            <input type="text" name='description' className='form-control' placeholder='Enter title'
            value={values.description} onChange={e => setValues({...values, description: e.target.value}) }/>
        </div>
        <div className='mb-2'>
            <label htmlFor="category">Category</label>
            <input type="text" name='category' className='form-control' placeholder='Enter Category'
            value={values.category} onChange={e => setValues({...values, category: e.target.value}) }/>
        </div>
        <div className='mb-2'>
            <label htmlFor="image">Image</label>
            <input type="text" name='image' className='form-control' placeholder='Enter Image'
            value={values.image} onChange={e => setValues({...values, image: e.target.value}) }/>
        </div>
        <button className='btn btn-succes'>Update</button>
        <Link to='/' className='btn btn-primary ms-3'>Back</Link>
    </form>
</div>
  )
}


export default Update