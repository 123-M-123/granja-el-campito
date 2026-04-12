"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  
  // Efecto Parallax de Scroll para todo el contenedor
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative h-[100vh] w-full overflow-hidden bg-[#009245] flex items-center justify-center">
      
      {/* Título Principal */}
      <div className="z-10 text-center text-white">
        <h1 className="text-5xl font-bold drop-shadow-lg">Granja Agroecológica</h1>
        <p className="text-xl italic">Producción Familiar Artesanal</p>
      </div>

      {/* BURBUJAS FLOTANTES (MENÚ) */}
      
      {/* 1. SECCIÓN HUEVOS (Lleva a #huevos) */}
      <motion.a 
        href="#huevos"
        style={{ y: y1 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-40 h-40 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
      >
        <img src="burbuja huevos.png" alt="Huevos" className="w-20 h-20 object-contain" />
        <span className="text-white font-bold text-sm">HUEVOS LIBRES</span>
      </motion.a>

      {/* 2. SECCIÓN MIEL (Lleva a #miel) */}
      <motion.a 
        href="#miel"
        style={{ y: y2 }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full bg-yellow-500/30 backdrop-blur-md border-2 border-yellow-400 flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
      >
        <img src="burbuja miel.png" alt="Miel" className="w-24 h-24 object-contain" />
        <span className="text-white font-bold text-lg text-center">MIEL<br/>ARTESANAL</span>
      </motion.a>

      {/* 3. SECCIÓN CORDEROS (Lleva a #corderos) */}
      <motion.a 
        href="#corderos"
        style={{ y: y1 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] left-[10%] w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
      >
        <span className="text-white font-bold text-xs uppercase text-center px-2">Corderos</span>
      </motion.a>

    </section>
  );
}
