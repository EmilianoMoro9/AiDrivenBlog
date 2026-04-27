import type { CSSProperties } from "react";
import Navbar from "@/components/Navbar";

const containerStyle: CSSProperties = {
  background: "rgba(14, 10, 8, 0.88)",
  border: "1px solid rgba(210, 175, 130, 0.12)",
  borderRadius: "2px",
  padding: "clamp(32px, 5vw, 56px) clamp(28px, 6vw, 64px)",
  maxWidth: "760px",
  margin: "0 auto",
};

const labelStyle: CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  color: "var(--accent-color)",
  marginBottom: "20px",
};

const headingStyle: CSSProperties = {
  fontSize: "clamp(1.45rem, 3.5vw, 2rem)",
  fontWeight: 300,
  color: "rgba(240, 225, 200, 0.92)",
  lineHeight: 1.3,
  marginBottom: "28px",
};

const bodyStyle: CSSProperties = {
  fontSize: "1rem",
  fontWeight: 300,
  lineHeight: 1.85,
  color: "rgba(200, 185, 170, 0.80)",
};

export default function ArtPage() {
  return (
    <>
      <Navbar />
      <main
        className="art-parallax"
        style={{
          backgroundImage: "url('/images/Rooms_by_the_Sea_1951.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 80px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(240, 225, 200, 0.52)",
              marginBottom: "32px",
              textShadow: "0 1px 12px rgba(0,0,0,0.92)",
            }}
          >
            Emiliano Moro — Una construcción en progreso
          </p>

          <h1
            style={{
              fontSize: "clamp(4.5rem, 11vw, 8.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "rgba(250, 240, 225, 0.96)",
              textShadow:
                "0 2px 60px rgba(0,0,0,0.92), 0 0 100px rgba(0,0,0,0.55)",
              marginBottom: "28px",
            }}
          >
            ¿Arte?
          </h1>

          <p
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              fontWeight: 300,
              color: "rgba(235, 220, 200, 0.70)",
              maxWidth: "500px",
              lineHeight: 1.75,
              textShadow: "0 1px 24px rgba(0,0,0,0.98)",
            }}
          >
            Una red social para los que crean con las manos, los ojos y el alma.
          </p>

          {/* Scroll hint */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "44px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              opacity: 0.38,
            }}
          >
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(240,225,200,1)",
              }}
            >
              scroll
            </span>
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none" aria-hidden="true">
              <path
                d="M6 0v12M1 7l5 6 5-6"
                stroke="rgba(240,225,200,1)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* ── 01 · La Mirada ───────────────────────────────── */}
        <section style={{ padding: "0 24px 100px" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>01 — La Mirada</p>
            <h2 style={headingStyle}>
              El silencio que la tecnología todavía no sabe hacer
            </h2>
            <div style={bodyStyle}>
              <p>
                Hay algo que los algoritmos todavía no saben hacer: detenerse
                frente a una obra y quedarse en silencio.
              </p>
              <p style={{ marginTop: "20px" }}>
                Desde que empecé a programar, siempre me llamó la atención esa
                brecha. Los sistemas de recomendación optimizan para el
                engagement, no para la contemplación. Instagram convirtió el
                arte en contenido. Pinterest lo convirtió en mood board. Ninguno
                de los dos se pregunta qué siente el artista cuando crea, ni qué
                debería sentir el espectador cuando mira.
              </p>
              <p style={{ marginTop: "20px" }}>Yo sí me lo pregunto.</p>
            </div>
          </div>
        </section>

        {/* ── 02 · La Red ──────────────────────────────────── */}
        <section style={{ padding: "0 24px 100px" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>02 — La Red</p>
            <h2 style={headingStyle}>
              Una plataforma donde el contexto importa tanto como la obra
            </h2>
            <div style={bodyStyle}>
              <p>
                La idea nació mientras cursaba Ingeniería en Sistemas y visitaba
                exposiciones de arte los fines de semana como forma de
                descomprimir.
              </p>
              <p style={{ marginTop: "20px" }}>
                Quiero construir una red social que ponga al artista en el
                centro, no al algoritmo. Una plataforma donde puedas descubrir
                quién pintó{" "}
                <em style={{ color: "rgba(240,225,200,0.90)" }}>
                  Rooms by the Sea
                </em>{" "}
                y entender por qué Hopper pasó años fascinado con la luz que
                entra por las ventanas. Donde la profundidad sea un feature, no
                un bug.
              </p>
              <p style={{ marginTop: "20px" }}>
                El MVP combina perfiles de artistas con obra comentada, un feed
                curado por categoría y movimiento —no por viralidad— y un
                formato de cuaderno de artista donde el proceso importa tanto
                como el resultado.
              </p>
              <p
                style={{
                  marginTop: "24px",
                  fontStyle: "italic",
                  color: "rgba(220, 200, 170, 0.58)",
                  fontSize: "0.95rem",
                }}
              >
                No es una galería digital. Es una conversación.
              </p>
            </div>
          </div>
        </section>

        {/* ── 03 · El Porqué ───────────────────────────────── */}
        <section style={{ padding: "0 24px 100px" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>03 — El Porqué</p>
            <h2 style={headingStyle}>
              Construir lo que el mercado todavía no construyó
            </h2>
            <div style={bodyStyle}>
              <p>
                Soy ingeniero por vocación y sensible por naturaleza. Esa
                combinación rara vez aparece junta en los equipos de producto de
                las startups tecnológicas, y creo que es exactamente por eso que
                el software que consume arte sigue sintiéndose frío.
              </p>
              <p style={{ marginTop: "20px" }}>
                Quiero cambiar eso. Y la única manera de hacerlo, lo aprendí
                rápido, es construirlo yo mismo.
              </p>
            </div>
          </div>
        </section>

        {/* ── Cierre ───────────────────────────────────────── */}
        <section
          style={{
            padding: "0 24px 140px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(240, 225, 200, 0.76)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: 1.72,
              textShadow: "0 1px 20px rgba(0,0,0,0.98)",
            }}
          >
            &ldquo;Si sos artista, curador, o simplemente alguien que cree que
            el arte merece mejor tecnología &mdash; hablemos.&rdquo;
          </p>
          <a href="mailto:emimoro2003@gmail.com" className="art-cta-btn">
            emimoro2003@gmail.com
          </a>
        </section>
      </main>
    </>
  );
}
