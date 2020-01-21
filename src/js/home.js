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
  //  await
  const actionlist = await getData('https://yts.lt/api/v2/list_movies.json?genre=action');
  const dramalist = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama');
  const animationlist = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation');

  

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

  const $actioncontainer = document.querySelector('#action');

  actionlist.data.movies.forEach((movie)=>{
   // debugger
    const HTMLString=videoitemtemplate(movie);
    const html= document.implementation.createHTMLDocument(); 
    html.body.innerHTML= HTMLString;
    $actioncontainer.append(html.body.children[0]);
    console.log(HTMLString);
  });

  /* let terrorlist;
   getData('https://yts.lt/api/v2/list_movies.json?genre=terror').then(
     function(data){
       console.log('terrolist',data);
       terrorlist=data;
     }
   ); */
  console.log(actionlist, dramalist, animationlist);

 // const $actioncontainer = document.querySelector('#action');
  const $dramacontainer = document.getElementById('#drama');
  const $animationcontainer = document.getElementById('#animation');

  const $featuringcontainer = document.getElementById('#featuring');
  const $form = document.getElementById('#form');
  const $home = document.getElementById('#home');


  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hidemodal = document.getElementById('hide-modal');

  $modalimage= $modal.querySelector('img');
  $modaltitle= $modal.querySelector('h1');
  $modaldescription= $modal.querySelector('p');

  
 // console.log(videoitemtemplate("src/images/covers/bitcoin.jpg","bitcoin"));


})()
