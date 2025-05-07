import React, { useEffect, useState } from "react";
import "./ContainerDataUsersTable.css";
import DataTable, { TableColumn } from "react-data-table-component";
import { SearchFilter } from "../SearchFilter";
import { deleteUserById, getUsers } from "../../../services/UserService";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { FaCircle, FaPowerOff, FaRegAddressCard } from "react-icons/fa";
import { generateCard } from "../../../services/carne_manage/generateCarne.service";
import { formatDate } from "@utils/dateFormat";

export type ContainerDataUsersTableProps = {
  // Aquí podrías definir tipos si necesitas
};

type Usuario = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  document_type: string;
  status: string;
  document_number: string;
  role: string;
  cargado: string; // Puede estar vacío si aún no ha sido cargado
};

const ContainerDataUsersTable: React.FC<ContainerDataUsersTableProps> = () => {
  const [data, setdata] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let users = await getUsers();
      setdata(users);
    };
    getData();
  }, []);

  // 🔹 Datos quemados para pruebas
  //   const data: Usuario[] = [
  //     {
  //       documento: "123456789",
  //       tipo_documento: "CC",
  //       nombres: "Juan",
  //       apellidos: "Pérez",
  //       estado: "Activo",
  //       rol: "Administrador",
  //       cargado: "", // No cargado aún
  //     },
  //     {
  //       documento: "987654321",
  //       tipo_documento: "TI",
  //       nombres: "María",
  //       apellidos: "Gómez",
  //       estado: "Inactivo",
  //       rol: "Usuario",
  //       cargado: "2024-04-09", // Ya cargado
  //     },
  //   ];}

  const deleteUser = async (id: number) => {
    await deleteUserById(id);
  };

  const onCargar = (row: Usuario) => {
    console.log("Cargar:", row);
    alert(`Simulando carga para ${row.document_number} ${row.last_name}`);
  };

  const onFormulario = (row: Usuario) => {
    console.log("Formulario:", row);
    alert(`Redirigiendo al formulario de ${row.first_name} ${row.first_name}`);
  };

  const columns: TableColumn<Usuario>[] = [
    {
      name: "Documento",
      selector: (row) => row.document_number,
      sortable: true,
      center: true,
    },
    {
      name: "Tipo Documento",
      selector: (row) => row.document_type,
      sortable: true,
      center: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      cell: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          {row.status}
          {row.status == "activo" ? (
            <FaCircle style={{ color: "green", fontSize: "14px" }} />
          ) : (
            <FaCircle style={{ color: "red", fontSize: "14px" }} />
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Fecha Creación",
      selector: (row) => formatDate(row.date_created,"yyyy-mm-dd"),
      sortable: true,
    },
    {
      name: "Acción",
      cell: (row) => (
        <div className="buttons__actions">
          <FaRegAddressCard onClick={() => generateCard(row?.id)} />
          <FiEdit3 />
          <FaPowerOff />
          <FiTrash onClick={() => deleteUser(row?.id)} />
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
      item.first_name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.document_number.toLowerCase().includes(filterText.toLowerCase())
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
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#0F1B40", // Azul encabezado
              color: "white", // Texto blanco
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center", // Centra texto dentro del contenedor
              justifyContent: "center", // Centra contenido con flexbox
            },
          },
          cells: {
            style: {
              textAlign: "center", // Centra el texto
              justifyContent: "center", // Centra con flexbox
              alignItems: "center", // Centra verticalmente
              fontSize: "13px",
              padding: "10px 5px",
            },
          },
        }}
        noDataComponent="No hay información, ingresa nombre o documento"
      />
    </div>
  );
};

export default ContainerDataUsersTable;
