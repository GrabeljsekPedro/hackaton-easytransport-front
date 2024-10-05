import React, { useState } from "react";
import Select from "./Select"; // Asegúrate de que la ruta sea correcta

const App: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState("Seleccionar");
  const [selectedOption2, setSelectedOption2] = useState("Seleccionar");
  const [selectedOption3, setSelectedOption3] = useState("Elegir"); // Cambia el valor inicial

  const options = [
    { value: "Seleccionar", label: "Seleccionar" },
    { value: "Madrid", label: "Madrid" },
    { value: "Barcelona", label: "Barcelona" },
    { value: "Valencia", label: "Valencia" },
    { value: "Bilbao", label: "Bilbao" },
    { value: "Sevilla", label: "Sevilla" },
  ];

  // Opciones para el tercer Select
  const thirdSelectOptions = [
    { value: "Elegir", label: "Elegir" },
    { value: "Congelado", label: "Congelado" },
    { value: "Frágil", label: "Frágil" },
    { value: "Pesado", label: "Pesado" },
    { value: "General", label: "General" },
    { value: "Otros", label: "Otros" },
  ];

  return (
    <div className="p-6">
      <div className="flex space-x-2 mt-4">
        {" "}
        {/* Ajusta el espacio entre Select */}
        <div className="flex flex-col">
          <label htmlFor="salida" className="mb-1 font-medium text-sm">
            {" "}
            {/* Reduce el tamaño del texto */}
            Salida
          </label>
          <Select
            options={options}
            selectedValue={selectedOption1}
            onChange={setSelectedOption1}
            className="w-24 text-xs p-1" // Tamaño más pequeño
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="destino" className="mb-1 font-medium text-sm">
            {" "}
            {/* Reduce el tamaño del texto */}
            Destino
          </label>
          <Select
            options={options}
            selectedValue={selectedOption2}
            onChange={setSelectedOption2}
            className="w-24 text-xs p-1" // Tamaño más pequeño
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tercero" className="mb-1 font-medium text-sm">
            {" "}
            {/* Reduce el tamaño del texto */}
            Tipo de Carga
          </label>
          <Select
            options={thirdSelectOptions} // Usar las nuevas opciones
            selectedValue={selectedOption3}
            onChange={setSelectedOption3}
            className="w-24 text-xs p-1" // Tamaño más pequeño
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Buscar
        </button>
      </div>
    </div>
  );
};

export default App;
