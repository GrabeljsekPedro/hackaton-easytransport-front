import { useState, useEffect } from 'react';
import Airtable from 'airtable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Landing from "./components/Landing";
import FormularioTransporte from "./components/FormularioTransporte";
import axios from 'axios';

// Configurar Airtable
const base = new Airtable({apiKey: import.meta.env.VITE_REACT_APP_AIRTABLE_API_KEY}).base(import.meta.env.VITE_REACT_APP_AIRTABLE_BASE_ID);
interface Transportista {
  id: string;
  fields: {
    Nombre: string;
    Destino: string;
    Origen: string;
    TipoCargamento: string;
    DiasEnCarretera: number;
    PorcentajeCarga: number;
    CapacidadRestante: number;
    Experiencia: number;
    CondicionVehiculo: string;
    Kilometraje: number;
  };
}

function App() {
  const [transportistas, setTransportistas] = useState<Transportista[]>([]);
  const [recomendacion, setRecomendacion] = useState<string>('');

  useEffect(() => {
    base('Transportistas').select({
      view: "Grid view"
    }).eachPage((records: Airtable.Records<Airtable.FieldSet>, fetchNextPage: () => void) => {
      setTransportistas(records.map(record => ({
        id: record.id,
        fields: record.fields as Transportista['fields']
      })));
      fetchNextPage();
    }, (err: Error | null) => {
      if (err) { console.error(err); return; }
    });
  }, []);

  const encontrarMejorTransportista = (destino: string, origen: string, tipoCargamento: string) => {
    return transportistas.find(t => 
      t.fields.Destino === destino &&
      t.fields.Origen === origen &&
      t.fields.TipoCargamento === tipoCargamento
    );
  };

  const obtenerRecomendacionIA = async (transportista: Transportista) => {
    const prompt = `Basándote en la siguiente información del transportista, explica por qué es la mejor opción para el transporte:
    Nombre: ${transportista.fields.Nombre}
    Experiencia: ${transportista.fields.Experiencia} años
    Condición del vehículo: ${transportista.fields.CondicionVehiculo}
    Días en carretera: ${transportista.fields.DiasEnCarretera}
    Porcentaje de carga: ${transportista.fields.PorcentajeCarga}%
    Capacidad restante: ${transportista.fields.CapacidadRestante}%
    Kilometraje: ${transportista.fields.Kilometraje} km`;

    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: prompt,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error al obtener recomendación de IA:', error);
      return 'No se pudo obtener una recomendación en este momento.';
    }
  };

  const manejarEnvioFormulario = async (destino: string, origen: string, tipoCargamento: string) => {
    const mejorTransportista = encontrarMejorTransportista(destino, origen, tipoCargamento);
    if (mejorTransportista) {
      const recomendacionIA = await obtenerRecomendacionIA(mejorTransportista);
      setRecomendacion(recomendacionIA);
    } else {
      setRecomendacion('No se encontró un transportista adecuado para tus requerimientos.');
    }
  };

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/transporte" element={
            <FormularioTransporte 
              onSubmit={manejarEnvioFormulario} 
              recomendacion={recomendacion} 
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
