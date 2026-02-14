export async function analyzeEntry(text) {
  // later: replace with your backend URL
  // for now keep it fake
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        summary: "You seem calm but thoughtful.",
        score: 7,
        tags: ["calm", "reflective"],
        suggestion: "Maybe go for a short walk.",
      });
    }, 500),
  );
}

export function saveEntry(entry, email) {
  const key = `entries_${email}`;
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.push(entry);
  localStorage.setItem(key, JSON.stringify(list));
}

export function getEntries(email) {
  const key = `entries_${email}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function deleteEntry(id, email) {
  const key = `entries_${email}`;

  const list = JSON.parse(localStorage.getItem(key) || "[]");
  const updatedList = list.filter((entry) => entry.id !== id);

  localStorage.setItem(key, JSON.stringify(updatedList));
}
