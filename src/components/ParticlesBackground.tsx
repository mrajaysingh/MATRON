import { useCallback } from 'react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-20"
      options={{
        fullScreen: false,
        fpsLimit: 120,
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#1a1a1a"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.15,
            random: false
          },
          size: {
            value: 4.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 2,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 120,
            color: "#1a1a1a",
            opacity: 0.15,
            width: 2
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce"
            },
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.25
              }
            },
            push: {
              quantity: 4
            }
          }
        },
        detectRetina: true,
        background: {
          color: "transparent"
        }
      }}
    />
  );
};

export default ParticlesBackground;