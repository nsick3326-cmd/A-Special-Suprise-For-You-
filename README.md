# HBDY — Interactive Birthday Experience ✨

A premium, highly polished, responsive MERN-stack interactive birthday experience built with love as a surprise gift. Designed with a Gen-Z aesthetic, Pinterest-inspired visual system, soft romantic color palette, 3D interactive envelope, mini-games, digital scrapbook, and ambient music controller.

---

## 🌟 Key Features

1. **Page 1 — Welcome (`/welcome`)**: Cinematic staggered text reveal, animated light particles, blurred gradient orbs, and magnetic entry button with confetti burst.
2. **Page 2 — Memories Scrapbook (`/memories`)**: Interactive digital scrapbook timeline with category filtering (Firsts, Adventures, Inside Jokes, Unforgettable) and full-screen story detail modals.
3. **Page 3 — Mini-Games (`/games`)**: 4 romantic replayable mini-games:
   - 🧠 *How Well Do You Know Us?* (Quiz with score evaluation)
   - 💖 *Catch The Heart* (20-second dynamic tap game with Web Audio sound FX)
   - 🧩 *Memory Match* (Card flipping puzzle with secret message unlock)
   - 🗺️ *Choose Our Future* (Interactive choose-your-adventure with witty responses)
   - ✨ *Secret Unlock Banner* triggering path to `/letter`.
4. **Page 4 — The Letter (`/letter`)**: Intimate cream/lavender backdrop with a 3D interactive envelope opening animation, typewriter handwritten letter reveal, and P.S. transition button.
5. **Page 5 — Finale (`/finale`)**: Cinematic countdown sequence (3.. 2.. 1..), customized name celebration banner, floating polaroid photo collage with parallax micro-rotations, confetti canvas explosion, emotional closing quote, and a live wish submission box.
6. **Global Music & Sound FX**:
   - Web Audio API synth sound generator (pops, flips, chimes, sparkles) — no broken audio asset links!
   - Global background ambient music controller via `MusicContext` with non-intrusive sound permission overlay.
7. **Secret Easter Eggs**:
   - 👑 Tap the HBDY top logo 5 times to reveal Secret #1.
   - 💌 Type `"love"` on your keyboard to reveal Secret #2.
   - ⭐ Click the tiny golden star in the top navbar to reveal Secret #3.
8. **Dual Mode Architecture**: Functions connected online to MongoDB or offline in standalone mode via `birthdayConfig.js`.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite, React Router v6, Tailwind CSS v3, Framer Motion, Lucide React icons, Canvas Confetti, Web Audio API.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB, Mongoose.

---

## 📂 Folder Structure

```text
HBDY/
│
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── src/
│       ├── components/        # Navbar, GlassCard, Envelope, PhotoCollage, Confetti, Particles
│       ├── pages/             # WelcomePage, MemoriesPage, GamesPage, LetterPage, FinalePage
│       ├── data/              # Centralized birthdayConfig.js
│       ├── context/           # MusicContext, SoundContext, EasterEggContext
│       ├── utils/             # soundFx.js, api.js
│       ├── index.css
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/                # db.js Mongoose connection
│   ├── controllers/           # memoryController, gameController, messageController
│   ├── models/                # Memory, GameResult, Message
│   ├── routes/                # memoryRoutes, gameRoutes, messageRoutes
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

In `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hbdy_db
CLIENT_URL=http://localhost:3000
```

---

## 🚀 Installation & Running

### 1. Frontend Setup (`client`)

```bash
cd client
npm install
npm run dev
```

The frontend will run locally at `http://localhost:3000`.

### 2. Backend Setup (`server`)

```bash
cd server
npm install
npm run dev
```

The backend server will run at `http://localhost:5000`.

---

## 🎨 Easy Customization Guide

You can easily customize all text, recipient name, memories, letter, photos, and game questions without altering any code logic!

Simply open:

```text
client/src/data/birthdayConfig.js
```

Change any of the following fields:

```javascript
export const birthdayConfig = {
  recipientName: "Aishuuu",
  nickname: "My Favorite Person",
  senderName: "N",
  
  // Custom intro text
  welcome: { ... },

  // Memories timeline
  memories: [ ... ],

  // Quiz questions & responses
  games: { ... },

  // Personal handwritten letter
  letter: { ... },

  // Finale photos & quote
  finale: { ... }
};
```

---

## 🔒 Production Build

To build the frontend for production deployment:

```bash
cd client
npm run build
```

---

## ❤️ Credits

Crafted with React, Tailwind CSS, Framer Motion, and endless attention to detail.
