import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulated webhook submission - replace with actual webhook URL
      const webhookUrl = 'http://localhost:5678/webhook-test/0a2eb611-1d0e-49de-9392-9c84a9a4d826';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Gracias por tu interés. Nos pondremos en contacto contigo pronto.",
        });
        setFormData({
          companyName: "",
          businessType: "",
          firstName: "",
          lastName: "",
          email: ""
        });
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-tech-gradient bg-clip-text text-transparent">
          Hablemos de tu Proyecto de IA
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Completa este formulario y nuestro equipo de expertos en IA se pondrá en contacto contigo para diseñar una solución personalizada.
        </p>

        <Card className="max-w-2xl mx-auto shadow-elegant animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Solicitar Consulta IA</CardTitle>
            <CardDescription>
              Cuéntanos sobre tu proyecto y cómo podemos ayudarte a implementar automatización inteligente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-base font-medium">
                  Nombre de la Empresa (Opcional)
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-base font-medium">
                  Negocio al que quieres aplicar la automatización con IA *
                </Label>
                <Input
                  id="businessType"
                  name="businessType"
                  type="text"
                  value={formData.businessType}
                  onChange={handleChange}
                  placeholder="Ej: E-commerce, Logística, Manufactura..."
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base font-medium">
                    Nombre *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base font-medium">
                    Apellido *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Correo Electrónico *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg shadow-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Solicitar Consulta IA"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};