

/**
 * =========================================================================
 * 🛡️ MOTOR DE TEMAS MULTI-TENANT: EL TRIPLE ESCUDO (TIENDA CLIENTE)
 * =========================================================================
 * 1. Fallback estático en memoria si internet se corta.
 * 2. Inyección de variables CSS nativas en :root en el Server Component (cero parpadeos).
 * 3. Caché Edge ultrarrápida con tolerancia a fallos.
 */

export interface TiendaThemeConfig {
  colores?: {
    oscuro1?: string;
    oscuro2?: string;
    medio1?: string;
    medio2?: string;
    claro1?: string;
    claro2?: string;
    acento?: string;
  };
  dimensiones?: {
    buttonRadius?: number;
    imageRadius?: number;
    h1Size?: number;
  };
  modulos?: Record<string, boolean>;
}

// 🛡️ ESCUDO 1: FALLBACK ESTÁTICO DE FÁBRICA EN MEMORIA
// Si Supabase se apaga por completo, la tienda sigue viéndose perfecta con sus colores originales
const THEME_FALLBACK: TiendaThemeConfig = {
  colores: {
    oscuro1: "#064f2a",
    oscuro2: "#032b17",
    medio1: "#22c55e",
    medio2: "#16a34a",
    claro1: "#ffffff",
    claro2: "#d9f5e3",
    acento: "#86efac",
  },
  dimensiones: {
    buttonRadius: 50,
    imageRadius: 16,
    h1Size: 36,
  },
  modulos: {
    carruselHero: true,
    cintilla: true,
    trustBadges: true,
  },
};

/**
 * Consulta la configuración de diseño desde tdt.ar
 */
export async function getThemeConfig(gaId: string = "534606659"): Promise<TiendaThemeConfig> {
  try {
    const res = await fetch(`https://tdt.ar/api/tienda/config?gaId=${gaId}`, {
      next: { revalidate: 60, tags: [`theme-config-${gaId}`] },
    });

    if (!res.ok) return THEME_FALLBACK;

    const data = await res.json();
    if (!data.config) return THEME_FALLBACK;

    // Fusión segura con fallback de fábrica
    return {
      colores: { ...THEME_FALLBACK.colores, ...data.config.colores },
      dimensiones: { ...THEME_FALLBACK.dimensiones, ...data.config.dimensiones },
      modulos: { ...THEME_FALLBACK.modulos, ...data.config.modulos },
    };
  } catch (error) {
    console.warn("⚠️ Usando fallback estático de diseño en memoria:", error);
    return THEME_FALLBACK;
  }
}

/**
 * 🎨 Genera el bloque de estilo CSS inyectable en :root
 */
export function generarVariablesCss(theme: TiendaThemeConfig): string {
  const c = theme.colores || THEME_FALLBACK.colores!;
  const d = theme.dimensiones || THEME_FALLBACK.dimensiones!;

  return `
    :root {
      --color-oscuro-1: ${c.oscuro1 || "#064f2a"};
      --color-oscuro-2: ${c.oscuro2 || "#032b17"};
      --color-medio-1: ${c.medio1 || "#22c55e"};
      --color-medio-2: ${c.medio2 || "#16a34a"};
      --color-claro-1: ${c.claro1 || "#ffffff"};
      --color-claro-2: ${c.claro2 || "#d9f5e3"};
      --color-acento: ${c.acento || "#86efac"};

      --btn-radius: ${d.buttonRadius || 50}px;
      --img-radius: ${d.imageRadius || 16}px;
      --h1-size: ${d.h1Size || 36}px;
    }
  `.replace(/\s+/g, " ").trim();
}