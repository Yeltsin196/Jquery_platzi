console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function (res, err) {
  setTimeout(function () {
    //luego de 3 segundos
    res('todo bien');
  }, 5000);

});

const getUser = new Promise(function (res, err) {
  setTimeout(function () {
    //luego de 3 segundos
    res('todo bien');
  }, 3000);

});

/* getUser.then(function(){
  console.log('todo bien');
}).catch( function(mensaje){
  console.log(mensaje);
}); */

Promise.all([
  getUser,
  getUserAll
]).then(function (message) {
  console.log(message);
}).catch(function (message) {
  console.log(message)
});


$.ajax('https://randomuser.me/api/', {
  method: 'GET',
  success: function (data) {
    console.log(data);
  },
  error: function (error) {
    console.log(error);
  }
});

fetch('https://randomuser.me/api/')
  .then(function (response) {
    //console.log(response)
    return response.json();
  }).then(function (user) {
    console.log('user', user.results[0].name.first);
  }).catch(function () {
    console.log('algo fallo');
  });

(async function load() {

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }


  
  const $home = document.getElementById('home');

  const $form = document.getElementById('form');
  const $featuringcontainer = document.getElementById('featuring');

  function setAttributes($element,attributes){
    for(const attribute in attributes){
      $element.setAttribute(attribute,attributes[attribute]);
    }
  }


  const BASE_API = 'https://yts.lt/api/v2/';

  function featuringTemplate(peli){
   
     peli2 = `<div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>`; 
     return peli2;
  }

  $form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    $home.classList.add('search-active');
    $loader = document.createElement('img');
    setAttributes($loader,{
      src:'src/images/loader.gif',
      height:50,
      width:50
    });
    $featuringcontainer.append($loader);

    const data= new FormData($form);
    const pelicula = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
    
    const HTMLString= featuringTemplate(pelicula.data.movies[0]);
    
    
    $featuringcontainer.innerHTML = HTMLString;
  })  
  //  await
  const actionlist = await getData(`${BASE_API}list_movies.json?genre=action`);
  const dramalist = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const animationlist = await getData(`${BASE_API}list_movies.json?genre=animation`);

  

  function videoitemtemplate(movie){
    return (`<div class="primaryPlaylistItem">
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
        </div>
            <h4 class="primaryPlaylistItem-title">
            ${movie.title}
        </h4>
          </div>`);
  }

 

  function createTemplate(HTMLString){
    
    const html= document.implementation.createHTMLDocument(); 
    html.body.innerHTML= HTMLString;

    return html.body.children[0];
  }

  function addEventClick($element){
    $element.addEventListener('click',function(){
      showModal();
    })
  }

  function renderMoviesList(list,container){
    
    container.children[0].remove();
    list.forEach((movie)=>{
      // debugger
       const HTMLString=videoitemtemplate(movie);
      
       const movieElement= createTemplate(HTMLString);
       
      container.append( movieElement);
      addEventClick(movieElement);
     });
  }
  

  /* let terrorlist;
   getData('https://yts.lt/api/v2/list_movies.json?genre=terror').then(
     function(data){
       console.log('terrolist',data);
       terrorlist=data;
     }
   ); */
  //console.log(actionlist, dramalist, animationlist);

 // const $actioncontainer = document.querySelector('#action');
 const $actioncontainer = document.querySelector('#action');
 renderMoviesList(actionlist.data.movies,$actioncontainer);
  const $dramacontainer = document.getElementById('drama');
  renderMoviesList(dramalist.data.movies,$dramacontainer);
  const $animationcontainer = document.getElementById('animation');
  renderMoviesList(animationlist.data.movies,$animationcontainer);

  
 


  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hidemodal = document.getElementById('hide-modal');

  $modalimage= $modal.querySelector('img');
  $modaltitle= $modal.querySelector('h1');
  $modaldescription= $modal.querySelector('p');

  
 // console.log(videoitemtemplate("src/images/covers/bitcoin.jpg","bitcoin"));

     function showModal(){
        $overlay.classList.add('active');
        $modal.style.animation='modalIn .8s forwards';
     }
     $hidemodal.addEventListener('click',hideModal);
     function hideModal(){
      $overlay.classList.remove('active');
      $modal.style.animation='modalOut .8s forwards';
     }
})()
