import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logisticsImage from "@/assets/logistics-case-study.jpg";
import ecommerceImage from "@/assets/ecommerce-case-study.jpg";

const caseStudies = [
  {
    image: logisticsImage,
    challenge: "El Reto",
    challengeText: "Una empresa de logística perdía incontables horas en la planificación manual de rutas, lo que resultaba en altos costes de combustible y retrasos en las entregas.",
    solution: "La Solución Automet",
    solutionText: "Implementamos un sistema de IA que analiza el tráfico y las cargas en tiempo real para calcular y asignar las rutas más eficientes de forma automática cada mañana.",
    results: [
      "Reducción del 98% en tiempo de planificación.",
      "15% de ahorro en costes de combustible.",
      "Aumento del 30% en la puntualidad de entregas."
    ]
  },
  {
    image: ecommerceImage,
    challenge: "El Reto",
    challengeText: "Una tienda online de moda sufría de abandono de carritos y no lograba conectar con sus clientes para ofrecer recomendaciones personalizadas de forma efectiva.",
    solution: "La Solución Automet",
    solutionText: "Desarrollamos un chatbot con IA que interactúa con los visitantes, entiende sus preferencias de estilo y ofrece recomendaciones de productos en tiempo real, 24/7.",
    results: [
      "Aumento del 40% en la conversión de ventas.",
      "Reducción del 60% en el abandono de carritos.",
      "92% de satisfacción del cliente con el chatbot."
    ]
  }
];

export const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-tech-gradient bg-clip-text text-transparent">
          Casos de Éxito Reales
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card 
              key={index}
              className="group overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={study.image}
                  alt={`Case Study ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">{study.challenge}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.challengeText}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">{study.solution}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.solutionText}
                    </p>
                  </div>
                </div>
              </CardContent>

              <div className="bg-accent/10 p-6 border-t">
                <h4 className="text-lg font-bold text-accent mb-4">Resultados</h4>
                <div className="space-y-2">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};