"use client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { getTemplatesService } from "@services/template.service";
import "./ContainerDataTemplatesTable.css"; // Asegúrate de tener este componente o cambia por un input estándar
import { Template } from "@services/models/template.model";
import { SearchFilter } from "../SearchFilter";
import { FiEdit3, FiTrash } from "react-icons/fi";

const ContainerDataTemplatesTable: React.FC = () => {
  const [data, setData] = useState<Template[]>([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const templates = await getTemplatesService();
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
    item.template_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns: TableColumn<Template>[] = [
    {
      name: "ID",
      selector: (row) => row.id?.toString() || "",
      sortable: true,
      center: true,
    },
    {
      name: "Nombre de Plantilla",
      selector: (row) => row.template_name,
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

export default ContainerDataTemplatesTable;
