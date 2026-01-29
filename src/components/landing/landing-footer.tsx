import Link from 'next/link';
import { Gamepad2, Github, Linkedin } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-background py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Steam Track</span>
          </Link>

          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Steam Tracker. Dados fornecidos pela
            Steam API.
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-xs text-muted-foreground">
              Desenvolvido por{' '}
              <a
                href="https://github.com/CarlosAlexandredevv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                CarlosAlexandredevv
              </a>
            </span>
            <div className="flex gap-3">
              <a
                href="https://github.com/CarlosAlexandredevv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/carlosalexandredev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-card border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
