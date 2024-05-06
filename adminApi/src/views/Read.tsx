import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
    const [data, setData] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/'+ id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className='d-flex w-100 vh-100 justify-content-center aling-items-center bg-light'>
            <div className='w-50 border bg-white shadow ps-5 pt-5 pt-3 pb-5 rounded'>
                <h3>Details of Product</h3>
                <div className='mb-2'>
                    <strong>Id: {data.id}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Title: {data.title}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Price: $ {data.price}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Description: {data.description}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Category: {data.category}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Image: {data.image}</strong>
                </div>
                <Link to={`/update/${id}`} className='btn btn-success' >Edit</Link>
                <Link to={"/"} className='btn btn-primary ms-3' >Back</Link>
            </div>
        </div>
    );
}

export default Read;
