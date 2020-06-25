


const Categorias = [];
const CategoriaMae = [];
let cont =0;

function cadCategoria(){
  
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
  let categoriasGravadas =    JSON.parse( window.localStorage.getItem("categorias"))  ;

  const nome = document.getElementById("Cnome").value;
  let numero = 0 + cont;
let id = idlocal;
  const categoria = {id,numero,nome};
  
  

  let categoriaIndex = Categorias.findIndex( categoria => categoria.nome == nome);



  //let categoriaIndex = CategoriaMae.findIndex( Categorias => Categorias.id == idlocal);
  


  if(categoriasGravadas == null){

categoria.numero = 0;

  if(categoriaIndex != -1){Swal.fire({
  
    icon: 'warning',
    title: 'Essa categoria já foi cadastrada!!',
    showConfirmButton: false,
    timer: 1500
  })}else{

    

    Categorias.push(categoria);

    CategoriaMae[idlocal] = Categorias;

    localStorage.setItem('categorias',JSON.stringify(CategoriaMae));

    Swal.fire({
  
      icon: 'success',
      title: 'Cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500
    })
limpar();
    listarUsuarios();

  }

}else{

  if(categoriasGravadas[idlocal] == null){

    

    if(categoriaIndex != -1){Swal.fire({
  
      icon: 'warning',
      title: 'Essa categoria já foi cadastrada!!',
      showConfirmButton: false,
      timer: 1500
    })}else{
  
      categoria.numero = 0;
  
  
  
      Categorias.push(categoria);
      categoriasGravadas[idlocal] = Categorias;
  
      localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
  
  
      Swal.fire({
    
        icon: 'success',
        title: 'Cadastrado com sucesso',
        showConfirmButton: false,
        timer: 1500
      })
  limpar();
  listarUsuarios();
    }



  }else{

   


    if(categoriaIndex != -1){Swal.fire({
  
      icon: 'warning',
      title: 'Essa categoria já foi cadastrada!!',
      showConfirmButton: false,
      timer: 1500
    })}else{
  


      categoria.numero=  categoriasGravadas[idlocal].length+ cont;
  
  
  
      Categorias.push(categoria);

      categoriasGravadas[idlocal].push(categoria);
  
      localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
  
  
      Swal.fire({
    
        icon: 'success',
        title: 'Cadastrado com sucesso',
        showConfirmButton: false,
        timer: 1500
      })
  limpar();
  listarUsuarios();
    }

    
  }

    
  

  
  


}
}


function limpar(){

let inputs = document.getElementsByTagName("input");
for(let i = 0; i < inputs.length; i++){
   inputs[i].value = "";
}
  
}


 

 function listarUsuarios(){
   


  let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));

  if(categoriasGravadas != null){
if(categoriasGravadas[idlocal] != null){

  let categorialocal = categoriasGravadas[idlocal] ;
 


 
  let linha = "";
  
  for(cont1 = 0 ;cont1< categorialocal.length;cont1++){
    row = document.getElementById("tbody");
     linha += "<tr>"+
              "<td id='tdid'>"+categorialocal[cont1].numero +"</td>"+
              "<td id='tdnome'>"+categorialocal[cont1].nome +"</td>"+
              
              "<td id='tdacoes'><button class='btn btn-outline-danger'onclick='apagarUsuario("+categorialocal[cont1].numero +")'><i class='fa fa-trash'></i></button></td>"
            +"</tr>";
    row.innerHTML = linha;        

  }


}
}
 }

 function apagarUsuario(num){
  Swal.fire({
    title: 'Confirma a exclusão do usuário?',
    
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.value) {

      

      let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
      
      let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
      let categorialocal = categoriasGravadas[idlocal] ;

        let usuarioIndex = categorialocal.findIndex(categoria => categoria.numero == num);

        

        if(usuarioIndex >=0){
          categorialocal.splice(usuarioIndex,1);

          categoriasGravadas[idlocal] = categorialocal;
          localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));

          if(categorialocal.length > 0){
           
            listarUsuarios();
          }else{
            row = document.getElementById("tbody");
            row.innerHTML = "";
          }
        } 

        

      Swal.fire(
        'Usuário Deletado',
        '',
        'success'
      )
    }
  });
  cont ++;
  
}

 listarUsuarios();