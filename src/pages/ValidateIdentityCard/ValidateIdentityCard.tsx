import { useRef } from "react";
import { ScannIdentityCard } from "@components/ScannIdentityCard";
import { verifyIdentityCard } from "../../services/AuthService";

const ValidateIdentityCard = () => {
  const lastScannedCode = useRef<string | null>(null);

  const handleSuccess = async (code: string) => {
    if (code === lastScannedCode.current) {
      // Ya fue escaneado este código
      return;
    }

    lastScannedCode.current = code; // Guardar el nuevo código

    const responseIdentity = await verifyIdentityCard(code);

    if (responseIdentity?.status === false) {
      alert(responseIdentity?.message);
    }

    console.log(`code: ${responseIdentity.code} and access: ${responseIdentity.access}`);
  };

  const handleError = (error: string) => {
    console.warn("Error escaneando:", error);
  };

  return (
    <div>
      <h2>Validar Cédula</h2>
      <ScannIdentityCard onScanSuccess={handleSuccess} onScanFailure={handleError} />
    </div>
  );
};

export default ValidateIdentityCard;
