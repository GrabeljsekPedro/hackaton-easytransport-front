import { useState } from "react";
import Map from "./Map";
import FormularioTransporte from "./FormularioTransporte";

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

interface BaseProps {
  transportistas: Transportista[];
  encontrarMejorTransportista: (
    destino: string,
    origen: string,
    tipoCargamento: string
  ) => Transportista | undefined;
}

function Base({ transportistas, encontrarMejorTransportista }: BaseProps) {
  const [recomendacion, setRecomendacion] = useState("");

  // Usa transportistas en alguna parte, por ejemplo:
  console.log("Número de transportistas:", transportistas.length);

  const handleSubmit = (
    origen: string,
    destino: string,
    tipoCargamento: string
  ) => {
    const mejorTransportista = encontrarMejorTransportista(
      destino,
      origen,
      tipoCargamento
    );
    if (mejorTransportista) {
      const {
        Transportista,
        "Experiencia (años)": experiencia,
        "Días en Carretera": diasEnCarretera,
        "Porcentaje de Carga": porcentajeCarga,
        Descripcion,
      } = mejorTransportista.fields;
      setRecomendacion(`
        <h3 class="text-xl font-bold mb-2">${Transportista}</h3>
        <p><strong>Experiencia:</strong> ${experiencia} años</p>
        <p><strong>Días en Carretera:</strong> ${diasEnCarretera}</p>
        <p><strong>Porcentaje de Carga Actual:</strong> ${porcentajeCarga}%</p>
        <p><strong>Capacidad Disponible:</strong> ${100 - porcentajeCarga}%</p>
        <p class="mt-2"><strong>Descripción:</strong> ${Descripcion}</p>
      `);
    } else {
      setRecomendacion(
        '<p class="text-red-500">No se encontró un transportista adecuado para tus requerimientos.</p>'
      );
    }
  };

  return (
    <main className="h-[88%] grid grid-cols-2 gap-4 p-4">
      <div className="rounded-md p-4">
        <Map />
      </div>
      <div className="rounded-md">
        <FormularioTransporte
          onSubmit={handleSubmit}
          transportistas={transportistas}
        />
      </div>
      <div className="col-span-2 bg-slate-500 rounded-md p-4">
        <h2 className="text-2xl text-white mb-4">
          Recomendación del Transportista
        </h2>
        {recomendacion ? (
          <div
            className="bg-white p-4 rounded-md"
            dangerouslySetInnerHTML={{ __html: recomendacion }}
          />
        ) : (
          <p className="text-white">
            Aquí aparecerá la recomendación del mejor transportista.
          </p>
        )}
      </div>
    </main>
  );
}

export default Base;
