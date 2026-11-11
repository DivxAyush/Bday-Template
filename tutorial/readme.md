# 🎂 Birthday Website - Customization Guide

## Setup Instructions

### 1. Install Required Software
- **Node.js** (LTS version)
- **VS Code**

### 2. Run the Project
1. Open this project in VS Code
2. Open terminal (`Ctrl + ~`)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Click on the local link (`http://localhost:5173/`) to view your website!

---

## ⚡ Quick Name Change via `.env`

Open `.env` file in the root folder:
```env
VITE_RECIPIENT_NAME=uknown 1
VITE_NICKNAME=uknown
VITE_SENDER_NAME=Ayush
VITE_BIRTHDAY_YEAR=2026
```
Edit these values, save, and restart `npm run dev` to see the new names updated everywhere across the site!

---

## 🎨 How to Customize Content

### 📝 1. Change Text & Messages
Open `src/textConfig.js`:
- Edit cover page headlines & blurb.
- Customize the Birthday Letter paragraphs.
- Update photo captions & finale wishes.

### 📸 2. Change Photos
Go to `src/images/` folder and replace:
- `pic1.jpg` (Memory 1)
- `pic2.gif` (Memory 2)
- `pic3.jpg` (Memory 3)
- `intro.gif` (Cover illustration)
- `letter.png` (Photo pinned to letter)

### 🎵 3. Change Music & Covers
- Go to `src/music/` and add your `.mp3` files (`music1.mp3`, `music2.mp3`, `music3.mp3`).
- Go to `src/musiccover/` and add album art covers (`music1.gif`, `music2.gif`, `music3.jpg`).
