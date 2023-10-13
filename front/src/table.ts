import { url } from "./constant";
import { Article } from "./interfaces/Article";
import { querySelector } from "./misc";

const selectedArticleIds = new Set<string>();
let articles: Article[] = [];

export const printArticles = () => {
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
    trElt.addEventListener("click", () => {
      console.log("click click");
      selectedArticleIds.has(a.id)
        ? selectedArticleIds.delete(a.id)
        : selectedArticleIds.add(a.id);
      printArticles();
    });
    tbody.appendChild(trElt);
  }

  // gestion du bouton supprimer
  querySelector("button.remove").hidden = selectedArticleIds.size === 0;
};

export const refreshArticles = async () => {
  // ramener la liste d'articles du back
  const response = await fetch(url);
  articles = await response.json();
  console.log("articles: ", articles);
  printArticles();
};

export const setSuppressAction = async () => {
  // retrouve le bouton
  const button = querySelector("button.remove");
  console.log("button: ", button);
  button.addEventListener("click", async () => {
    console.log("suppress");
    if (selectedArticleIds.size === 0) {
      return;
    }
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
