import "./style.scss";

const url = "http://localhost:3000/api/articles";

const refreshArticles = async () => {
  // ramener la liste d'articles du back
  // trouver l'endroit ou afficher les articles
  // les afficher

  const response = await fetch(url);
  const articles = await response.json();
  console.log("articles: ", articles);
};

refreshArticles();
