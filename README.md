# Outfit Builder WYSIWYG (Drag & Drop)

A modern, drag-and-drop **WYSIWYG outfit builder** built using **Next.js** and **React Dropzone**, designed to let users visually assemble outfits from a customizable wardrobe. This application supports image upload from local files, drag-and-drop onto a virtual canvas, and adding completed outfits to a cart.

---

## Features

- **Drag & Drop Interface** – Smooth drag-and-drop design and layering of outfit pieces.
- **Image Upload** – Upload clothing items via local file selection.
- **Real-Time Preview** – Instant rendering of items on a virtual canvas.
- **Remove & Replace** – Ability to remove or replace individual items.
- **Reset & Save** – Reset the canvas or save the current outfit state.
- **Add to Cart** – Add completed outfit designs to a shopping cart.
- **Responsive Design** – Optimized for desktop, tablet, and mobile screens.

---

## Installation

1. **Clone the repository**
   ```
   [GitHub File](https://github.com/selva-mern12/outfit-builder.git)
   ```


2. **Install dependencies**
````
   ```bash
   npm install
````
---

## 🧪 Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
outfit-builder/
├── app
      ├──global.css
      ├──layout.tsx
      ├── pages.tsx       
      ├── page.css        
├── README.md        
└── package.json      
```

---

## Additional Instructions

- To clear the canvas, click **Reset**. If no items are present, an error message appears.
- To save or add an outfit to cart, first add at least one item; otherwise, an error notification is shown.
- Customize styling in `app/page.css`.

---

## Built With

- [Next.js](https://nextjs.org/)
- [React Dropzone](https://react-dropzone.js.org/)
- **CSS** for styling

---

## Contact

Feel free to open an issue or reach out via your preferred contact method.

> Made with 💖 by **Selva**

