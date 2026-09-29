
# 💰 Expense Tracker

A simple, no-framework expense tracker built with **vanilla HTML, CSS, and JavaScript**. Add, edit, and delete expenses, with everything saved locally in the browser — no backend required.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML-5-orange)
![CSS3](https://img.shields.io/badge/CSS-3-blue)

 (   🔗 **[Live Demo](https://srijana78.github.io/jsProjects/ExpenseTracker/)**)
 

## ✨ Features

- **Add expenses** — title, amount, and category
- **Edit expenses** — update any existing entry in place
- **Delete expenses** — with a confirmation prompt before removal
- **Live running total** — automatically recalculated on every change
- **Persistent storage** — expenses are saved to `localStorage`, so your data survives a page refresh
- **Sorted list** — expenses are displayed newest-first
- **Empty state** — a friendly message when there are no expenses yet
- **XSS-safe rendering** — user input is escaped before being inserted into the page

## 🛠️ Built With

- **HTML5** — semantic structure
- **CSS3** — layout and styling
- **JavaScript (ES6+)** — no frameworks, no build tools
  - `localStorage` for persistence
  - Array methods: `reduce`, `map`, `filter`, `sort`, `forEach`
  - `crypto.randomUUID()` for generating unique IDs
  - Template literals for dynamic HTML rendering

## 📂 Project Structure

```
expense-tracker/
├── index.html      # Markup and form structure
├── style.css       # Styling
└── script.js       # App logic (CRUD, storage, rendering)
```

## 🚀 Getting Started

No installation or build step needed — it's plain HTML/CSS/JS.

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```
2. Open `index.html` in your browser
   - Or use a live server (e.g., the VS Code "Live Server" extension) for auto-reload while editing

## 🧠 How It Works

- **Adding an expense**: the form's `submit` event is intercepted (`e.preventDefault()`), the input values are read and validated, and a new expense object is added to the `expenses` array.
- **Editing an expense**: clicking "Edit" pre-fills the form with that expense's data and tracks its `id` in an `editingId` variable. Submitting the form then **replaces** that item using `.map()` instead of adding a new one.
- **Deleting an expense**: prompts for confirmation, then removes the matching item using `.filter()`.
- **Persistence**: every change calls `saveExpenses()`, which writes the current array to `localStorage` as JSON. On page load, `loadExpenses()` reads it back.
- **Rendering**: `renderExpenses()` recalculates the total with `.reduce()`, sorts the list by date, and rebuilds the DOM — then re-attaches click listeners to the newly created Edit/Delete buttons.

## 📚 What I Learned

Building this project was as much about **debugging** as it was about writing new code. A few real takeaways:

- The difference between `undefined` (a value that was never assigned) and `null` (a DOM lookup that found nothing) — and how to tell which one you're dealing with from the error message alone
- Why mutating an array (`.sort()`, `.push()`) vs. returning a new one (`.map()`, `.filter()`, `[...arr]`) matters for predictable state updates
- How a single mismatched `id` between HTML and JavaScript can cause a cascade of confusing runtime errors
- The value of guard clauses (`if (!condition) return;`) for keeping functions readable

## 🔭 Possible Future Improvements

- [ ] Filter/search expenses by category or date range
- [ ] Category-based spending breakdown (chart)
- [ ] Export expenses to CSV
- [ ] Monthly budget limits with warnings
- [ ] Dark mode toggle

## 👤 Author

Built by [Srijana] — CSIT student, learning web development and the MERN stack.

- GitHub: [@srijana78](https://github.com/srijana78)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


# NOTES while learning
## Reduce
1. reduce: turn an array into one value

Think of it as a running total. reduce walks through the array and carries a result along.

```js
const prices = [100, 250, 50];

const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 400


```


### Common mistake: forgetting the 0. Without an initial value, reduce uses the first item as the starting value. That works for numbers, but it crashes on an empty array, and it gives wrong results when the items are objects.


## 2. toFixed: control decimal places
```js
const price = 19.5;
console.log(price.toFixed(2)); // "19.50"
console.log(typeof price.toFixed(2)); // "string"
```
 ### Important: toFixed returns a string, not a number. If you need a number again, use Number(price.toFixed(2)).



 ### 3. sort and the spread operator ...

### sort changes the original array (this is called mutation). To avoid that, copy the array first with the spread operator.

```js
const marks = [45, 9, 100, 30];

// Wrong for numbers: sorts as text, giving [100, 30, 45, 9]
console.log([...marks].sort());

// Correct: ascending
const ascending = [...marks].sort((a, b) => a - b);
console.log(ascending); // [9, 30, 45, 100]

// Descending
const descending = [...marks].sort((a, b) => b - a);
console.log(descending); // [100, 45, 30, 9]

console.log(marks); // [45, 9, 100, 30]  (original is unchanged)
```

### How (a, b) => a - b works: if the result is negative, a goes first. If it is positive, b goes first.

### Spread also works for merging and copying objects:

```js
const cart = [{ name: "Pen" }];
const newCart = [...cart, { name: "Book" }]; // adds an item without mutating cart

const user = { name: "Sita", age: 23 };
const updatedUser = { ...user, age: 24 }; // copy the object and change one field

This pattern is used constantly in React state updates.
```


## 4. forEach: do something for each item
``` js
const names = ["Sita", "Ram", "Hari"];

names.forEach((name, index) => {
  console.log(`${index + 1}. ${name}`);
});
// 1. Sita
// 2. Ram
// 3. Hari

forEach returns nothing. Use it for actions such as logging or printing. Use map when you want a new array back.

```

### 5. if (something.length === 0): empty check
```js
const items = [];

if (items.length === 0) {
  console.log("No items found");
} else {
  console.log(`${items.length} items found`);
}

The same check works for strings: "".length === 0 is true.
```

### document.querySelectorAll(".edit-btn")

 ### This searches the whole page for every HTML element with the class edit-btn, and returns them as a list-like object called a NodeList.
```
html
<button class="edit-btn" data-id="1">Edit</button>
<button class="edit-btn" data-id="2">Edit</button>
<button class="edit-btn" data-id="3">Edit</button>
js
document.querySelectorAll(".edit-btn");
// NodeList(3) [button#1, button#2, button#3]

Note: a NodeList is not a true array, but modern browsers give it a forEach method, so you can use it directly like below without converting it.
```

```
const newExpense = {
    id: editingId || crypto.randomUUID(),
    title: document.getElementById("title").value.trim(),
    amount: Number(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    createdAt: editingId ? expenses.find((x) => x.id === editingId).createAt : Date.now(),
};
```
### Go field by field:
```
id: editingId || crypto.randomUUID()

This is the || (OR) trick for a fallback value.

If editingId is truthy (a real ID string, meaning you're editing something), use it. The expense keeps its original ID.
If editingId is falsy (null, undefined, or "", meaning this is a new expense), fall back to crypto.randomUUID(), which generates a fresh unique ID like "a1b2c3d4-...".
title: document.getElementById("title").value.trim()

Reads the text input's current value and removes leading/trailing whitespace with .trim(). Good practice — prevents saving " Coffee " as a title.
```


```

function deleteExpense(id){
    if(!confirm("Deltet this expense ?")) return ;
    expenses = expenses.filter((x) => x.id !==id);
    saveExpenses(expenses);
    renderExpenses()
}
```
### confirm() is a built-in browser function. It pops up a small dialog box with your message and two buttons: OK and Cancel.

### It pauses all other JavaScript on the page until the user responds (this is called a "blocking" call).

### It returns true if the user clicks OK.
### It returns false if the user clicks Cancel, or closes the dialog another way (e.g., pressing Escape).
```
filter builds a new array by testing every item with a function that returns true or false:

If the test returns true, the item is kept in the new array.
If the test returns false, the item is left out.

Here, the test is x.id !== id — "keep this expense only if its ID is NOT the one we're deleting."
```