# 🎥 Pasta de Vídeos de Background

Você pode adicionar vídeos em loop para usar como background cinematográfico nos slides (`public/videos/`):

### Formatos recomendados:
- `.mp4` (H.264 / AAC)
- `.webm` (ótima compressão para web)

### Como usar:
1. Coloque seus vídeos aqui (ex: `corporate-ambient.mp4`, `particles-flow.mp4`).
2. Adicione no slide desejado com as propriedades de autoplay:
   ```jsx
   <video
     autoPlay
     loop
     muted
     playsInline
     className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
     src="/videos/corporate-ambient.mp4"
   />
   ```
3. A apresentação continuará fluida e leve em 60fps!
