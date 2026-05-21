import { getProductsFromSheets } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Se actualiza cada 1 hora

// Función para limpiar textos y evitar el error "expecting ';'"
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&"']/g, (m) => {
    switch (m) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return m;
    }
  });
}

export async function GET() {
  try {
    const products = await getProductsFromSheets();
    const baseUrl = "https://granja-el-campito.vercel.app";

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Catálogo El Campito</title>
    <link>${baseUrl}</link>
    <description>Feed de productos para Meta Ads e Instagram Shopping</description>`;

    products.forEach((p) => {
      const availability = p.stock > 0 ? "in stock" : "out of stock";
      
      // Limpiamos los campos uno por uno para que Meta no los rechace
      const title = escapeXml(p.nombre);
      const description = escapeXml(p.descripcion || "Miel pura de abejas y derivados agroecológicos.");
      const category = escapeXml(p.categoria || "Food, Beverages & Tobacco > Food Items");

      xml += `
    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${baseUrl}/miel</g:link>
      <g:image_link>${escapeXml(p.imagen)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${p.precio} ARS</g:price>
      <g:brand>El Campito</g:brand>
      <g:google_product_category>${category}</g:google_product_category>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating catalog:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}