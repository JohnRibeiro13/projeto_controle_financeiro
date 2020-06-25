function carregamento1(){
  
 
  let usuariosGravados =    JSON.parse( window.localStorage.getItem("usuarios"))  ;
  let idlocal = JSON.parse( window.localStorage.getItem("idlocal"))  ;


  document.getElementById("entradas").innerHTML = usuariosGravados[idlocal].entradas;

 
  document.getElementById("saidas").innerHTML = usuariosGravados[idlocal].saidas;


let total = usuariosGravados[idlocal].entradas - usuariosGravados[idlocal].saidas;

  document.getElementById("saldo").innerHTML = total;


  
}

function contarsaida(){
  let usuariosGravados =    JSON.parse( window.localStorage.getItem("usuarios"))  ;
let idlocal = JSON.parse( window.localStorage.getItem("idlocal"))  ;



usuariosGravados[idlocal].status = "ausente";

  localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));

  idlocal = null;
  localStorage.setItem('idlocal',JSON.stringify(null));
  window.location.href= 'index.html'; 
}


carregamento1();