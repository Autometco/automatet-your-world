import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ai-automation.jpg";

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let orbs: Orb[] = [];

    const colors = ["#3B82F6", "#10B981", "#6366F1", "#8B5CF6"];

    class Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 200 + 150;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius < 0 || this.x + this.radius > width) {
          this.vx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > height) {
          this.vy *= -1;
        }
      }
    }

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      orbs = [];
      for (let i = 0; i < 4; i++) {
        orbs.push(new Orb());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      orbs.forEach((orb) => {
        orb.update();
        orb.draw();
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => init();

    window.addEventListener("resize", handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="AI Automation Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full blur-3xl opacity-30"
        style={{ filter: "blur(100px)" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent leading-tight">
          El Futuro es Autónomo. Potenciamos tu Negocio con IA.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 animate-slide-up">
          Usamos el poder de la Inteligencia Artificial para crear automatizaciones que piensan, aprenden y optimizan por ti.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-glow animate-bounce-in"
          onClick={scrollToContact}
        >
          Diseña tu Solución de IA
        </Button>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary-glow rounded-full animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};