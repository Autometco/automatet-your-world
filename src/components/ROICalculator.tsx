import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ROICalculator = () => {
  const [employees, setEmployees] = useState(5);
  const [monthlySalary, setMonthlySalary] = useState(1200);
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [monthlyCost, setMonthlyCost] = useState(150);

  const [results, setResults] = useState({
    monthlySavings: 0,
    annualSavings: 0,
    roi: 0,
    breakeven: 0,
  });

  useEffect(() => {
    const monthlySavings = employees * monthlySalary;
    const annualSavings = monthlySavings * 12;
    const annualNetSavings = annualSavings - (monthlyCost * 12);
    
    let roi = 0;
    if (initialInvestment > 0) {
      roi = (annualNetSavings / initialInvestment) * 100;
    }

    let breakeven = Infinity;
    const netMonthlySavings = monthlySavings - monthlyCost;
    if (netMonthlySavings > 0) {
      breakeven = initialInvestment / netMonthlySavings;
    }

    setResults({
      monthlySavings,
      annualSavings,
      roi,
      breakeven: breakeven === Infinity ? 0 : breakeven,
    });
  }, [employees, monthlySalary, initialInvestment, monthlyCost]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="roi-calculator" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-tech-gradient bg-clip-text text-transparent">
          Calcula tu Retorno de Inversión (ROI)
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Usa nuestra calculadora para estimar el impacto financiero que la automatización con IA puede tener en tu negocio.
        </p>

        <Card className="max-w-6xl mx-auto shadow-elegant">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Inputs */}
            <div className="space-y-8">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl text-primary">Variables</CardTitle>
              </CardHeader>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Trabajadores en la tarea: <span className="text-primary font-bold">{employees}</span>
                  </Label>
                  <Slider
                    value={[employees]}
                    onValueChange={([value]) => setEmployees(value)}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Salario Promedio Mensual: <span className="text-primary font-bold">{formatCurrency(monthlySalary)}</span>
                  </Label>
                  <Slider
                    value={[monthlySalary]}
                    onValueChange={([value]) => setMonthlySalary(value)}
                    max={10000}
                    min={100}
                    step={50}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investment" className="text-base font-semibold">
                    Inversión Inicial ($)
                  </Label>
                  <Input
                    id="investment"
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    placeholder="Ej: 5000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenance" className="text-base font-semibold">
                    Costo de Mantenimiento Mensual ($)
                  </Label>
                  <Input
                    id="maintenance"
                    type="number"
                    value={monthlyCost}
                    onChange={(e) => setMonthlyCost(Number(e.target.value))}
                    placeholder="Ej: 150"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl text-primary">Resultados Estimados</CardTitle>
              </CardHeader>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Ahorro Mensual
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      {formatCurrency(results.monthlySavings)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Ahorro Anual
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      {formatCurrency(results.annualSavings)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      ROI (Primer Año)
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {results.roi.toFixed(0)}%
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Recuperas la Inversión en
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {results.breakeven > 0 ? `${results.breakeven.toFixed(1)} meses` : 'N/A'}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};