const usuarios = [];

let cont =0;

function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  
  let id = usuarios.length;

  const usuario = {id: id++,nome, endereco, telefone, email, cidade};
  usuarios.push(usuario);
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  listarUsuarios();
 

}

function cadUsuario(){
  
  let usuariosGravados =    JSON.parse( window.localStorage.getItem("usuarios"))  ;

  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  const status = "ausente";

  let id = usuarios.length + cont;
let entradas = 0;
let saidas = 0;


  const usuario = {id,nome, senha,endereco, telefone, email, cidade,status,entradas,saidas};
  


  let usuarioIndex = usuarios.findIndex( usuario => usuario.email == email);
  

  

  if(usuariosGravados == null){

  if(usuarioIndex != -1){Swal.fire({
  
    icon: 'warning',
    title: 'Este Email já foi cadastrado!!',
    showConfirmButton: false,
    timer: 1500
  })}else{

    

    usuarios.push(usuario);

   

    localStorage.setItem('usuarios',JSON.stringify(usuarios));

    Swal.fire({
  
      icon: 'success',
      title: 'Cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500
    })
limpar();

  }

}else{

  if(usuarioIndex != -1){Swal.fire({
  
    icon: 'warning',
    title: 'Este Email já foi cadastrado!!',
    showConfirmButton: false,
    timer: 1500
  })}else{

    usuario.id=  usuariosGravados.length + cont;

    usuariosGravados.push(usuario);

    localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));

    Swal.fire({
  
      icon: 'success',
      title: 'Cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500
    })
limpar();

  }



}
}


function apagarUsuario(id){
  Swal.fire({
    title: 'Confirmar a exclusão do Usuário?',
    
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.value) {
      let usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      if(usuarioIndex >= 0){
        usuarios.splice(usuarioIndex,1);
        if(usuarios.length > 0){
          listarUsuarios();
        }else{
          row = document.getElementById("tbody");
          row.innerHTML = "";
        }
      }
      Swal.fire(
        'Usuário excluído!',
        '',
        'success'
      )
    }
  });
}

let idlocal = "";

function validarlogin(){

  let usuariosGravados =    JSON.parse( window.localStorage.getItem("usuarios"))  ;



 const email = document.getElementById("Lemail").value;
 const senha = document.getElementById("Lsenha").value;

 let usuarioIndex2 = usuariosGravados.findIndex( usuario => usuario.email == email && usuario.senha == senha);
 


if(usuarioIndex2 == -1 ){

 Swal.fire({
     
   icon: 'warning',
   title: 'Email ou senha errados!!',
   showConfirmButton: false,
   timer: 1500
 })
}else if( usuariosGravados[usuarioIndex2].status == "ausente"){ 
 Swal.fire({
     
   icon: 'success',
   title: 'Bem vindo',
   showConfirmButton: false,
   timer: 1500

   
 })
 setInterval(function(){
  window.location.href= 'dashboard.html'; 
}),3000;
  
idlocal = usuariosGravados[usuarioIndex2].id;
localStorage.setItem('idlocal',JSON.stringify(idlocal));



usuariosGravados[usuarioIndex2].status = "ativo";

localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));


}
 
  
}





function carregamento2(){

  let usuariosGravados =    JSON.parse( window.localStorage.getItem("usuarios"))  ;

  
}

function logar(){
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // recuperar o valor do localstorage
  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  //console.log(usuariosGravados);
  let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email === email);
  if(usuarioIndex === -1){ // não tem email cadastrado
    Swal.fire({
    
      icon: 'warning',
      title: 'Email não cadastrado!',
      showConfirmButton: false,
      timer: 1500
    });
  }else{ // o email é valido e agora vou testar a senha
        if(usuariosGravados[usuarioIndex].senha !== senha){ // senha incorreta
          Swal.fire({
    
            icon: 'warning',
            title: 'Senha incorreta!',
            showConfirmButton: false,
            timer: 1500
          });
        }else{ // email e senha validados corretos
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `Bem vindo, ${usuariosGravados[usuarioIndex].nome} !`
          })
        }
  }
  
}

function limpar(){
  /* limpar de forma basica manual
document.getElementById("nome").value = "";
document.getElementById("endereco").value = "";
document.getElementById("telefone").value = "";
document.getElementById("email").value = "";
document.getElementById("cidade").value = ""; */

/* limpar de forma automatica */
let inputs = document.getElementsByTagName("input");
for(let i = 0; i < inputs.length; i++){
   inputs[i].value = "";
}
  
}


function editarUsuario(id){
  for(let i = 0; i < usuarios.length; i++){
      if(usuarios[i].id == id){

        document.getElementById("id").value = usuarios[i].id;
        document.getElementById("nome").value = usuarios[i].nome;
        document.getElementById("endereco").value = usuarios[i].endereco;
        document.getElementById("telefone").value = usuarios[i].telefone;
        document.getElementById("email").value = usuarios[i].email;
        document.getElementById("cidade").value = usuarios[i].cidade;
      }
 }
}

function alterarUsuario(){
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;

  // como fazer para atualiza a posicao do array
  usuarios[id] = {id,nome,endereco,telefone,email,cidade};
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário atualizado com sucesso!',
    showConfirmButton: false,
    timer: 1500
  });
  limpar();
  listarUsuarios();

}


function listarUsuarios(){
  let linha = "";
  usuarios.forEach(usuario => {
    row = document.getElementById("tbody");
     linha += "<tr>"+
              "<td id='tdid'>"+usuario.id +"</td>"+
              "<td id='tdnome'>"+usuario.nome +"</td>"+
              "<td id='tdendereco'>"+usuario.endereco+"</td>"+
              "<td id='tdtelefone'>"+usuario.telefone+"</td>"+
              "<td id='tdemail'>"+usuario.email+"</td>"+
              "<td id='tdcidade'>"+usuario.cidade+"</td>"+
              "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarUsuario("+usuario.id+")'><i class='fa fa-edit'></i></button>"+
              "<button class='btn btn-outline-danger'onclick='apagarUsuario("+usuario.id+")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        

  
  
  });
 }
