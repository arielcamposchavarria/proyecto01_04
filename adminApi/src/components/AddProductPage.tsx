import AddProductForm from './AddProductForm';

function AddProductPage() {
    const handleAddProduct = (newProduct) => {
      
        // Implementa la lógica para agregar un nuevo producto
        console.log('Agregando nuevo producto:', newProduct);
      };
    
      const handleCancel = () => {
        // Implementa la lógica para cancelar la adición de un nuevo producto
        console.log('Cancelando adición de nuevo producto');
      };
    
      return (
        <div>
          <h2>Agregar Nuevo Producto</h2>
          <AddProductForm onAddProduct={handleAddProduct} onCancel={handleCancel} />
        </div>
      );
    }

export default AddProductPage;