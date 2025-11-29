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
    }, 500)
  );
}

export function saveEntry(entry) {
  const list = JSON.parse(localStorage.getItem("entries") || "[]");
  list.push(entry);
  localStorage.setItem("entries", JSON.stringify(list));
}

export function getEntries() {
  return JSON.parse(localStorage.getItem("entries") || "[]");
}

export function deleteEntry(index) {
  const list = JSON.parse(localStorage.getItem("entries") || "[]");
  list.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(list));
}
