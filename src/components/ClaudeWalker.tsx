"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";

function RobotSVG() {
  return (
    <svg width="44" height="50" viewBox="-18 -32 36 38" fill="none">
      {/* Antenas */}
      <rect x="-9" y="-32" width="4" height="8" rx="1.5" fill="#D97736" />
      <circle cx="-7" cy="-33" r="2.2" fill="#F0A050" />
      <rect x="5" y="-32" width="4" height="8" rx="1.5" fill="#D97736" />
      <circle cx="7" cy="-33" r="2.2" fill="#F0A050" />

      {/* Cuerpo */}
      <rect x="-14" y="-25" width="28" height="19" rx="4" fill="#D97736" />
      {/* Pantalla */}
      <rect x="-10" y="-22" width="20" height="13" rx="2.5" fill="#C06B28" opacity="0.55" />

      {/* Ojos cuadrados */}
      <rect x="-8" y="-20" width="6" height="6" rx="1.5" fill="#1a1a1a" />
      <rect x="2" y="-20" width="6" height="6" rx="1.5" fill="#1a1a1a" />
      {/* Brillito en los ojos */}
      <rect x="-7" y="-19" width="2" height="2" rx="0.5" fill="white" />
      <rect x="3" y="-19" width="2" height="2" rx="0.5" fill="white" />

      {/* Boca pixel */}
      <rect x="-3" y="-11" width="2" height="2" rx="0.5" fill="#1a1a1a" />
      <rect x="1" y="-11" width="2" height="2" rx="0.5" fill="#1a1a1a" />
      <rect x="-1" y="-9.5" width="2" height="1.5" rx="0.5" fill="#1a1a1a" />

      {/* Brazo izquierdo (oscila) */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
      >
        <rect x="-22" y="-23" width="9" height="6" rx="2" fill="#C06B28" />
        <rect x="-24" y="-21" width="4" height="4" rx="1.5" fill="#D97736" />
      </motion.g>

      {/* Brazo derecho (fase opuesta) */}
      <motion.g
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
      >
        <rect x="13" y="-23" width="9" height="6" rx="2" fill="#C06B28" />
        <rect x="20" y="-21" width="4" height="4" rx="1.5" fill="#D97736" />
      </motion.g>

      {/* Pierna izquierda */}
      <motion.g
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 0.28, ease: "easeInOut" }}
      >
        <rect x="-10" y="-6" width="7" height="9" rx="2" fill="#C06B28" />
        <rect x="-12" y="1" width="10" height="4" rx="2" fill="#D97736" />
      </motion.g>

      {/* Pierna derecha (fase opuesta) */}
      <motion.g
        animate={{ y: [4, -4, 4] }}
        transition={{ repeat: Infinity, duration: 0.28, ease: "easeInOut" }}
      >
        <rect x="3" y="-6" width="7" height="9" rx="2" fill="#C06B28" />
        <rect x="3" y="1" width="10" height="4" rx="2" fill="#D97736" />
      </motion.g>
    </svg>
  );
}

export default function ClaudeWalker() {
  const [scope, animate] = useAnimate();
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    let active = true;

    async function loop() {
      await delay(2000);

      while (active) {
        if (!scope.current) break;

        // Reset: empieza 60px fuera por la izquierda
        animate(scope.current, { x: -60, y: 0, rotate: 0, opacity: 1 }, { duration: 0 });
        setShowBubble(false);

        // Body bob mientras camina
        animate(".walker-body", { y: [0, -6, 0] }, { repeat: Infinity, duration: 0.28, ease: "easeInOut" });

        // CAMINA de izquierda a derecha
        await animate(scope.current, { x: "calc(100% + 60px)" }, { duration: 6.5, ease: "linear" });

        // Para el bob
        animate(".walker-body", { y: 0 }, { duration: 0.1 });

        // Se asoma al borde (inclina)
        await animate(scope.current, { rotate: 25 }, { duration: 0.25 });
        await delay(180);

        // ¡Se da cuenta que no hay piso!
        setShowBubble(true);
        await animate(scope.current, { rotate: -10 }, { duration: 0.2 });
        await animate(scope.current, { rotate: 25 }, { duration: 0.2 });
        await delay(400);
        setShowBubble(false);

        // ¡¡CAAEE!! — gira 2 veces y se va para abajo
        await animate(
          scope.current,
          { y: 380, x: "calc(100% + 100px)", rotate: -760, opacity: 0 },
          { duration: 1.2, ease: [0.4, 0, 1, 1] }
        );

        await delay(6000);
      }
    }

    loop();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Wrapper ocupa todo el ancho del contenedor del título,
    // posicionado con su bottom en el TOP de las letras (bottom: 100%)
    <div
      ref={scope}
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "44px",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {/* Burbuja "¡!" */}
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          style={{
            position: "absolute",
            top: -40,
            left: 26,
            background: "var(--bg-secondary, #fff)",
            border: "1.5px solid var(--glass-border)",
            borderRadius: "8px",
            padding: "3px 8px",
            fontSize: "13px",
            fontWeight: 800,
            color: "#D97736",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
          }}
        >
          ¡!
        </motion.div>
      )}

      {/* Personaje con body-bob aplicado por clase */}
      <div className="walker-body">
        <RobotSVG />
      </div>
    </div>
  );
}
