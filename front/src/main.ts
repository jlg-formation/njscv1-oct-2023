import { url } from "./constant";
import { querySelector } from "./misc";
import "./style.scss";
import { refreshArticles } from "./table";

refreshArticles();

const form = querySelector("form") as HTMLFormElement;
console.log("form: ", form);
form.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  console.log("submit");

  // on recupere l'article depuis les champs
  const formData = new FormData(form);
  const newArticle = Object.fromEntries(formData.entries());
  console.log("newArticle: ", newArticle);

  // on l'envoie au backend
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(newArticle),
    headers: {
      "Content-Type": "application/json",
    },
  });
  await refreshArticles();
});
