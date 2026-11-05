# Portfólio — Aldrey Ramos

Site portfólio de Aldrey Ramos (aldreyramotion) — Editor de Vídeo, Motion Designer e Ilustrador de Recife, PE.

---

## Estrutura de arquivos

```
portfolio-aldrey/
├── index.html          ← Home / Work (grade de projetos)
├── project.html        ← Página individual de projeto (dinâmica via ?id=)
├── demoreel.html       ← Página Demo Reel
├── sobre.html          ← Página Sobre
├── contato.html        ← Página Contato
│
├── css/
│   └── style.css       ← Todo o visual do site
│
├── js/
│   ├── projects.js     ← ARQUIVO DE DADOS — edite aqui para tudo
│   └── main.js         ← Lógica: cursor, filtro, animações, lazy load
│
├── assets/
│   ├── aldrey-foto.jpg ← Foto do Aldrey (coloque aqui)
│   ├── aldrey-foto.svg ← Placeholder SVG (removido quando o JPG estiver presente)
│   └── og-image.jpg    ← Imagem Open Graph (recomendado: 1200×630px)
│
└── media/
    ├── gifs/           ← Prévias GIF dos projetos (se usar arquivos locais)
    ├── videos/         ← Vídeos completos MP4 (se usar arquivos locais)
    └── images/         ← Imagens de flyers (se usar arquivos locais)
```

---

## Como abrir o site localmente

Abra o `index.html` direto no navegador — funciona sem servidor.

> **Atenção com GIFs/vídeos do Google Drive:** Alguns navegadores bloqueiam requisições
> cross-origin em modo `file://`. Para testar com mídias do Drive, use um servidor local simples:
>
> ```bash
> # Python 3
> python -m http.server 8000
> # Acesse: http://localhost:8000
> ```

---

## Como adicionar a foto do Aldrey

1. Salve a foto como `assets/aldrey-foto.jpg` (ou `.png` / `.webp`).
2. Se o nome do arquivo for diferente, abra `sobre.html` e troque o `src` na tag `<img>`.
3. Recomendado: proporção **3:4** ou **1:1**, mínimo **600px de largura**.

---

## Como trocar um ID do Google Drive

Abra `js/projects.js` e localize o projeto pelo `id`. Troque os valores:

```js
{
  id:        "demoreel-2025",
  ...
  idArquivo: "1ABC123XYZ",   // ← ID do vídeo/arquivo principal
  idPrevia:  "1DEF456UVW",   // ← ID do GIF ou imagem de capa
}
```

**Como obter o ID:**
1. Abra o arquivo no Google Drive.
2. Clique em **Compartilhar** → **Qualquer pessoa com o link** → Visualizador.
3. Copie o link. Formato: `https://drive.google.com/file/d/XXXXXXXX/view`
4. O ID é a parte `XXXXXXXX` entre `/d/` e `/view`.

---

## Como trocar Drive por arquivos locais

No objeto do projeto em `projects.js`, mude:

```js
fonte: "local",          // era "drive"
// idArquivo e idPrevia não precisam mais de IDs do Drive
// O site vai procurar:
//   Prévia   → /media/gifs/{id}.gif   (ou /media/images/{id}.jpg para imagem)
//   Vídeo    → /media/videos/{id}.mp4
```

O `id` do projeto é o slug, ex: `"demoreel-2025"` → arquivo `media/videos/demoreel-2025.mp4`.

---

## Como usar YouTube ou Vimeo

```js
fonte:     "youtube",          // ou "vimeo"
idArquivo: "dQw4w9WgXcQ",     // ID do vídeo (parte final da URL do YouTube/Vimeo)
idPrevia:  "PLACEHOLDER_ID",  // ID do thumbnail no Drive (ou deixe como local)
```

---

## Como adicionar um projeto novo

No array `PROJETOS` em `js/projects.js`, copie e cole um objeto existente e preencha:

