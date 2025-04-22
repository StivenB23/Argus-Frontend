import { useState } from "react";
import "./ColorPicker.css";

type colorPickerType = {
  onColorChange: (color: string) => void;
};

const ColorPickerCard = ({ onColorChange }: colorPickerType) => {
  const [color, setColor] = useState("#000000");

  const handleChange = (e) => {
    setColor(e.target.value);
    onColorChange?.(e.target.value); // Notifica al padre si existe la función
  };

  return (
    <div className="pantone-card">
      <input
        name="coloruno"
        type="color"
        value={color}
        onChange={handleChange}
      />
      <output>{color}</output>
    </div>
  );
};

export default ColorPickerCard;
