const API_KEY = "9ba46422e55847098855c2995664151e"

const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function reload(){
    window.location.reload();
}
function bindData(articles){
    const cardscontainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardscontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardclone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardclone, article)
        cardscontainer.appendChild(cardclone);
    })
}

function fillDataInCard(cardclone, article){
    const newsimg = cardclone.querySelector('#news-img')
    const newstitle = cardclone.querySelector('#news-title')
    const newssoruce = cardclone.querySelector('#news-source')
    const newsdesc = cardclone.querySelector('#news-desc')

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newssoruce.innerHTML = `${article.source.name} - ${date}`;

    cardclone.firstElementChild.addEventListener('click',() => {
        window.open(article.url, "_blank")
    } )
}
let curSelectitem = null
function onNavItemClick(id){
    fetchNews(id)
    const navitem = document.getElementById(id)
    curSelectitem?.classList.remove("active");
    curSelectitem = navitem
    curSelectitem.classList.add("active")
    console.log("Here");
    
}

const searchButton = document.getElementById("search-button")
const searchText = document.getElementById("news-input")

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectitem?.classList.remove('active')
    curSelectitem = null
})