```js
{
  id:          "slug-unico-sem-espacos",
  titulo:      "Título do Projeto",
  categoria:   "vinhetas",          // deve ser um slug de CATEGORIAS
  ano:         "2025",              // ou "" se desconhecido
  descricao:   "Descrição curta.",
  ferramentas: ["After Effects"],
  tipo:        "video",             // "video" ou "imagem"
  fonte:       "drive",             // "drive" | "local" | "youtube" | "vimeo"
  idArquivo:   "ID_DO_DRIVE",
  idPrevia:    "ID_DO_GIF",
  linkBehance: "",                  // ou a URL completa
  destaque:    false,
},
```

Salve o arquivo — o site atualiza automaticamente.

---

## Como adicionar ou renomear uma categoria

No array `CATEGORIAS` em `js/projects.js`:

```js
const CATEGORIAS = [
  { slug: "todos",     label: "Todos"    },
  { slug: "vinhetas",  label: "Vinhetas" },
  // adicione aqui:
  { slug: "ilustracao", label: "Ilustração" },
];
```

- O `slug` deve ser único e sem espaços (use hífens).
- O `label` é o texto exibido no botão de filtro.
- Atualize `categoria` nos projetos que pertencem à nova categoria.

---

## Como publicar o site

### Vercel (recomendado — mais rápido)
1. Crie uma conta em [vercel.com](https://vercel.com).
2. Instale a CLI: `npm i -g vercel`
3. Na pasta do projeto: `vercel`
4. Siga as instruções. O site fica em `https://seu-projeto.vercel.app`.

### Netlify
1. Acesse [app.netlify.com](https://app.netlify.com) → "Add new site" → "Deploy manually".
2. Arraste a pasta `portfolio-aldrey` para a área de deploy.
3. Pronto — URL gerada na hora.

### GitHub Pages
1. Suba o projeto para um repositório GitHub.
2. Vá em **Settings → Pages → Source**: selecione a branch `main` e pasta `/`.
3. Acesse em `https://seuusuario.github.io/portfolio-aldrey/`.

---

## Itens que ficaram sem arquivo (placeholders)

Todos os 9 projetos estão com `idArquivo: "PLACEHOLDER_ID"` e `idPrevia: "PLACEHOLDER_ID"`.
O site exibe um skeleton animado elegante no lugar de cada mídia ausente.

| Projeto | Categoria | Tipo | Status |
|---|---|---|---|
| DEMOREEL 2025 | Demoreels | Vídeo | ⚠️ Aguarda ID |
| FESTA TDN – O MUNDO EM PIXEL | Eventos | Vídeo | ⚠️ Aguarda ID |
| LANÇAMENTO DO LUVINHA | Campanhas | Vídeo | ⚠️ Aguarda ID |
| Vinheta TH POR AQUI | Vinhetas | Vídeo | ⚠️ Aguarda ID |
| CLÁSSICOS INCOMPARÁVEIS | Campanhas | Vídeo | ⚠️ Aguarda ID |
| VSL BREEZE RESIDENCE | Campanhas | Vídeo | ⚠️ Aguarda ID |
| REC 'n' Play 2023 | Eventos | Vídeo | ⚠️ Aguarda ID |
| ESTAMPA INCENSÁRIOS | Flyers¹ | Imagem | ⚠️ Aguarda ID |
| PORTFOLIO 2022 | Demoreels | Vídeo | ⚠️ Aguarda ID |

¹ "Estampa Incensários" é uma ilustração salva na categoria `flyers` (estático).
  Se quiser criar uma categoria separada "Ilustração", adicione ao array `CATEGORIAS` em `projects.js`
  e mude `categoria: "ilustracao"` nesse projeto.

### Categorias sem nenhum projeto atribuído (ainda)
- **Campanha Política** — nenhum projeto das pastas do Drive foi listado. Adicione quando tiver IDs.
- **Edições e Inserts** — idem.
- **IA** — idem.

---

## Observações finais

- **Foto do Aldrey**: salve como `assets/aldrey-foto.jpg`. O site já está configurado para carregá-la automaticamente.
- **Open Graph**: crie uma imagem `assets/og-image.jpg` (1200×630px) para redes sociais.
- **Domínio personalizado**: após publicar, configure `aldreyramotion.com` (ou similar) nas configurações do Vercel/Netlify.
- **Dados inventados**: nenhum. Cargos, clientes e prêmios não foram adicionados por falta de informação. Bio reescrita em 1ª pessoa com base na bio do Behance fornecida.
