import { useRef, useState, type CSSProperties } from "react";
import {
  CalendarDays,
  Check,
  ClipboardList,
  FileText,
  Heart,
  Mail,
  Menu,
  Pause,
  Play,
  Presentation,
  Sheet,
  Sparkles,
  X,
} from "lucide-react";
import PolaroidLineCarousel, { type Slide } from "@/components/ui/polaroid-line-carousel";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;
const INSTAGRAM_URL = "https://www.instagram.com/mimora_arquivos/";
const INSTAGRAM_HANDLE = "@mimora_arquivos";

const IMG = (file: string) => `${BASE}images/produtos/${file}`;
const LOGO = `${BASE}images/brand/logo.png`;

// Blob orgânico, parecido com as formas rosas dos slides da Mimora
const BLOB_PATH =
  "M45.3,-61.7C57.5,-52.4,64.9,-37.2,68.7,-21.1C72.5,-5,72.7,12.1,66.8,26.2C60.9,40.3,48.9,51.3,35.4,59.4C21.9,67.5,7,72.7,-7.3,71.5C-21.6,70.3,-35.1,62.7,-47.2,52.3C-59.3,41.9,-70,28.7,-72.4,13.8C-74.8,-1.1,-69,-17.7,-59.7,-31.1C-50.4,-44.5,-37.6,-54.7,-23.9,-62.7C-10.2,-70.7,4.4,-76.5,19.6,-74.6C34.8,-72.7,33.1,-71,45.3,-61.7Z";

