import {games , details , detailsContent} from "./index.js";

export function getId(){
    let cards = document.querySelectorAll('main .row .col');
    cards.forEach(card => {
        card.addEventListener('click', async function(e) {
            let id = this.firstElementChild.getAttribute('data-id');
    
            info(id)
        });
    });
    
    }
    
    export async function info(id){
    
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'bf7d16edbemshae409b6042b0963p133b85jsnf8fe1cdf8636',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
    
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options) ;
           
            const response = await api.json();
    
       async function displayInfo(){
    
        games.classList.toggle('d-none');
        details.classList.toggle('d-none');
    
        detailsContent.innerHTML =`
        
        <div class="col-md-4">
                   <img src="${response.thumbnail}" class="w-100" alt="image details">
                </div>
    
                <div class="col-md-8">
                   <h3>Title: ${response.title}</h3>
                   <p>Category: <span class="badge text-bg-info"> ${response.genre}</span> </p>
                   <p>Platform: <span class="badge text-bg-info"> ${response.platform}</span> </p>
                   <p>Status: <span class="badge text-bg-info"> ${response.status}</span> </p>
                   <p class="small">${response.description}</p>
                   <a class="btn btn-outline-warning" target="_blank" href="${response.game_url}">Show Game</a>
                </div>
        `
    
       }
       displayInfo()
       
    };