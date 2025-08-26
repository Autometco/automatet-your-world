import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿En cuánto tiempo veré resultados?",
    answer: "El tiempo para ver resultados tangibles varía según la complejidad del proyecto, pero muchos de nuestros clientes comienzan a notar mejoras en eficiencia y ahorro de costos en tan solo unas pocas semanas después de la implementación."
  },
  {
    question: "¿Mi negocio es demasiado pequeño para la IA?",
    answer: "¡Para nada! La automatización con IA es escalable y beneficiosa para empresas de todos los tamaños. Nuestras soluciones se adaptan a tus necesidades específicas, asegurando que obtengas un retorno de inversión positivo sin importar el tamaño de tu operación."
  },
  {
    question: "¿Qué tipo de soporte ofrecen después de la implementación?",
    answer: "Ofrecemos un soporte completo que incluye monitoreo continuo, mantenimiento y re-entrenamiento de los modelos de IA para asegurar un rendimiento óptimo a largo plazo. Tu éxito es nuestra prioridad."
  },
  {
    question: "¿Cómo garantizan la seguridad de nuestros datos?",
    answer: "Implementamos los más altos estándares de seguridad, incluyendo encriptación end-to-end, acceso controlado por roles y cumplimiento con regulaciones como GDPR. Todos nuestros sistemas están auditados regularmente por terceros especializados en ciberseguridad."
  },
  {
    question: "¿Pueden integrarse con nuestros sistemas existentes?",
    answer: "Sí, nuestras soluciones están diseñadas para integrarse perfectamente con la mayoría de sistemas empresariales existentes a través de APIs y conectores personalizados. Realizamos un análisis detallado de tu infraestructura actual antes de la implementación."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-tech-gradient bg-clip-text text-transparent">
          Preguntas Frecuentes
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 shadow-sm hover:shadow-elegant transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};