"use client";
import { motion } from "framer-motion";

export default function SeccionMiel() {
  return (
    <section id="miel" className="min-h-screen w-full bg-[#fdfcf0] py-20 px-10">
      {/* Título de Sección */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#009245]">Nuestros Productos de Miel</h2>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-2"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* 1. MIEL ENVASADA (3 Imágenes: 2kg, 1kg, 1/2kg) */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-8 text-yellow-800">Miel Envasada</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {["2 KG", "1 KG", "1/2 KG"].map((peso) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={peso}
                className="w-48 h-48 rounded-full bg-white shadow-xl border-4 border-yellow-400 flex flex-col items-center justify-center overflow-hidden"
              >
                <img src="/tu-miel-envasada.png" alt={peso} className="w-24 h-24 object-contain" />
                <span className="font-bold text-gray-700">{peso}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. CARAMELOS (6 Versiones: v1 a v6) */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-8 text-yellow-800">Caramelos de Propóleo</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={v}
                className="w-32 h-32 rounded-full bg-white shadow-lg border-2 border-[#009245] flex items-center justify-center overflow-hidden"
              >
                <img src={`/caramelo-v${v}.png`} alt={`Versión ${v}`} className="w-20 h-20 object-contain" />
                {/* Aquí reemplazarás el src por tus imágenes v1, v2, etc */}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3, 4 y 5: OTROS PRODUCTOS (Diseño en fila para optimizar espacio) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* POLEN GRANULADO */}
          <div className="flex flex-col items-center">
            <h3 className="mb-4 font-bold uppercase tracking-wider">Polen Granulado</h3>
            <div className="w-40 h-40 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center shadow-inner overflow-hidden">
               <img src="/tu-polen.png" alt="Polen" />
            </div>
          </div>

          {/* TINTURA DE PROPOLEO */}
          <div className="flex flex-col items-center">
            <h3 className="mb-4 font-bold uppercase tracking-wider">Tintura de Propóleo</h3>
            <div className="w-40 h-40 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center shadow-inner overflow-hidden">
               <img src="/tu-tintura.png" alt="Tintura" />
            </div>
          </div>

          {/* MIEL EN PANAL */}
          <div className="flex flex-col items-center">
            <h3 className="mb-4 font-bold uppercase tracking-wider">Miel en Panal</h3>
            <div className="w-40 h-40 rounded-full bg-yellow-50 border-2 border-yellow-500 flex items-center justify-center shadow-inner overflow-hidden">
               <img src="/tu-panal.png" alt="Panal" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
