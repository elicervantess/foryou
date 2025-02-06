import React, { useEffect, useRef, useCallback, useMemo } from "react";

interface LocationInterface {
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: string;
  connections: LocationInterface[];
  wobble: number;
  wobbleSpeed: number;
  size: number;
  update: (width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  connectTo: (location: LocationInterface) => void;
  drawConnections: (ctx: CanvasRenderingContext2D) => void;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const icons = useMemo(
    () => [
      "❤️",
      "💖",
      "💘",
      "💝",
      "💞",
      "💕",
      "💓",
      "💗",
      "💟",
      "❣️",
    ],
    []
  );

  const Location = useCallback(
    class implements LocationInterface {
      x: number;
      y: number;
      vx: number;
      vy: number;
      icon: string;
      connections: LocationInterface[];
      wobble: number;
      wobbleSpeed: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.icon = icons[Math.floor(Math.random() * icons.length)];
        this.connections = [];
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * 20 + 30;
      }

      update(width: number, height: number) {
        this.wobble += this.wobbleSpeed;
        this.x += this.vx + Math.sin(this.wobble) * 0.5;
        this.y += this.vy + Math.cos(this.wobble) * 0.5;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.icon, this.x, this.y);
      }

      connectTo(location: LocationInterface) {
        if (!this.connections.includes(location)) {
          this.connections.push(location);
        }
      }

      drawConnections(ctx: CanvasRenderingContext2D) {
        this.connections.forEach((location) => {
          ctx.beginPath();
          ctx.moveTo(this.x + this.size / 2, this.y - this.size / 2);
          ctx.lineTo(
            location.x + location.size / 2,
            location.y - location.size / 2
          );
          ctx.strokeStyle = "rgba(255, 0, 0, 0.2)";
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
        });
      }
    },
    [icons]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const locations: InstanceType<typeof Location>[] = [];
    const locationCount = 50;
    const connectionDistance = 250;

    for (let i = 0; i < locationCount; i++) {
      locations.push(new Location(width, height));
    }

    const updateConnections = () => {
      locations.forEach((location) => {
        location.connections = [];
        locations.forEach((otherLocation) => {
          if (location !== otherLocation) {
            const dx = location.x - otherLocation.x;
            const dy = location.y - otherLocation.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
              location.connectTo(otherLocation);
            }
          }
        });
      });
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#FFEBEE");
      gradient.addColorStop(1, "#FFCDD2");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      drawBackground();

      locations.forEach((location) => {
        location.update(width, height);
      });

      updateConnections();

      locations.forEach((location) => {
        location.drawConnections(ctx);
      });

      locations.forEach((location) => {
        location.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [Location]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default React.memo(AnimatedBackground);
