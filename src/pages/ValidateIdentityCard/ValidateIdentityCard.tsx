import { useEffect, useRef, useState } from "react";
import { ScannIdentityCard } from "@components/ScannIdentityCard";
import { verifyIdentityCard } from "../../services/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getFacilitiesService } from "@services/facilities.service";

const ValidateIdentityCard = () => {
  const lastScannedCode = useRef<string | null>(null);
  const lastScannedTime = useRef<number | null>(null);
  const [data, setdata] = useState([])

  useEffect(() => {
    const getData = async() => {
      const dataFacilities = await getFacilitiesService()
      setdata(dataFacilities)
    }
    getData()
  
    
  }, [])
  

  const handleSuccess = async (code: string) => {
    const currentTime = Date.now();

    const isSameCode = code === lastScannedCode.current;
    const isTooSoon =
      lastScannedTime.current !== null &&
      currentTime - lastScannedTime.current < 60000; // 60,000 ms = 60s

    if (isSameCode && isTooSoon) {
      console.log("Ya fue escaneado recientemente");
      return;
    }

    // Guardar nuevo código y tiempo
    lastScannedCode.current = code;
    lastScannedTime.current = currentTime;

    const responseIdentity = await verifyIdentityCard(code);
    
    console.log(responseIdentity);
    console.log(responseIdentity?.success, responseIdentity?.success == false);
    if (responseIdentity?.success == false) {
      withReactContent(Swal).fire({
        title: "Acceso Denegado",
        text: "Credencial Invalida o Permisos Insuficientes",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    if (responseIdentity.access == true) {
      withReactContent(Swal).fire({
        title: "Acceso Concedido",
        text: "Bienvenido a la instalación",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleError = (error: string) => {
    withReactContent(Swal).fire({
      title: "Error",
      text: "Carnet no escaneado correctamente",
      icon: "error",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  return (
    <div style={{height:"50%", width:"60%"}}>
      <h2>Validar Cédula</h2>
      <div className="">
        <label htmlFor="">Selecciona la Instalación:</label>
        <select name="" id="">
          <option selected disabled>Seleccionar</option>
          {data.map((facility)=>(
            <option value={facility.id} >{facility.name}</option>
          ))}
        </select>
      </div>
      <ScannIdentityCard
        onScanSuccess={handleSuccess}
        onScanFailure={handleError}
      />
    </div>
  );
};

export default ValidateIdentityCard;
