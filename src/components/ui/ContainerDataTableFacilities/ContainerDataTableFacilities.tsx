"use client";
import React, { useEffect, useState } from "react";
import "./ContainerDataTableFacilities.css";
import DataTable, { TableColumn } from "react-data-table-component";
import { SearchFilter } from "../SearchFilter";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { getFacilitiesService } from "@services/facilities.service";

export type ContainerDataTableFacilitiesProps = {
  // types...
};

const ContainerDataTableFacilities: React.FC<
  ContainerDataTableFacilitiesProps
> = ({}) => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const templates = await getFacilitiesService();
      setData(templates);
    };
    getData();
  }, []);

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns: TableColumn<any>[] = [
    {
      name: "ID",
      selector: (row) => row.id?.toString() || "",
      sortable: true,
      center: true,
    },
    {
      name: "Nombre de Instalación",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Tipo",
      selector: (row) => row.type,
      sortable: true,
      center: true,
    },
    {
      name: "Dirección",
      selector: (row) => row.address,
      sortable: true,
      center: true,
    },
    {
      name: "Acción",
      cell: (row) => (
        <div className="buttons__actions">
          <FiEdit3 />
          <FiTrash />
        </div>
      ),
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="containerdatatemplatestable">
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
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#0F1B40",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center",
              justifyContent: "center",
            },
          },
          cells: {
            style: {
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "13px",
              padding: "10px 5px",
            },
          },
        }}
        noDataComponent="No hay información, ingresa el nombre de una plantilla"
      />
    </div>
  );
};

export default ContainerDataTableFacilities;
