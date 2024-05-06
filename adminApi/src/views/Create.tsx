import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Create() {
    const [values, setValues] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    })

    const navigate = useNavigate();
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.post('https://fakestoreapi.com/products', values)
        .then(res => {
            console.log(res);
            navigate('/')
            location.reload();
        })
        .catch(err => console.log(err))
        navigate('/')
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg light'>
        <h1> Add a Product</h1>
        <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' className='form-control' placeholder='Enter title'
                onChange={e => setValues({...values, title: e.target.value}) }/>
            </div>
            <div className='mb-2'>
                <label htmlFor="price">Price</label>
                <input type="text" name="price" className='form-control' placeholder='Enter price'
                onChange={e => setValues({...values, price: e.target.value}) }/>
            </div>
            <div className='mb-2'>
                <label htmlFor="description">Description</label>
                <input type="text" name='description' className='form-control' placeholder='Enter title'
                onChange={e => setValues({...values, description: e.target.value}) }/>
            </div>
            <div className='mb-2'>
                <label htmlFor="category">Category</label>
                <input type="text" name='category' className='form-control' placeholder='Enter Category'
                onChange={e => setValues({...values, category: e.target.value}) }/>
            </div>
            <div className='mb-2'>
                <label htmlFor="image">Image</label>
                <input type="text" name='image' className='form-control' placeholder='Enter Image Url'
                onChange={e => setValues({...values, image: e.target.value}) }/>
            </div>
            <button className='btn btn-succes'>Submit</button>
            <Link to='/' className='btn btn-primary ms-3'>Back</Link>
        </form>
    </div>
  )
}

export default Create