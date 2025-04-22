import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

type TemplateDimension = {
  unit?: string;
  width: number;
  height: number;
};

type code = {
  value: string;
  position_x: number;
  position_y: number;
};

type photo = {
  imageUrl: string;
  width: number;
  height: number;
  position_x: number;
  position_y: number;
};

export class GenerateCarneBuilder {
  private doc: jsPDF;
  private templateDimension: TemplateDimension;
  private backgroundUrl: string | null = null;
  private imageUrl: string | null = null;
  private photo: photo | null = null;
  private code: code = {
    value: "",
    position_x: 0,
    position_y: 0,
  };
  private PIXEL: number = 0.0264583333;

  constructor(templateDimension: TemplateDimension) {
    this.templateDimension = templateDimension;

    this.doc = new jsPDF({
      orientation: "portrait",
      unit: templateDimension.unit || "cm",
      format: [templateDimension.width, templateDimension.height],
    });
  }

  setBackground(url: string): this {
    this.backgroundUrl = url;
    return this;
  }

  setCode(code: code): this {
    if (this.templateDimension.unit == "cm") {
      code.position_x = code.position_x * this.PIXEL;
      code.position_y = code.position_y * this.PIXEL;
    }
    this.code = code;
    return this;
  }

  setUserImage(photo: photo): this {
    if (this.templateDimension.unit == "cm") {
      photo.position_x = photo.position_x * this.PIXEL;
      photo.position_y = photo.position_y * this.PIXEL;
    }
    this.photo = photo;
    return this;
  }

  private async loadImageToBase64(url: string): Promise<string> {
    const img = await fetch(url);
    const blob = await img.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  private async applyBackground(): Promise<void> {
    if (!this.backgroundUrl) return;
    const imgData = await this.loadImageToBase64(this.backgroundUrl);
    this.doc.addImage(
      imgData,
      "PNG",
      0,
      0,
      this.templateDimension.width,
      this.templateDimension.height
    );
  }

  private async applyUserImage(): Promise<void> {
    if (!this.photo?.imageUrl) return;
    const imgData = await this.loadImageToBase64(this.photo.imageUrl);
    this.doc.addImage(
      imgData,
      "JPG",
      this.photo.position_x,
      this.photo.position_y,
      this.photo.width,
      this.photo.height
    );
  }

  private addText(): void {
    this.doc.setFontSize(12);
    this.doc.text("Plantilla Generada", 0.5, 0.5); // Ajusta la posición si es necesario
  }

  private addRectangle(): void {
    this.doc.setDrawColor(0);
    this.doc.setFillColor(0, 0, 0);
    this.doc.rect(0.6, 6.5, 4, 0.7, "F"); // Ajusta la posición y el tamaño
  }
  private async addQRCode(): Promise<void> {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(this.code.value, {
        margin: 0, // Puedes ajustar el margen si quieres menos espacio alrededor
        color: {
          dark: "#000000", // Color del QR
          light: "#00000000", // Fondo transparente en formato rgba
        },
      }); // Generamos el QR

      // Insertamos el QR en el lugar deseado (dentro del rectángulo)
      this.doc.addImage(
        qrCodeDataUrl,
        "PNG",
        this.code.position_x,
        this.code.position_y,
        1.4,
        1.4
      ); // Ajustamos el tamaño y la posición
    } catch (error) {
      console.error("Error generando QR:", error);
    }
  }

  private async addBarcode(): Promise<void> {
    try {
      // Crear un canvas para generar el código de barras
      const canvas = document.createElement("canvas");

      // Generar el código de barras en el canvas
      JsBarcode(canvas, this.code.value, {
        format: "CODE128", // Tipo de código de barras (puedes cambiar el tipo según necesites)
        width: 3, // Ancho de las barras
        height: 18, // Altura del código de barras
        displayValue: false, // No mostrar el valor debajo del código de barras
        background: "transparent",
      });

      // Convertir el canvas en una imagen base64
      const barcodeDataUrl = canvas.toDataURL("image/png");

      // Insertar la imagen del código de barras en el PDF (ajustando la posición y el tamaño)
      this.doc.addImage(barcodeDataUrl, "PNG", this.code.position_x, this.code.position_y, 4.4, 1.9); // Ajusta el tamaño y la posición según sea necesario
    } catch (error) {
      console.error("Error generando código de barras:", error);
    }
  }

  // Método principal para construir y guardar el PDF
  async buildAndSave(filename = "template.pdf"): Promise<void> {
    // 1. Primero aplica el fondo
    await this.applyBackground();

    // 2. Agrega texto y rectángulo
    this.addText();
    // this.addRectangle();

    // 3. Luego aplica la imagen del usuario
    await this.applyUserImage();
    // await this.addQRCode();
    await this.addBarcode();

    // 4. Guarda el archivo PDF
    this.doc.save(filename);
  }
}
