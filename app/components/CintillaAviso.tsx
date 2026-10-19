import styles from './CintillaAviso.module.css'

export default function CintillaAviso() {
  return (
    <aside className={styles.cintilla} aria-label="Aviso de dominio">
      <span className={styles.icono}>📢</span>
      <p className={styles.texto}>
        Entrá a:{" "}
        <strong className={styles.dominio}>www.elcampito.tdt.ar</strong>
      </p>
    </aside>
  )
}