function App() {
  return (
    <body className="h-screen">
      <header className="h-[12%] bg-slate-600 content-center">
        <h1 className="text-4xl text-white">EasyTransport</h1>
      </header>
      <main className="h-[88%] grid grid-cols-2 gap-4 p-4">
        <div className="bg-slate-500 rounded-md">Hola</div>
        <div className="bg-slate-500 rounded-md">Hola</div>
        <div className="col-span-2 bg-slate-500 rounded-md">Hola</div>
      </main>
    </body>
  );
}

export default App;
