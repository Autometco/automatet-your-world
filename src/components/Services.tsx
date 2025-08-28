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
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-tech-gradient bg-clip-text text-transparent leading-tight tracking-tight">
            Soluciones de Automatización Inteligente
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformamos tu negocio con tecnología de vanguardia, diseñada específicamente para tus necesidades únicas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group hover:shadow-card-hover-enhanced transition-all duration-500 hover:-translate-y-2 animate-fade-in border-0 shadow-elegant bg-gradient-to-br from-card to-card/90"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center px-8 pb-8">
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
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