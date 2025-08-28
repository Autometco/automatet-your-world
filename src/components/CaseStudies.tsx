import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const caseStudies = [
  {
    challenge: "El Reto",
    challengeText: "Una empresa de logística perdía incontables horas en la planificación manual de rutas, lo que resultaba en altos costes de combustible y retrasos en las entregas.",
    solution: "La Solución Automet",
    solutionText: "Implementamos un sistema de IA que analiza el tráfico y las cargas en tiempo real para calcular y asignar las rutas más eficientes de forma automática cada mañana.",
    results: [
      "Reducción del 98% en tiempo de planificación.",
      "15% de ahorro en costes de combustible.",
      "Aumento del 30% en la puntualidad de entregas."
    ],
    category: "Logística"
  },
  {
    challenge: "El Reto",
    challengeText: "Una tienda online de moda sufría de abandono de carritos y no lograba conectar con sus clientes para ofrecer recomendaciones personalizadas de forma efectiva.",
    solution: "La Solución Automet",
    solutionText: "Desarrollamos un chatbot con IA que interactúa con los visitantes, entiende sus preferencias de estilo y ofrece recomendaciones de productos en tiempo real, 24/7.",
    results: [
      "Aumento del 40% en la conversión de ventas.",
      "Reducción del 60% en el abandono de carritos.",
      "92% de satisfacción del cliente con el chatbot."
    ],
    category: "E-commerce"
  }
];

export const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-tech-gradient bg-clip-text text-transparent leading-tight tracking-tight">
            Casos de Éxito Reales
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo nuestras soluciones de IA han transformado negocios reales, generando resultados medibles y sostenibles.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card 
              key={index}
              className="group overflow-hidden hover:shadow-card-hover-enhanced transition-all duration-500 hover:-translate-y-2 animate-fade-in bg-gradient-to-br from-card to-card/80 border-0 shadow-elegant"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-bl-lg">
                  {study.category}
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <CardTitle className="text-xl font-semibold text-primary mb-3 flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {study.challenge}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {study.challengeText}
                    </CardDescription>
                  </div>
                  
                  <div className="border-l-2 border-primary/20 pl-6">
                    <CardTitle className="text-xl font-semibold text-accent mb-3 flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      {study.solution}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {study.solutionText}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-accent/5 rounded-xl border border-accent/10">
                  <h4 className="font-semibold text-accent mb-4 text-lg flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Resultados Medibles
                  </h4>
                  <div className="space-y-3">
                    {study.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};