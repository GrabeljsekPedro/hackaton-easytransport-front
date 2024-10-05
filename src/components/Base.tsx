import Map from "./Map";

function Base() {
  return (
    <main className="h-[88%] grid grid-cols-2 gap-4 p-4">
      <div className="w-full">
        <Map />
      </div>
      <div className="bg-slate-500 rounded-md">Hola</div>
      <div className="col-span-2 bg-slate-500 rounded-md">Hola</div>
    </main>
  );
}

export default Base;
