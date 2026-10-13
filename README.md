# Mimora Digital · Site

Site de apresentação da **Mimora Digital**, papelaria digital com calendários, planners, papéis para cartas, slides e muito mais.

- Carrossel "polaroid" no meio da página (`PolaroidLineCarousel`), com fotos presas numa linha que balança
- Visual de "papel recortado" com fitas adesivas e bordas serradas
- Link para o Instagram [@mimora_arquivos](https://www.instagram.com/mimora_arquivos/)
- Rodapé com os direitos da Mimora Digital e o crédito do criador (Vicente)

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- lucide-react para os ícones
- Estrutura shadcn: componentes em `src/components/ui/`, alias `@/` apontando para `src/`

## Rodar localmente

Você precisa do [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Para gerar a versão final:

```bash
npm run build      # gera a pasta dist/
npm run preview    # testa a pasta dist/ localmente
```

## Estrutura

```
public/
  favicon.png
  images/
    brand/logo.png          logo da Mimora (recorte do perfil)
    produtos/*.jpg          fotos dos arquivos (usadas no carrossel e na galeria)
  audio/musica.mp3        música de fundo (botão flutuante no canto inferior esquerdo)
src/
  App.tsx                   seções do site
  index.css                 tema (cores, fontes) e estilo "papel recortado"
  components/ui/polaroid-line-carousel.tsx   carrossel de fotos no meio do site
  lib/utils.ts              função cn() do shadcn
.github/workflows/deploy.yml       deploy automático no GitHub Pages
```

### Onde trocar textos e links

- Link do Instagram, nome do perfil: topo de `src/App.tsx` (`INSTAGRAM_URL`, `INSTAGRAM_HANDLE`)
- Produtos listados: constante `PRODUCTS` em `src/App.tsx`
- Exemplos da galeria: constante `EXAMPLES` em `src/App.tsx`
- Passos de "Como funciona": constante `STEPS` em `src/App.tsx`
- Cores e fontes: bloco `@theme` em `src/index.css`
- Fotos do carrossel: constante `SHOWCASE` em `src/App.tsx`
- Música de fundo: troque o arquivo `public/audio/musica.mp3` (mantenha esse nome ou ajuste o caminho em `MusicToggle`, em `src/App.tsx`)

## Publicar no GitHub Pages (grátis)

1. Crie um repositório **vazio** no GitHub (ex.: `mimora-site`), sem README.
2. Envie o código:

```bash
git init
git add .
git commit -m "primeira versão do site da Mimora"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/mimora-site.git
git push -u origin main
```

3. No GitHub, vá em **Settings → Pages** e em **Build and deployment → Source** escolha **GitHub Actions**.
4. Cada `git push` na `main` publica o site automaticamente. O endereço será:
   `https://SEU-USUARIO.github.io/mimora-site/`

O `vite.config.ts` usa `base: "./"`, então o site funciona tanto nesse endereço quanto em um domínio próprio.

## Domínio próprio

Quando você tiver o domínio (ex.: `mimora.com.br`):

1. Em **Settings → Pages → Custom domain**, digite o domínio e salve.
2. No painel de DNS do domínio, crie:
   - Registros `A` apontando para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`
   - (opcional, para `www`) um registro `CNAME` de `www` para `SEU-USUARIO.github.io`
3. Marque **Enforce HTTPS** quando o GitHub liberar a opção.
