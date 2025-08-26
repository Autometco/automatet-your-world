import { MessageCircle, Compass, Settings, RotateCcw } from "lucide-react";

const processSteps = [
  {
    icon: MessageCircle,
    title: "1. Consulta",
    description: "Analizamos tus necesidades y los puntos clave donde la IA puede generar el mayor impacto."
  },
  {
    icon: Compass,
    title: "2. Diseño a Medida",
    description: "Creamos la arquitectura de tu solución de IA, seleccionando los modelos y tecnologías adecuadas."
  },
  {
    icon: Settings,
    title: "3. Implementación",
    description: "Entrenamos, integramos y desplegamos el sistema de IA en tu entorno de trabajo actual."
  },
  {
    icon: RotateCcw,
    title: "4. Soporte y Evolución",
    description: "Monitoreamos el rendimiento y re-entrenamos los modelos para una mejora continua."
  }
];

export const Process = () => {
  return (
    <section id="process" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-tech-gradient bg-clip-text text-transparent">
          Nuestro Proceso
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-accent z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div 
                key={step.title}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mx-auto w-20 h-20 bg-background border-4 border-primary rounded-full flex items-center justify-center mb-6 group-hover:border-accent group-hover:bg-primary/10 transition-all duration-300 shadow-elegant">
                  <step.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};