// Borda serrada, como papel recortado com tesoura
function zigzagClip(teeth = 36, depth = 14) {
  const points: string[] = ["0% 0%", "100% 0%"];
  for (let i = 0; i <= teeth; i++) {
    const x = 100 - (i / teeth) * 100;
    const y = 100 - (i % 2 === 0 ? depth : 0);
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${points.join(",")})`;
}
const ZIGZAG = zigzagClip();

function Blob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 opacity-60", className)}
    >
      <path d={BLOB_PATH} fill="currentColor" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function InstagramButton({
  className,
  children = "Seguir no Instagram",
}: {
  className?: string;
  children?: string;
}) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[0_8px_18px_-8px_rgba(107,52,40,0.55)] transition hover:-translate-y-0.5 hover:brightness-105",
        className,
      )}
    >
      <InstagramIcon className="h-5 w-5" />
      {children}
    </a>
  );
}

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#produtos", label: "Produtos" },
  { href: "#exemplos", label: "Exemplos" },
  { href: "#como-funciona", label: "Como funciona" },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md shadow-[0_6px_16px_-12px_rgba(107,52,40,0.5)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={LOGO} alt="Logo Mimora Digital" className="h-12 w-12 rounded-full" />
          <span className="font-display text-xl font-semibold leading-none">Mimora</span>
        </a>

        <nav className="hidden items-center gap-7 font-semibold md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border-2 border-primary px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            <InstagramIcon className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="rounded-full p-2 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 font-semibold md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-blush"
            >
              {link.label}
            </a>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-primary hover:bg-blush"
          >
            Instagram {INSTAGRAM_HANDLE}
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <Blob className="-top-24 -left-28 h-[460px] w-[460px] text-blush" />
      <Blob className="top-40 -right-32 h-[380px] w-[380px] text-accent/50" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-16 pb-24 md:grid-cols-2 md:pt-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm">
            <Sparkles className="h-4 w-4" /> organização • slides • criatividade
          </p>
          <h1 className="font-display text-5xl leading-[1.02] font-semibold md:text-6xl lg:text-7xl">
            Arquivos digitais para deixar{" "}
            <span className="relative inline-block text-primary">
              tudo mais fácil
              <svg
                viewBox="0 0 200 16"
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent"
                preserveAspectRatio="none"
              >
                <path d="M2 10 Q 50 2 100 9 T 198 6" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Aqui nós criamos arquivos digitais que são práticos e acessíveis, para deixar sua rotina
            mais organizada e criativa.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <InstagramButton />
            <a
              href="#exemplos"
              className="inline-flex items-center rounded-full border-2 border-foreground/15 bg-card px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-primary"
            >
              Ver exemplos
            </a>
          </div>
        </div>

        {/* Pilha de papéis recortados */}
        <div className="relative mx-auto h-[420px] w-full max-w-[420px] md:h-[500px]">
          <div className="paper paper-hover absolute top-6 left-0 w-[64%] p-3" style={{ "--rot": "-7deg" } as CSSProperties}>
            <span className="tape -top-3 left-1/2 -translate-x-1/2" style={{ "--tape": "-3deg" } as CSSProperties} />
            <img src={IMG("05-calendario-outubro.jpg")} alt="Calendário de outubro 2026" className="w-full" />
          </div>
          <div className="paper paper-hover absolute top-0 right-0 w-[60%] p-3" style={{ "--rot": "6deg" } as CSSProperties}>
            <span className="tape -top-3 left-1/2 -translate-x-1/2" style={{ "--tape": "4deg" } as CSSProperties} />
            <img src={IMG("07-carta-lilas.jpg")} alt="Papel para carta lilás" className="w-full" />
          </div>
          <div className="paper paper-hover absolute bottom-0 left-[18%] w-[68%] p-3" style={{ "--rot": "-2deg" } as CSSProperties}>
            <span className="tape -top-3 left-1/2 -translate-x-1/2" style={{ "--tape": "-6deg" } as CSSProperties} />
            <img src={IMG("03-minha-semana.jpg")} alt="Planner Minha Semana" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="paper relative mx-auto max-w-3xl px-8 py-14 text-center md:px-16" style={{ "--rot": "-1deg" } as CSSProperties}>
        <span className="tape -top-4 left-10" style={{ "--tape": "-8deg" } as CSSProperties} />
        <span className="tape -top-4 right-10" style={{ "--tape": "7deg" } as CSSProperties} />
        <h2 className="font-display text-4xl font-semibold md:text-5xl">O que a Mimora faz?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Aqui nós criamos arquivos digitais. Que são práticos e acessíveis, para deixar sua rotina
          mais organizada e criativa.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Práticos", "Acessíveis", "Organizados", "Criativos"].map((word) => (
            <span
              key={word}
              className="inline-flex items-center gap-1.5 rounded-full bg-blush px-4 py-2 font-bold text-foreground"
            >
              <Check className="h-4 w-4 text-primary" /> {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { icon: Mail, title: "Convites digitais", text: "Para avisar e encantar com estilo." },
  { icon: Presentation, title: "Slides", text: "Apresentações bonitas e práticas." },
  { icon: Sheet, title: "Planilhas", text: "Controle e organização num só lugar." },
  { icon: CalendarDays, title: "Calendários", text: "Meses lindos para planejar o seu ano." },
  { icon: Sparkles, title: "Logos", text: "Uma identidade visual com a sua cara." },
  { icon: ClipboardList, title: "Folhas de organização", text: "Cada detalhe no lugar certo." },
  { icon: FileText, title: "Papéis para cartas", text: "Para escrever com carinho." },
];

function Products() {
  return (
    <section id="produtos" className="relative bg-blush/50 py-24" style={{ clipPath: ZIGZAG }}>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="mb-14 text-center">
          <p className="font-bold uppercase tracking-[0.2em] text-primary">Produtos</p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Por aqui você pode encontrar
          </h2>
        </div>

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="paper paper-hover flex flex-col gap-4 rounded-md p-7"
              style={{ "--rot": `${[-2, 1.5, -1, 2, 1, -1.5, 2.5][i]}deg` } as CSSProperties}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-primary">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
              <p className="text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const SHOWCASE: Slide[] = [
  {
    image: IMG("05-calendario-outubro.jpg"),
    title: "Outubro 2026",
    caption: "Calendário com espaço para anotações, metas do mês e tarefas.",
    alt: "Calendário de outubro de 2026",
  },
  {
    image: IMG("02-calendario-agosto.jpg"),
    title: "Agosto 2026",
    caption: "Calendário com ilustrações de mar, em tons de azul.",
    alt: "Calendário de agosto de 2026",
  },
  {
    image: IMG("03-minha-semana.jpg"),
    title: "Minha Semana",
    caption: "Planner semanal para organizar cada dia da sua semana.",
    alt: "Planner Minha Semana",
  },
  {
    image: IMG("04-carta-mar-azul.jpg"),
    title: "Papel de carta · Mar",
    caption: "Peixes, medusas e corais, para escrever com carinho.",
    alt: "Papel para carta com temática de mar",
  },
  {
    image: IMG("06-carta-floral.jpg"),
    title: "Papel de carta · Floral",
    caption: "Flores aquareladas nas bordas e linhas para escrever.",
    alt: "Papel para carta floral",
  },
  {
    image: IMG("07-carta-lilas.jpg"),
    title: "Papel de carta · Lilás",
    caption: "Textura aquarela lilás com a assinatura Com carinho.",
    alt: "Papel para carta lilás",
  },
];

function Showcase() {
  return (
    <section id="vitrine" className="relative overflow-hidden bg-blush/40 pt-24 pb-20">
      <div className="mx-auto mb-6 max-w-6xl px-6 text-center">
        <p className="font-bold uppercase tracking-[0.2em] text-primary">Um passeio</p>
        <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Pelos nossos arquivos
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Arraste a linha ou use as setas para ver cada peça.
        </p>
      </div>

      <PolaroidLineCarousel
        slides={SHOWCASE}
        height="clamp(560px, 82svh, 740px)"
        background="transparent"
        string="#8a5a4c"
        ink="var(--color-foreground)"
        autoplay={5000}
        ariaLabel="Exemplos de arquivos da Mimora Digital"
      />

      <div className="mt-6 text-center">
        <InstagramButton>Ver mais no Instagram</InstagramButton>
      </div>
    </section>
  );
}

const EXAMPLES = [
  { file: "05-calendario-outubro.jpg", tag: "Calendário", title: "Outubro 2026", rot: -2 },
  { file: "02-calendario-agosto.jpg", tag: "Calendário", title: "Agosto 2026", rot: 1.5 },
  { file: "03-minha-semana.jpg", tag: "Planner", title: "Minha Semana", rot: -1 },
  { file: "06-carta-floral.jpg", tag: "Papel para carta", title: "Floral", rot: -1.5 },
  { file: "04-carta-mar-azul.jpg", tag: "Papel para carta", title: "Mar azul", rot: 1 },
  { file: "07-carta-lilas.jpg", tag: "Papel para carta", title: "Lilás aquarela", rot: -2 },
];

function Examples() {
  return (
    <section id="exemplos" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <p className="font-bold uppercase tracking-[0.2em] text-primary">Exemplos</p>
        <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          Alguns dos nossos arquivos
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Uma pequena amostra do que você encontra no Instagram.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-12">
        {EXAMPLES.map((item) => (
          <li key={item.file} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]">
            <figure
              className="paper paper-hover p-4"
              style={{ "--rot": `${item.rot}deg` } as CSSProperties}
            >
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-background">
                <img
                  src={IMG(item.file)}
                  alt={`${item.tag}: ${item.title}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-3 px-1">
                <span className="font-display text-xl font-semibold">{item.title}</span>
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-primary">
                  {item.tag}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-16 text-center">
        <InstagramButton>Ver mais arquivos no Instagram</InstagramButton>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "1",
    title: "Escolha seu arquivo",
    text: "Explore os modelos no Instagram e encontre o que combina com a sua rotina.",
  },
  {
    n: "2",
    title: "Receba digitalmente",
    text: "Tudo é 100% digital, simples e rápido de receber.",
  },
  {
    n: "3",
    title: "Use do seu jeito",
    text: "Abra no celular ou no computador e deixe tudo com a sua cara.",
  },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-accent/35 pt-28 pb-28" style={{ clipPath: ZIGZAG }}>
      <Blob className="-right-24 top-10 h-[360px] w-[360px] text-background" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="font-bold uppercase tracking-[0.2em] text-primary-foreground/90">Como funciona</p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            É simples, rápido e 100% digital
          </h2>
          <Heart className="mx-auto mt-5 h-7 w-7 fill-primary text-primary" />
        </div>

        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="paper paper-hover rounded-md p-8"
              style={{ "--rot": `${[-1.5, 1, -1][i]}deg` } as CSSProperties}
            >
              <span className="font-display flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
                {step.n}
              </span>
              <h3 className="font-display mt-6 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section id="instagram" className="mx-auto max-w-6xl px-6 py-24">
      <div className="paper relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-8 py-14 text-center md:px-14" style={{ "--rot": "1deg" } as CSSProperties}>
        <span className="tape -top-4 left-1/2 -translate-x-1/2" style={{ "--tape": "-2deg" } as CSSProperties} />
        <img src={LOGO} alt="" className="h-28 w-28 rounded-full shadow-md" />
        <div>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Siga a Mimora</h2>
          <p className="mt-3 text-xl font-bold text-primary">{INSTAGRAM_HANDLE}</p>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
            Novidades, lançamentos e arquivos novos para deixar a sua rotina mais organizada.
          </p>
        </div>
        <InstagramButton>Abrir o Instagram</InstagramButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-14 text-center">
        <img src={LOGO} alt="" className="h-16 w-16 rounded-full bg-background p-1" />
        <p className="font-display text-2xl font-semibold">Mimora Digital</p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-accent transition hover:text-background"
        >
          <InstagramIcon className="h-5 w-5" /> {INSTAGRAM_HANDLE}
        </a>
        <div className="h-px w-24 bg-background/25" />
        <p className="text-sm text-background/80">
          © 2026 Mimora Digital. Todos os direitos reservados.
        </p>
        <p className="text-sm text-background/80">
          Site criado por <span className="font-bold text-accent">Vicente</span>.
        </p>
      </div>
    </footer>
  );
}

// Música de fundo: o navegador só toca áudio depois de um clique do visitante
function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${BASE}audio/musica.mp3`}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar música" : "Tocar música"}
        aria-pressed={playing}
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-card px-4 py-3 text-sm font-bold text-primary shadow-[0_10px_24px_-10px_rgba(107,52,40,0.5)] transition hover:-translate-y-0.5"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {playing ? "Pausar música" : "Tocar música"}
      </button>
    </>
  );
}

function Site() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Showcase />
        <Examples />
        <HowItWorks />
        <InstagramSection />
      </main>
      <Footer />
      <MusicToggle />
    </>
  );
}

export default function App() {
  return <Site />;
}
