import { Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-tech-gradient bg-clip-text text-transparent">
              Automet
            </h3>
            <p className="text-muted-foreground mt-2">
              Pioneros en Automatización Inteligente
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/autometve"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 Automet. Todos los derechos reservados. Pioneros en Automatización Inteligente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};