import { Link } from 'react-router-dom';

function Landing() {
  return (
    <main className="h-[88%] flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8">
      <h2 className="text-4xl font-bold mb-4">Logística Inteligente</h2>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Nuestra IA autónoma optimiza cada kilómetro y aprovecha hasta el 95% de la capacidad de carga.
      </p>
      <div className="space-y-4">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Eficiencia mejorada</span>
        </div>
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Optimización de rutas</span>
        </div>
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Ahorro de tiempo y recursos</span>
        </div>
      </div>
      <Link to="/base" className="mt-8 bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition-colors">
        Comenzar
      </Link>
    </main>
  );
}

export default Landing;