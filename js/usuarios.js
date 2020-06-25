const usuarios = []; // array para receber os objetos do tipo usuario




function salvarUsuario(){
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;
  const senha = document.getElementById("senha").value;
  // let id = usuarios.length;
  const usuario = {id: Date.now(),
     nome, endereco, telefone, email, cidade,senha};
     usuarios.push(usuario); 
  // gravar no localstorage
  window.localStorage.setItem("usuarios",JSON.stringify(usuarios));   
  
 
  
  Swal.fire({
    
    icon: 'success',
    title: 'Usuário cadastrado com sucesso!!!',
    showConfirmButton: false,
    timer: 1500
  });
  listarUsuarios();
  limparInputs();
  

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
      const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);
      usuarios.splice(usuarioIndex,1);
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
        'Usuário excluído com sucesso',
        '',
        'success'
      )
    }
  });
      
 }


 function editarUsuario(id){

  let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));

   
     document.getElementById("Pid").value =  usuariosGravados[id].id;
     document.getElementById("Pnome").value =  usuariosGravados[id].nome;
      document.getElementById("Pendereco").value = usuariosGravados[id].endereco;
       document.getElementById("Ptelefone").value = usuariosGravados[id].telefone;
      document.getElementById("Pemail").value =  usuariosGravados[id].email;
      document.getElementById("Psenha").value =  usuariosGravados[id].senha;
     document.getElementById("Pcidade").value =  usuariosGravados[id].cidade;
     
     
     let botao = document.getElementById("botao1");
     let botao1 = "<button class='btn btn-outline-info' type='button' onclick='alterarUsuario()'>"+"Alterar"+"</button>";
  
     botao.innerHTML = botao1;

 }
 function alterarUsuario(){
let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));


  const id = document.getElementById("Pid").value;
  const nome = document.getElementById("Pnome").value;
  const endereco = document.getElementById("Pendereco").value;
  const telefone = document.getElementById("Ptelefone").value;
  const email = document.getElementById("Pemail").value;
  const senha = document.getElementById("Psenha").value;
  const cidade = document.getElementById("Pcidade").value;
 
  const status = usuariosGravados[idlocal].status;
  const entradas = usuariosGravados[idlocal].entradas;
  const saidas = usuariosGravados[idlocal].saidas;
  

  usuariosGravados[idlocal] = {id,nome, senha,endereco, telefone, email, cidade,status,entradas,saidas};


  localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));

  Swal.fire({
    
    icon: 'success',
    title: 'Usuário alterado com sucesso!!!',
    showConfirmButton: false,
    timer: 1500
  });




  listarUsuarios();
  limparInputs();
 }

 function listarUsuarios(){

  let usuariosGravado = JSON.parse(window.localStorage.getItem("usuarios"));
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
  
  let linha = "";
 
  if(usuariosGravado){
 
    row = document.getElementById("tbody");
    if(row){
     linha += "<tr>"+
              "<td id='tdid'>"+usuariosGravado[idlocal].id +"</td>"+
              "<td id='tdnome'>"+usuariosGravado[idlocal].nome  +"</td>"+
              "<td id='tdendereco'>"+usuariosGravado[idlocal].endereco +"</td>"+
              "<td id='tdtelefone'>"+usuariosGravado[idlocal].telefone +"</td>"+
              "<td id='tdemail'>"+usuariosGravado[idlocal].email +"</td>"+
              
              "<td id='tdcidade'>"+usuariosGravado[idlocal].cidade +"</td>"+
              "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarUsuario("+usuariosGravado[idlocal].id+")'><i class='fa fa-edit'></i></button>"+
              "</tr>";
    row.innerHTML = linha;        
    }
  
  
  ;
}
 }

 function limparInputs(){
   let inputs = document.getElementsByTagName("input");
   
  for(let i=0; i < inputs.length; i++){
     inputs[i].value = "";
    
   }
 }

 function logar(){
   // recuperando a lista de usuarios
   
   const email = document.getElementById("email").value;
   const senha = document.getElementById("senha").value;
   let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
  
   let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email === email);
   if(usuarioIndex === -1){
    Swal.fire({
    
      icon: 'warning',
      title: 'Email informado está incorreto',
      showConfirmButton: false,
      timer: 1500
    });
   }else{
     if(usuariosGravados[usuarioIndex].senha !== senha){
      Swal.fire({
    
        icon: 'warning',
        title: 'Senha informada está incorreta',
        showConfirmButton: false,
        timer: 1500
      }); 
      document.getElementById("senha").value = '';
     }else{
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
        title: `Bem vindo ${usuariosGravados[usuarioIndex].nome}`
      });
      setInterval(function(){
        window.location.href = "dashboard.html"; 
      }),3000;
        
      }
      
      
     }
   }

 listarUsuarios();




  
 /*const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
    listarUsuarios();
  }
})

Toast.fire({
  icon: 'success',
  title: 'Usuário Cadastrado com Sucesso!!!'
});*/