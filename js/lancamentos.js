


const Categorias = [];
const CategoriaMae = [];
let cont =0;

function cadCategoria(){
  
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
  let categoriasGravadas =    JSON.parse( window.localStorage.getItem("lancamentos"))  ;
  let usuariosGravados =    JSON.parse( window.localStorage.getItem("usuarios"))  ;


  const saldo = document.getElementById("valor").value;

  const categoriaa = document.getElementById("Ccategoria").value;
  var data = new Date();



  let numero = 0 + cont;
let id = idlocal;
  const categoria = {id,numero,data,saldo,categoriaa};
  


   


  let contasgravadas =    JSON.parse( window.localStorage.getItem("contas")) ;
  let contalocal = contasgravadas[idlocal] ;
  let containdex= contalocal.findIndex( categoria => categoria.nome ==categoriaa);


 
  //let categoriaIndex = CategoriaMae.findIndex( Categorias => Categorias.id == idlocal);
  


  if(categoriasGravadas == null){

categoria.numero = 0;

  
    

   
contalocal[containdex].saldo = contalocal[containdex].saldo + JSON.parse( categoria.saldo);
    contasgravadas[idlocal] = contalocal;

    console.log(contalocal[containdex].tipo);
    debugger;
if(contalocal[containdex].tipo == "Entrada"){

usuariosGravados[idlocal].entradas = usuariosGravados[idlocal].entradas + JSON.parse( categoria.saldo);
localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));

}else{
  usuariosGravados[idlocal].saidas = usuariosGravados[idlocal].saidas + JSON.parse( categoria.saldo);

  localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));
}
    

    Categorias.push(categoria);

    CategoriaMae[idlocal] = Categorias;

    localStorage.setItem('lancamentos',JSON.stringify(CategoriaMae));
    localStorage.setItem('contas',JSON.stringify(contasgravadas));

    Swal.fire({
  
      icon: 'success',
      title: 'Cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500
    })
limpar();
    listarUsuarios();

  

}else{

  if(categoriasGravadas[idlocal] == null){

    

 
  
      categoria.numero = 0;
  
      contalocal[containdex].saldo = contalocal[containdex].saldo + JSON.parse( categoria.saldo);
      contasgravadas[idlocal] = contalocal;
  
      if(contalocal[containdex].tipo == "Entrada"){
        // alert('mk');
       usuariosGravados[idlocal].entradas = usuariosGravados[idlocal].entradas + JSON.parse( categoria.saldo);
       localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));
       
       }else{
         usuariosGravados[idlocal].saidas = usuariosGravados[idlocal].saidas + JSON.parse( categoria.saldo);
       
         localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));
       }


      Categorias.push(categoria);
      categoriasGravadas[idlocal] = Categorias;
  
      localStorage.setItem('lancamentos',JSON.stringify(categoriasGravadas));
      localStorage.setItem('contas',JSON.stringify(contasgravadas));
  
      Swal.fire({
    
        icon: 'success',
        title: 'Cadastrado com sucesso',
        showConfirmButton: false,
        timer: 1500
      })
  limpar();
  listarUsuarios();
    



  }else{

   


  
    contalocal[containdex].saldo = contalocal[containdex].saldo + JSON.parse( categoria.saldo);
      contasgravadas[idlocal] = contalocal;

      if(contalocal[containdex].tipo == "Entrada"){
        // alert('mk');
       usuariosGravados[idlocal].entradas = usuariosGravados[idlocal].entradas + JSON.parse( categoria.saldo);
       localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));
       
       }else{
         usuariosGravados[idlocal].saidas = usuariosGravados[idlocal].saidas + JSON.parse( categoria.saldo);
       
         localStorage.setItem('usuarios',JSON.stringify(usuariosGravados));
       }

      categoria.numero=  categoriasGravadas[idlocal].length+ cont;
  
  
  
      Categorias.push(categoria);

      categoriasGravadas[idlocal].push(categoria);
  
      localStorage.setItem('lancamentos',JSON.stringify(categoriasGravadas));
      localStorage.setItem('contas',JSON.stringify(contasgravadas));
  
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


function limpar(){

let inputs = document.getElementsByTagName("input");
for(let i = 0; i < inputs.length; i++){
   inputs[i].value = "";
}
  
}
let opt = [];
function carregamento(){
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
  let categoriasGravadas =    JSON.parse( window.localStorage.getItem("contas"))  ;

  
  let categoriaslocal = categoriasGravadas[idlocal];



  let categoriaS = document.getElementById('Ccategoria');

  for(cont3 =0;cont3<categoriaslocal.length;cont3++){
opt[cont3] = document.createElement('option');

opt[cont3].value = categoriaslocal[cont3].nome;
opt[cont3].text = categoriaslocal[cont3].nome;

   categoriaS.add(opt[cont3],categoriaS.options[cont3]);
  }
   



}
 carregamento();

 function listarUsuarios(){
   


  let categoriasGravadas = JSON.parse(window.localStorage.getItem("lancamentos"));
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));

  if(categoriasGravadas != null){
if(categoriasGravadas[idlocal] != null){

  let categorialocal = categoriasGravadas[idlocal] ;
 


 
  let linha = "";
  
  for(cont1 = 0 ;cont1< categorialocal.length;cont1++){
    row = document.getElementById("tbody");
     linha += "<tr>"+
              "<td id='tdid'>"+categorialocal[cont1].numero +"</td>"+
              "<td id='tdnome'>"+categorialocal[cont1].data +"</td>"+
              "<td id='tdtipo'>"+categorialocal[cont1].saldo +"</td>"+
              "<td id='tdcategoria'>"+categorialocal[cont1].categoriaa +"</td>"+
              
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

      

      let categoriasGravadas = JSON.parse(window.localStorage.getItem("lancamentos"));
      
      let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
      let categorialocal = categoriasGravadas[idlocal] ;

        let usuarioIndex = categorialocal.findIndex(categoria => categoria.numero == num);

        

        if(usuarioIndex >=0){
          categorialocal.splice(usuarioIndex,1);

          categoriasGravadas[idlocal] = categorialocal;
          localStorage.setItem('lancamentos',JSON.stringify(categoriasGravadas));

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