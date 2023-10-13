import { url } from "./constant";
import { querySelector } from "./misc";

const selectedArticleIds = new Set<string>();

export const refreshArticles = async () => {
  // ramener la liste d'articles du back
  const response = await fetch(url);
  const articles = await response.json();
  console.log("articles: ", articles);

  // trouver l'endroit de la page web ou afficher les articles
  const tbody = querySelector("body table tbody");
  console.log("tbody: ", tbody);

  // les afficher
  tbody.innerHTML = "";
  for (const a of articles) {
    const trElt = document.createElement("tr");
    if (selectedArticleIds.has(a.id)) {
      trElt.classList.add("selected");
    }
    trElt.innerHTML = `
<td class="name">${a.name}</td>
<td class="price">${a.price} €</td>
<td class="qty">${a.qty}</td>   
    `;
    trElt.addEventListener("click", async () => {
      console.log("click click");
      selectedArticleIds.has(a.id)
        ? selectedArticleIds.delete(a.id)
        : selectedArticleIds.add(a.id);
      await refreshArticles();
    });
    tbody.appendChild(trElt);
  }
};

export const setSuppressAction = async () => {
  // retrouve le bouton
  const button = querySelector("button.remove");
  console.log("button: ", button);
  button.addEventListener("click", async () => {
    console.log("suppress");

    const ids = [...selectedArticleIds];

    await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(ids),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await refreshArticles();
  });
};
