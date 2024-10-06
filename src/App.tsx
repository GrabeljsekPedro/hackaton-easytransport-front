import { useState, useEffect } from 'react';
import Airtable from 'airtable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Landing from "./components/Landing";
import Base from "./components/Base";

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

function App() {
  const [transportistas, setTransportistas] = useState<Transportista[]>([]);

  useEffect(() => {
    const airtableBase = new Airtable({apiKey: import.meta.env.VITE_REACT_APP_AIRTABLE_API_KEY}).base(import.meta.env.VITE_REACT_APP_AIRTABLE_BASE_ID);
    airtableBase('Transportistas').select({
      view: "Grid view"
    }).eachPage((records, fetchNextPage) => {
      setTransportistas(records.map(record => ({
        id: record.id,
        fields: record.fields as Transportista['fields']
      })));
      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error('Error al cargar datos de Airtable:', err);
      }
    });
  }, []);

  const encontrarMejorTransportista = (destino: string, origen: string, tipoCargamento: string) => {
    return transportistas.find(t => 
      t.fields.Destino === destino &&
      t.fields.Origen === origen &&
      t.fields["Tipo de Cargamento Actual"] === tipoCargamento
    );
  };

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/transporte" element={
            <Base 
              transportistas={transportistas}
              encontrarMejorTransportista={encontrarMejorTransportista}
            />
          } />
          <Route path="/base" element={
            <Base 
              transportistas={transportistas}
              encontrarMejorTransportista={encontrarMejorTransportista}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;