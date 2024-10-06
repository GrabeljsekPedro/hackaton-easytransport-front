import React, { useState, useMemo } from "react";

interface Transportista {
  id: string;
  fields: {
    Transportista: string;
    Destino: string;
    Origen: string;
    "Tipo de Cargamento Actual": string;
    "Días en Carretera": number;
    "Porcentaje de Carga": number;
    "Experiencia (años)": number;
    Descripcion: string;
  };
}

interface FormularioTransporteProps {
  onSubmit: (origen: string, destino: string, tipoCargamento: string) => void;
  transportistas: Transportista[];
}

function FormularioTransporte({
  onSubmit,
  transportistas,
}: FormularioTransporteProps) {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoCargamento, setTipoCargamento] = useState("");

  const origenes = useMemo(() => {
    return [...new Set(transportistas.map((t) => t.fields.Origen))];
  }, [transportistas]);

  const destinos = useMemo(() => {
    if (!origen) return [];
    return [
      ...new Set(
        transportistas
          .filter((t) => t.fields.Origen === origen)
          .map((t) => t.fields.Destino)
      ),
    ];
  }, [transportistas, origen]);

  const tiposCargamento = useMemo(() => {
    if (!origen || !destino) return [];
    return [
      ...new Set(
        transportistas
          .filter(
            (t) => t.fields.Origen === origen && t.fields.Destino === destino
          )
          .map((t) => t.fields["Tipo de Cargamento Actual"])
      ),
    ];
  }, [transportistas, origen, destino]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(origen, destino, tipoCargamento);
  };

  const handleOrigenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrigen(e.target.value);
    setDestino("");
    setTipoCargamento("");
  };

  const handleDestinoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDestino(e.target.value);
    setTipoCargamento("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-2">
        <label htmlFor="origen" className="block text-black mb-2">
          Origen:
        </label>
        <select
          id="origen"
          value={origen}
          onChange={handleOrigenChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione un origen</option>
          {origenes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="destino" className="block text-black mb-2">
          Destino:
        </label>
        <select
          id="destino"
          value={destino}
          onChange={handleDestinoChange}
          className="w-full p-2 border rounded"
          required
          disabled={!origen}
        >
          <option value="">Seleccione un destino</option>
          {destinos.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="tipoCargamento" className="block text-black mb-2">
          Tipo de Cargamento:
        </label>
        <select
          id="tipoCargamento"
          value={tipoCargamento}
          onChange={(e) => setTipoCargamento(e.target.value)}
          className="w-full p-2 border rounded"
          required
          disabled={!origen || !destino}
        >
          <option value="">Seleccione un tipo de cargamento</option>
          {tiposCargamento.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Buscar Transportista
      </button>
    </form>
  );
}

export default FormularioTransporte;
