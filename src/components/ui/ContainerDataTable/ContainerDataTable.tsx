"use client";
import React, { useState } from "react";
import "./ContainerDataTable.css";
import DataTable, { TableColumn } from "react-data-table-component";
import { SearchFilter } from "../SearchFilter";

// Tipado de los datos
type RowData = {
  name: string;
  contactospicf_details: {
    cf_1438: string; // Código Dane Sede
    cf_1436: string; // Nombre Sede
    cf_1454: string; // N°. Documento
    cf_1466: string; // Tipo de Muestra
    cf_1482: string; // Aplicó
    cf_1468: string; // Cargado
  };
};

const ContainerDataTable: React.FC = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // 🔹 Datos quemados para pruebas
  const data: RowData[] = [
    {
      name: "Juan Pérez",
      contactospicf_details: {
        cf_1438: "11001",
        cf_1436: "IED Centro Educativo La Esperanza",
        cf_1454: "123456789",
        cf_1466: "Sangre",
        cf_1482: "Sí",
        cf_1468: "",
      },
    },
    {
      name: "María Gómez",
      contactospicf_details: {
        cf_1438: "11002",
        cf_1436: "Colegio Nueva Generación",
        cf_1454: "987654321",
        cf_1466: "Orina",
        cf_1482: "No",
        cf_1468: "2024-04-09",
      },
    },
  ];

  const onCargar = (row: RowData) => {
    console.log("Cargar:", row);
    alert(`Simulando carga para ${row.name}`);
  };

  const onFormulario = (row: RowData) => {
    console.log("Formulario:", row);
    alert(`Redirigiendo al formulario de ${row.name}`);
  };

  const columns: TableColumn<RowData>[] = [
    {
      name: "Código Dane Sede",
      selector: (row) => row.contactospicf_details.cf_1438,
      sortable: true,
      center: true,
    },
    {
      name: "Nombre Sede",
      selector: (row) => row.contactospicf_details.cf_1436,
      sortable: true,
      center: true,
    },
    {
      name: "N°. Documento",
      selector: (row) => row.contactospicf_details.cf_1454,
      sortable: true,
    },
    {
      name: "Nombre Examinando",
      selector: (row) => row.name,
      sortable: true,
      grow: 3,
    },
    {
      name: "Tipo de Muestra",
      selector: (row) => row.contactospicf_details.cf_1466,
      sortable: true,
    },
    {
      name: "Aplicó",
      selector: (row) => row.contactospicf_details.cf_1482,
      sortable: true,
    },
    {
      name: "Cargado",
      selector: (row) => row.contactospicf_details.cf_1468,
      sortable: true,
    },
    {
      name: "Acción",
      cell: (row) => (
        <div className="buttons">
          {row.contactospicf_details.cf_1468 === "" && (
            <>
              <button className="button-small" onClick={() => onCargar(row)}>
                Cargar
              </button>
              <button
                className="button-small button-success"
                onClick={() => onFormulario(row)}
              >
                Formulario
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const filteredItems = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.contactospicf_details.cf_1454
        .toLowerCase()
        .includes(filterText.toLowerCase())
  );

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="container__table">
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        subHeader
        subHeaderComponent={
          <SearchFilter
            filterText={filterText}
            onFilter={setFilterText}
            onClear={handleClear}
          />
        }
        paginationComponentOptions={paginationComponentOptions}
        selectableRows={false}
        noDataComponent="No hay información, ingresa el código del sitio o el nombre del sitio"
      />
    </div>
  );
};

export default ContainerDataTable;
