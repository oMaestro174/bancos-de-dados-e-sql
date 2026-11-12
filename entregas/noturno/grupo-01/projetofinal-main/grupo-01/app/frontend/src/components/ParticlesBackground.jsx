import { useEffect } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  useEffect(() => {
    let container;
    
    const initParticles = async () => {
      await loadSlim(tsParticles);
      container = await tsParticles.load({
        id: "tsparticles-canvas",
        options: {
          fullScreen: {
            enable: true,
            zIndex: -1
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#000000",
            },
            links: {
              color: "#000000",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }
      });
    };

    initParticles();

    return () => {
      if (container) {
        container.destroy();
      }
    };
  }, []);

  return <div id="tsparticles-canvas" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
