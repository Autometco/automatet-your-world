import { Brain, Store, UserCog } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Brain,
    title: "IA para Empresas",
    description: "Implementamos soluciones de Análisis Predictivo y optimización de cadenas de suministro para máxima eficiencia."
  },
  {
    icon: Store,
    title: "IA para Locales", 
    description: "Automatizamos el inventario con Visión por Computadora y mejoramos la atención con Chatbots Inteligentes."
  },
  {
    icon: UserCog,
    title: "IA para el Día a Día",
    description: "Creamos asistentes personales y sistemas de domótica que se anticipan a tus necesidades y simplifican tu vida."
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-tech-gradient bg-clip-text text-transparent">
          Nuestras Soluciones de Automatización Inteligente
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};