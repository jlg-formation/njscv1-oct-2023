import { url } from "./constant";
import { querySelector } from "./misc";

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
    trElt.innerHTML = `
<td class="name">${a.name}</td>
<td class="price">${a.price} €</td>
<td class="qty">${a.qty}</td>   
    `;
    tbody.appendChild(trElt);
  }
};