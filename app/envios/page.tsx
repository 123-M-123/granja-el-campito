export default function EnviosPage() {
  return (
    <main style={{ padding: "40px 20px", textAlign: "center" }}>

      {/* TITULO */}
      <h1 style={{
        fontFamily: "Eras",
        fontWeight: 700,
        color: "#064e2a",
        marginBottom: "10px"
      }}>
        Puntos de Distribución
      </h1>

      {/* SUB */}
      <p style={{
        opacity: 0.8,
        marginBottom: "30px"
      }}>
        Consultá nuestras zonas de entrega en AMBA
      </p>

      {/* DESKTOP */}
      <img
        src="/mapa-envios-desktop.jpg"
        alt="Mapa envíos desktop"
        className="mapa-img mapa-desktop"
      />

      {/* MOBILE */}
      <img
        src="/mapa-envios-mobile.jpg"
        alt="Mapa envíos mobile"
        className="mapa-img mapa-mobile"
      />

    </main>
  );
}