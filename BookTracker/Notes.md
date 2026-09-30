# 📚 Book Tracker

A simple web app to track the books you want to read, are reading, or have finished.
Data is saved in the browser, so no backend or account is needed.

![Book Tracker screenshot](![alt text](image.png)./screenshot.png)

## Features

- Add a book with a title, reading status, and notes
- Edit or delete an existing book
- Books are sorted with the newest first
- Data persists after refreshing the page (saved in `localStorage`)
- User input is escaped to prevent XSS (Cross-Site Scripting)
- Shows a friendly message when the list is empty

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Browser `localStorage` API

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Edge, Firefox)
- (Recommended) VS Code with the **Live Server** extension

### Run locally

```bash
git clone https://github.com/srijana78/book-tracker.git
cd book-tracker
```

Open `index.html` with Live Server, or simply double-click the file.

> Note: `crypto.randomUUID()` requires a secure context, so use
> `localhost` (Live Server) or HTTPS.

## Project Structure

```
book-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How It Works

The app follows a simple state-driven pattern:

1. `books` array is the **single source of truth**.
2. Any change (add, edit, delete) updates the array.
3. The array is saved to `localStorage` with `saveBooks()`.
4. `renderBooks()` clears the list and redraws every card from the array.

Click events on Edit and Delete use **event delegation**: one listener on the
parent list handles all buttons, even for cards created later.

## What I Learned

- Why render functions should be idempotent (clear the container first)
- How event delegation works and why it is better than many listeners
- How to handle corrupted `localStorage` data with `try/catch`
- How to prevent XSS by escaping user input

## Future Improvements

- [ ] Search box and status filter
- [ ] Rating system (1 to 5 stars)
- [ ] Export and import books as JSON
- [ ] Rebuild the app with React
- [ ] Add a Node.js + MongoDB backend (MERN version)

## Author

**[Srijana]**, CSIT student, Nepal
GitHub: [@srijana78](https://github.com/srijana78)