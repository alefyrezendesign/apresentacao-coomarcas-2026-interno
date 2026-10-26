# 📁 Pasta de Backgrounds (Imagens)

Você pode adicionar imagens personalizadas de fundo nesta pasta (`public/backgrounds/`):

### Como usar:
1. Coloque seus arquivos de imagem aqui (ex: `hero-bg.jpg`, `abstract-dark.png`, `pattern.svg`).
2. No código do React (`src/slides/` ou `src/App.jsx`), você pode referenciá-las diretamente pelo caminho público:
   ```jsx
   <div style={{ backgroundImage: "url('/backgrounds/hero-bg.jpg')" }} />
   ```
3. A imagem será carregada automaticamente sem precisar importar no JavaScript!
