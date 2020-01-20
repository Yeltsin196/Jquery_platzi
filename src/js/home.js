console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(res,err){
  setTimeout(function(){
    //luego de 3 segundos
   res('todo bien');
  },5000);
 
});

const getUser = new Promise(function(res,err){
  setTimeout(function(){
    //luego de 3 segundos
   res('todo bien');
  },3000);
 
});

/* getUser.then(function(){
  console.log('todo bien');
}).catch( function(mensaje){
  console.log(mensaje);
}); */

Promise.all([
  getUser,
  getUserAll 
]).then(function(message){
  console.log(message);
}).catch(function(message){
  console.log(message)
});


 $.ajax('https://randomuser.me/api/',{
  method:'GET',
  success: function(data){
    console.log(data);
  },
  error:function(error){
    console.log(error);
  }
}); 

fetch('https://randomuser.me/api/')
.then(function (response){
  //console.log(response)
 return  response.json();
}).then(function(user){
  console.log('user',user.results[0].name.first);
}).catch(function(){
  console.log('algo fallo');
});
