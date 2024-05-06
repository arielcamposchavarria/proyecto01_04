import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

function TableProducts() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row.id)}>Editar</button>
          <button onClick={() => handleDelete(row.id)}>Eliminar</button>
        </>
      )
    }
  ];

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };


  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedRecords = records.filter((record) => record.id !== deleteId);
    setRecords(updatedRecords);
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const handleEdit = (id) => {
    const record = records.find((rec) => rec.id === id);
    setEditRecord(record);
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRecords = records.map((rec) => {
      if (rec.id === editRecord.id) {
        return editRecord;
      } else {
        return rec;
      }
    });
    setRecords(updatedRecords);
    setShowEditModal(false);
  };

  const filteredRecords = records.filter((record) =>
    record.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <input type="text" onChange={handleChange} />

      <DataTable
        title="Datos de Productos"
        columns={columns}
        data={filteredRecords}
        selectableRows
        pagination
        onSelectedRowsChange={(selectedRows) => console.log(selectedRows)}
        fixedHeader
      />

      <Modal isOpen={showDeleteModal}>
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este registro?</p>
        <button onClick={confirmDelete}>Confirmar</button>
        <button onClick={cancelDelete}>Cancelar</button>
      </Modal>

      <Modal isOpen={showEditModal}>
  <h2>Editar Registro</h2>
  {editRecord && (
    <form onSubmit={handleUpdate}>
      <label>
        Título:
        <input type="text" value={editRecord.title} onChange={(e) => setEditRecord({...editRecord, title: e.target.value})} />
      </label>
      <label>
        Precio:
        <input type="number" value={editRecord.price} onChange={(e) => setEditRecord({...editRecord, price: Number(e.target.value)})} />
      </label>
      <label>
        Categoría:
        <input type="text" value={editRecord.category} onChange={(e) => setEditRecord({...editRecord, category: e.target.value})} />
      </label>
      <button type="submit">Aceptar</button>
      <button type="button" onClick={() => setShowEditModal(false)}>Cancelar</button>
    </form>
  )}
    </Modal>

    </div>
  );
}

export default TableProducts;
