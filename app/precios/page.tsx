export default function PreciosPage() {
  return (
    <main
      style={{
        padding: "40px 20px",
        textAlign: "center",
        color: "white",
      }}
    >
      {/* 🟢 TÍTULO */}
      <h1
        style={{
          fontFamily: "Eras, sans-serif",
          fontWeight: 700,
          fontSize: "36px",
          marginBottom: "30px",
        }}
      >
        Lista de Precios
      </h1>

      {/* 🟢 WRAPPER PARA CENTRAR BIEN */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // 👉 centra SIEMPRE (fix desktop)
        }}
      >
        <img
          src="/lista.jpg"
          alt="Lista de precios El Campito"
          className="precio-img" // 👉 usamos CSS en vez de JS
        />
      </div>
    </main>
  );
}