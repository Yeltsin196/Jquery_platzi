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
    if(data.data.movie_count>0){
      return data;
    
    }
   
  }



  const $home = document.getElementById('home');

  const $form = document.getElementById('form');
  const $featuringcontainer = document.getElementById('featuring');

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }


  const BASE_API = 'https://yts.lt/api/v2/';

  function featuringTemplate(peli) {

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

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    $home.classList.add('search-active');
    $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50
    });
    $featuringcontainer.append($loader);

    const data = new FormData($form);

    try {
      const {
        data: {
          movies: pelicula
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
  
      const HTMLString = featuringTemplate(pelicula[0]);
  
  
      $featuringcontainer.innerHTML = HTMLString;
    } catch (error) {
      alert('No se encontro ningun resultado');
      $loader.remove();
      $home.classList.remove('search-active');
    }

    
  })
  //  await




  function videoitemtemplate(movie, category) {
    return (`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
        </div>
            <h4 class="primaryPlaylistItem-title">
            ${movie.title}
        </h4>
          </div>`);
  }



  function createTemplate(HTMLString) {

    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;

    return html.body.children[0];
  }

  function addEventClick($element) {
    $element.addEventListener('click', function () {
      showModal($element);
    })
  }

  function renderMoviesList(list, container, category) {

    container.children[0].remove();
    list.forEach((movie) => {
      // debugger
      const HTMLString = videoitemtemplate(movie, category);

      const movieElement = createTemplate(HTMLString);
      const image = movieElement.querySelector('img');
      image.addEventListener('load',(event)=>{
       event.srcElement.classList.add('fadeIn');
      });
     // movieElement.classList.add('fadeIn');
      container.append(movieElement);
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
  const { data: { movies: actionlist } } = await getData(`${BASE_API}list_movies.json?genre=action`);
  window.localStorage.setItem('actionlist',,JSON.stringify(actionlist));
  const $actioncontainer = document.querySelector('#action');
  renderMoviesList(actionlist, $actioncontainer, 'action');
  
  const { data: { movies: dramalist } } = await getData(`${BASE_API}list_movies.json?genre=drama`);
  window.localStorage.setItem('dramalist',JSON.stringify(dramalist));
  const $dramacontainer = document.getElementById('drama');
  renderMoviesList(dramalist, $dramacontainer, 'drama');

 const { data: { movies: animationlist } } = await getData(`${BASE_API}list_movies.json?genre=animation`);
 window.localStorage.setItem('animationlist',,JSON.stringify(animationlist));
  const $animationcontainer = document.getElementById('animation');
  renderMoviesList(animationlist, $animationcontainer, 'animation');
 





  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hidemodal = document.getElementById('hide-modal');

  const $modalimage = $modal.querySelector('img');
  const $modaltitle = $modal.querySelector('h1');
  const $modaldescription = $modal.querySelector('p');


  // console.log(videoitemtemplate("src/images/covers/bitcoin.jpg","bitcoin"));
     function findById(list,id){
      return  list.find((movie) => {

        return movie.id === parseInt(id, 10);
      });
     }

  function findMovie(id, category) {

    switch (category) {
      case 'action': {
        return    findById( actionlist,id);
      }
      case 'drama': {
        return   findById( dramalist,id);
      }
      default: {
      return  findById( animationlist,id);
      }
    }



  }
  function showModal($element) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id, category);
    
  $modalimage.setAttribute('src',data.medium_cover_image);
  $modaltitle.textContent= data.title;
  $modaldescription.textContent = data.description_full;
  
  }
  $hidemodal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }
})()
