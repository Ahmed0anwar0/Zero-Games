'use strict'


let cardImg = document.querySelector('figure img');
let cardH3 = document.querySelector('figcaption h3');
let cardP = document.querySelector('figcaption P');
let cardSp1 = document.querySelector('footer .sp1');
let cardSp2 = document.querySelector('footer .sp2');
let row = document.querySelector('main section .row');
let navA = document.querySelector('ul');

let games = document.querySelector('.games');
let details = document.querySelector('.details');
let detailsContent = document.querySelector('#detailsContent');


// ================================
let anc = "mmorpg";
getGames(anc).then(function(){getId()});

// ================================

navA.addEventListener('click',async function(e){
    for(let i=0 ; i<navA.children.length; i++){
        navA.children[i].children[0].classList.remove('active')
    }
    e.target.classList.add('active')
    anc = e.target.getAttribute('data-category');
    await getGames(anc).then(function(){getId()});

    });

// ================================

async function getGames(anc,callback){
    
    const options = {
        headers: {
            'x-rapidapi-key': 'bf7d16edbemshae409b6042b0963p133b85jsnf8fe1cdf8636',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${anc}`, options);

    const response = await api.json();


    let cartona = '';

function displayGames(){

    for(let i=0;i < Object.keys(response).length ; i++){

        cartona += `
             <div class="col">
                        <div data-id="${response[i].id}" class="card h-100 bg-transparent" role="button">
                           <div class="card-body">
                            
                              <figure class="position-relative">
                                 <img class="card-img-top object-fit-cover h-100" src="${response[i].thumbnail}">
                              </figure>
                  
                              <figcaption>
                  
                                 <div class="hstack justify-content-between">
                                    <h3 class="h6 small main-col">${response[i].title}</h3>
                                    <span class="badge anc text-bg-primary p-2 main-col">Free</span>
                                 </div>
                  
                                 <p class="card-text small text-center opacity-50 main-col">
                                 ${response[i].short_description}
                                 </p>
                  
                              </figcaption>
                           </div>
                  
                           <footer class="card-footer small hstack justify-content-between">
                  
                              <span class="badge sp1 main-col">${response[i].genre}</span>
                              <span class="badge sp2 main-col">${response[i].platform}</span>
                  
                           </footer>
                        </div>
                     </div>
        `
    }
}

displayGames()
row.innerHTML = cartona;

}

// ================================

function getId(){
let cards = document.querySelectorAll('main .row .col');
cards.forEach(card => {
    card.addEventListener('click', async function(e) {
        let id = this.firstElementChild.getAttribute('data-id');

        info(id)
    });
});

}

async function info(id){

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


let btnClose = document.querySelector('#btnClose');
btnClose.addEventListener('click',function(){
    games.classList.toggle('d-none');
    details.classList.toggle('d-none');
})


$(function(){
    $('.loading').fadeOut(500)
    $('.main-nav').slideUp();
})


$('.mobile-nav-btn').on('click',function(e){

    $('.main-nav').slideToggle();
})


let media = window.matchMedia("(max-width: 991px)")

media.addEventListener("change", function() {
    $('.main-nav').slideUp();
    $('.main-nav ul').toggleClass('text-center')
});