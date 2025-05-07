"use client";
import React, { useEffect, useState } from "react";
import "./ContainerDataRolesTable.css";
import { getRoles, getRolesFacilities, updateRoleService } from "@services/role.service";
import { FiEdit3, FiTrash } from "react-icons/fi";
import DataTable, { TableColumn } from "react-data-table-component";
import { SearchFilter } from "../SearchFilter";
import { useModal } from "@hook/useModal";
import { Modal } from "../Modal";
import { getFacilitiesService } from "@services/facilities.service";
import { FaCircle } from "react-icons/fa";

export type ContainerDataRolesTableProps = {
  // types...
};

const ContainerDataRolesTable: React.FC<
  ContainerDataRolesTableProps
> = ({}) => {
  const [data, setdata] = useState([]);
  const [facilities, setfacilities] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [roleEdit, setRoleEdit] = useState({});
  const { isOpen, openModal, closeModal } = useModal();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let roles = await getRolesFacilities();
      console.log(roles);

      let facilitiesData = await getFacilitiesService();
      setdata(roles);
      setfacilities(facilitiesData);
    };
    getData();
  }, []);

  const editRole = (row) => {
    console.log(row);
    
    setRoleEdit(row);
    openModal();
  };

  const columns: TableColumn<any>[] = [
    {
      name: "ID",
      selector: (row) => row.id?.toString() || "",
      sortable: true,
      center: true,
    },
    {
      name: "Nombre Rol",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Estado",
      selector: (row) => row.is_active,
      cell: (row) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                {row.is_active == true ? (
                  <>
                    <FaCircle style={{ color: "green", fontSize: "14px" }} /> Activo {row.is_active}
                  </>
                ) : (
                  <>
                    <FaCircle style={{ color: "red", fontSize: "14px" }} />Inactivo {row.is_active}
                  </>
                )}
              </div>
            ),
            sortable: true,
    },
    {
      name: "Acción",
      cell: (row) => (
        <div className="buttons__actions">
          <FiEdit3 onClick={() => editRole(row)} />
          <FiTrash />
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

  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const checkedFacility = (id) => {
    return roleEdit?.facilities?.some((f) => f.id === id);
  };

  const handleSaveChanges = async () => {
    const idRole = roleEdit.id
    console.log(idRole);
    const facilities_id = roleEdit.facilities.map((el) => el.id);
    
    const body = {
      name: roleEdit.name,
      facilities: facilities_id,
    };
    await updateRoleService(idRole, body)
    setHasChanges(false);
    closeModal(); // o mantener abierto si deseas feedback primero
  };

  return (
    <div className="containerdatarolestable">
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
      <Modal isOpen={isOpen} onClose={closeModal}>
        <form action="">
          <h2>Edición de Rol</h2>
          <div className="">
            <label htmlFor="">Nombre Rol: </label>
            <input
              type="text"
              required
              value={roleEdit.name}
              onChange={(e) => {
                setRoleEdit({ ...roleEdit, name: e.target.value });
                setHasChanges(true);
              }}
            />
          </div>
          <div className="">
            <label htmlFor="">Accesos:</label>
            {facilities.map((facility) => (
              <div key={facility.id}>
                <input
                  type="checkbox"
                  checked={checkedFacility(facility.id)}
                  required
                  onChange={(e) => {
                    const updatedFacilities = e.target.checked
                      ? [...(roleEdit.facilities || []), facility]
                      : (roleEdit.facilities || []).filter(
                          (f) => f.id !== facility.id
                        );

                    setRoleEdit({ ...roleEdit, facilities: updatedFacilities });
                    setHasChanges(true);
                  }}
                  name="access"
                />
                {facility.name}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          >
            Guardar cambios
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ContainerDataRolesTable;
