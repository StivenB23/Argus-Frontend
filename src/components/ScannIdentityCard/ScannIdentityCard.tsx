import { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

type Props = {
  onScanSuccess?: (data: string) => void;
  onScanError?: (error: string) => void;
};

const ScannIdentityCard: React.FC<Props> = ({ onScanSuccess, onScanError }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 450, height: 450 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);
    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        console.log("✅ Código escaneado:", decodedText);
        onScanSuccess?.(decodedText);
      },
      (error) => {
        onScanError?.(error);
        console.warn("❌ Error escaneando:", error);
      }
    );

    return () => {
      scanner.clear().catch((e) => {
        console.error("Error al limpiar el escáner:", e);
      });
    };
  }, []);

  return <div id="reader" style={{ height: "300px", backgroundColor: "#ccc" }} />;
};

export default ScannIdentityCard;
