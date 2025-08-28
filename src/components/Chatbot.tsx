import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [robotState, setRobotState] = useState<'idle' | 'thinking' | 'typing'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setRobotState('thinking');
        setTimeout(() => {
          setRobotState('typing');
          setTimeout(() => {
            setMessages([{
              text: "¡Hola! Soy Meca, el robot de Automet 🤖 Estoy aquí para ayudarte con cualquier pregunta sobre nuestras soluciones de IA. ¿En qué puedo asistirte?",
              isBot: true,
              timestamp: new Date()
            }]);
            setRobotState('idle');
          }, 1000);
        }, 800);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setRobotState('thinking');

    // Simulate bot response
    setTimeout(() => {
      setRobotState('typing');
      setTimeout(() => {
        const botResponse: Message = {
          text: getBotResponse(inputValue),
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        setRobotState('idle');
      }, 1500);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const responses = [
      "¡Excelente pregunta! Nuestras soluciones de IA pueden transformar completamente tu negocio. ¿Te gustaría saber más sobre algún sector específico?",
      "Como robot de Automet, puedo decirte que la automatización con IA es el futuro. ¿Qué proceso de tu empresa te gustaría optimizar?",
      "¡Perfecto! Me encanta hablar sobre tecnología. Nuestros sistemas de IA aprenden y se adaptan constantemente. ¿Tienes algún desafío específico en mente?",
      "¡Fantástico! La IA puede ayudarte a ahorrar tiempo y costos significativamente. ¿Te interesa nuestra calculadora de ROI para ver el impacto potencial?",
      "¡Genial! Como Meca, te aseguro que nuestras soluciones son diseñadas a medida para cada cliente. ¿Quieres agendar una consulta gratuita?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const RobotAvatar = () => (
    <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
      {/* Robot Face */}
      <div className="relative">
        {/* Eyes */}
        <div className="flex space-x-1 mb-1">
          <div className={`w-1.5 h-1.5 bg-white rounded-full ${robotState === 'thinking' ? 'animate-pulse' : ''}`} />
          <div className={`w-1.5 h-1.5 bg-white rounded-full ${robotState === 'thinking' ? 'animate-pulse' : ''}`} />
        </div>
        {/* Mouth */}
        <div className={`w-2 h-0.5 bg-white rounded-full mx-auto ${robotState === 'typing' ? 'animate-bounce' : ''}`} />
        
        {/* Thinking animation */}
        {robotState === 'thinking' && (
          <div className="absolute -top-3 -right-3 flex space-x-0.5">
            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed left-6 bottom-6 z-50 w-14 h-14 rounded-full shadow-glow transition-all duration-300 ${
          isOpen ? 'rotate-180 scale-90' : 'hover:scale-110'
        }`}
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed left-6 bottom-24 z-40 w-80 h-96 animate-scale-in">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-primary to-primary-dark text-white p-4">
              <CardTitle className="flex items-center space-x-3">
                <RobotAvatar />
                <div>
                  <div className="text-lg font-bold">Meca</div>
                  <div className="text-xs opacity-90">Robot de Automet</div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          message.isBot
                            ? 'bg-muted text-foreground rounded-tl-sm'
                            : 'bg-primary text-primary-foreground rounded-tr-sm'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      disabled={isTyping || !inputValue.trim()}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};