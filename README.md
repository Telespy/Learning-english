# ⚡ 5-Min English Morning Habit (PWA Mini-Game)

Um Web App PWA progressivo em estilo **mini-game com 30 fases desbloqueáveis sequencialmente**, construído para praticar frases de inglês no celular ou computador utilizando o hábito diário de 5 minutos.

---

## 🎯 Método das 5 Etapas (por Fase)

Cada uma das 30 fases é uma frase do dia a dia dividida rigorosamente em 5 etapas:
1. **Minuto 1 — Listen (Ouvir):** Escutar a pronúncia nativa da frase sem traduzir.
2. **Minuto 2 — Speak (Repetir):** Repetir a frase em voz alta 3 vezes (com contador interativo e validação por microfone via Web Speech STT).
3. **Minuto 3 — Change One Word (Alterar 1 Palavra):** Selecionar uma variação para a palavra em destaque na frase.
4. **Minuto 4 — Personalize (Moldar):** Adaptar e moldar a frase para a sua rotina real.
5. **Minuto 5 — Write & Lock in (Escrever e Travar):** Digitar a frase final personalizada para consolidá-la na memória e **desbloquear a próxima fase**!

---

## 📱 Instalação no Celular (PWA)

- **Android (Chrome):** Acesse o site implantado na Vercel, toque no menu de 3 pontos no canto superior direito e selecione **"Adicionar à Tela Inicial"**.
- **iOS (Safari):** Acesse o site no Safari, toque no ícone de **Compartilhar** e selecione **"Adicionar à Tela de Início"**.
- **Link para acesso:** https://learning-english-pearl.vercel.app/.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5 & CSS3 Pure (Vanilla):** Layout responsivo, Glassmorphism, Dark Theme e Stepper de progresso.
- **JavaScript (ES6+):** Motor do jogo de 30 fases e salvamento de progresso no `localStorage`.
- **Web Speech API:** Áudio nativo (TTS) + Reconhecimento de voz (STT).
- **Service Worker & Manifest.json:** Suporte completo a PWA e funcionamento offline.
