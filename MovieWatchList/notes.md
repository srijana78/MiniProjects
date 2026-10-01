### What escapeHtml Actually Does

### It converts user-typed text into a safe version where special HTML characters (<, >, &) become harmless text codes. This stops a user from injecting HTML or JavaScript into your page. This attack is called XSS (Cross-Site Scripting).


### The Problem It Solves

```
Your render function builds HTML using a template string: card.innerHTML = `<h3>${book.title}</h3>`;
```

### innerHTML doesn't treat the string as plain text. It parses it as real HTML.