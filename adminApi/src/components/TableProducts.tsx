import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function TableProducts() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  

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
    const filteredRecords = records.filter((record) => {
      return record.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(filteredRecords);
  };
  

  return (
    <div>
      <input type="text" onChange={handleChange} />

        <DataTable
          title="Datos de Productos"
          columns={columns}
          data={records}
          selectableRows
          pagination
          onSelectedRowsChange={(selectedRows) => console.log(selectedRows)}
          fixedHeader
        />
    </div>
  );
}

export default TableProducts;
