import React, { useState } from 'react';

interface FormularioTransporteProps {
  onSubmit: (destino: string, origen: string, tipoCargamento: string) => void;
  recomendacion: string;
}

function FormularioTransporte({ onSubmit, recomendacion }: FormularioTransporteProps) {
  const [destino, setDestino] = useState('');
  const [origen, setOrigen] = useState('');
  const [tipoCargamento, setTipoCargamento] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(destino, origen, tipoCargamento);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="origen" className="block">Origen:</label>
          <input
            type="text"
            id="origen"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="destino" className="block">Destino:</label>
          <input
            type="text"
            id="destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="tipoCargamento" className="block">Tipo de Cargamento:</label>
          <input
            type="text"
            id="tipoCargamento"
            value={tipoCargamento}
            onChange={(e) => setTipoCargamento(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Buscar Transportista
        </button>
      </form>
      {recomendacion && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold mb-2">Recomendación:</h3>
          <p>{recomendacion}</p>
        </div>
      )}
    </div>
  );
}

export default FormularioTransporte;