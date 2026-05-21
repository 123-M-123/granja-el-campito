import { getProductsFromSheets } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Se actualiza cada 1 hora para Meta

export async function GET() {
  try {
    const products = await getProductsFromSheets();
    const baseUrl = "https://granja-el-campito.vercel.app";

    // Construcción del XML compatible con Meta (RSS 2.0)
    let xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Catálogo El Campito</title>
    <link>${baseUrl}</link>
    <description>Productos de Miel Pura y derivados</description>`;

    products.forEach((p) => {
      // Limpiamos caracteres especiales de la descripción para no romper el XML
      const cleanDesc = p.descripcion.replace(/[<>&"']/g, "") || "Miel pura de abejas de El Campito";
      const availability = p.stock > 0 ? "in stock" : "out of stock";

      xml += `
    <item>
      <g:id>${p.id}</g:id>
      <g:title>${p.nombre}</g:title>
      <g:description>${cleanDesc}</g:description>
      <g:link>${baseUrl}/miel</g:link>
      <g:image_link>${p.imagen}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${p.precio} ARS</g:price>
      <g:brand>El Campito</g:brand>
      <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items &gt; Grains, Rice &amp; Cereal</g:google_product_category>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating catalog:", error);
    return new NextResponse("Error generating catalog", { status: 500 });
  }
}