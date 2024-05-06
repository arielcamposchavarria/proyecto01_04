import { useState } from 'react';

function AddProductForm({ onAddProduct, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
      </div>
      <button type="submit">Agregar Producto</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default AddProductForm;