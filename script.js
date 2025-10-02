document.addEventListener("DOMContentLoaded",() => {

    const newsContainer=document.getElementById("news-container");
    const errorMessage=document.getElementById("error-message");
    const searchButton=document.getElementById("search-news");
    const searchInput=document.getElementById("search-query");

    const API_KEY = "26462fb65c941141c41c9026a410ec86"
    const BASE_URL="https://gnews.io/api/v4"


    async function fetchNews(query="") {
        newsContainer.innerHTML="";
        errorMessage.textContent="Loading news....";

        let url = `${BASE_URL}/top-headlines?token=${API_KEY}&lang=en&country=in&max=10`;
        if (query){
            url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&token=${API_KEY}&lang=en&max=10`;
        }

        try{

            const response = await fetch(url);
            if (!response.ok){
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            errorMessage.textContent="";

            if(!data.articles || data.articles.length === 0){
                errorMessage.textContent="No news found for this search";
                return;
            }

            data.articles.forEach(article => {
                const newsElement = document.createElement("div");
                newsElement.classList.add("post");
                newsElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image">` : ""}
                <p><a href="${article.url}" target="_blank">Read more</a></p>
                `;
                newsContainer.appendChild(newsElement)
                console.log("Eroor")
            });
        }
        catch (error){
            errorMessage.textContent = "Failed to load news ";
        }
    }
        if (newsContainer){
            fetchNews();
        }

        if (searchButton){
            searchButton.addEventListener("click",()=>{
                const query = searchInput.value.trim();
                fetchNews(query);
            });
        }
    });