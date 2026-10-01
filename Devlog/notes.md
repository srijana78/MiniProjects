```

list.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (editBtn) editEntries(editBtn.dataset.id);
  if (deleteBtn) deleteEntries(deleteBtn.dataset.id);
});

```
### This is event delegation. Instead of adding a click listener to every Edit and Delete button, you add one listener to the parent(list). When any click happens inside the list, the code checks whether the click came from an Edit or Delete button and calls the matching function with that item's ID.

### The Analogy

### Imagine a hotel with 100 rooms. You could hire one receptionist per room (100 listeners), or you could hire one receptionist at the front desk who handles every request and asks, "Which room is this from?"
### list is the front desk.
### The buttons are guests in the rooms.
### data-id is the room number.

### One listener means less memory, less setup, and less code.

## e is the the event object . It contains information about what was clicked.