'use strict'
import * as myDetails from "./info.js";


let cardImg = document.querySelector('figure img');
let cardH3 = document.querySelector('figcaption h3');
let cardP = document.querySelector('figcaption P');
let cardSp1 = document.querySelector('footer .sp1');
let cardSp2 = document.querySelector('footer .sp2');
let row = document.querySelector('main section .row');
let navA = document.querySelector('ul');

export let games = document.querySelector('.games');
export let details = document.querySelector('.details');
export let detailsContent = document.querySelector('#detailsContent');


// ================================
let anc = "mmorpg";
getGames(anc).then(function(){myDetails.getId()});

// ================================

navA.addEventListener('click',async function(e){
    for(let i=0 ; i<navA.children.length; i++){
        navA.children[i].children[0].classList.remove('active')
    }
    e.target.classList.add('active')
    anc = e.target.getAttribute('data-category');
    await getGames(anc).then(function(){myDetails.getId()});

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

};

// ================================

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