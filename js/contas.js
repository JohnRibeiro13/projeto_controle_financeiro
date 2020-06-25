


const Categorias = [];
const CategoriaMae = [];
let cont =0;

function cadCategoria(){
  
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
  let categoriasGravadas =    JSON.parse( window.localStorage.getItem("contas"))  ;

  const nome = document.getElementById("Cnome").value;
  const tipo = document.getElementById("Ctipo").value;
  const categoriaa = document.getElementById("Ccategoria").value;


  let numero = 0 + cont;
let id = idlocal;
let saldo =0;
  const categoria = {id,numero,nome,tipo,categoriaa,saldo};
  


  let categoriaIndex = Categorias.findIndex( categoria => categoria.nome == nome);




  //let categoriaIndex = CategoriaMae.findIndex( Categorias => Categorias.id == idlocal);
  


  if(categoriasGravadas == null){

categoria.numero = 0;

  if(categoriaIndex != -1){Swal.fire({
  
    icon: 'warning',
    title: 'Essa conta já foi cadastrada!!',
    showConfirmButton: false,
    timer: 1500
  })}else{

    

    Categorias.push(categoria);

    CategoriaMae[idlocal] = Categorias;

    localStorage.setItem('contas',JSON.stringify(CategoriaMae));

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
      title: 'Essa conta já foi cadastrada!!',
      showConfirmButton: false,
      timer: 1500
    })}else{
  
      categoria.numero = 0;
  
  
  
      Categorias.push(categoria);
      categoriasGravadas[idlocal] = Categorias;
  
      localStorage.setItem('contas',JSON.stringify(categoriasGravadas));
  
  
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
      title: 'Essa conta já foi cadastrada!!',
      showConfirmButton: false,
      timer: 1500
    })}else{
  


      categoria.numero=  categoriasGravadas[idlocal].length+ cont;
  
  
  
      Categorias.push(categoria);

      categoriasGravadas[idlocal].push(categoria);
  
      localStorage.setItem('contas',JSON.stringify(categoriasGravadas));
  
  
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
let opt = [];
function carregamento(){
  let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
  let categoriasGravadas =    JSON.parse( window.localStorage.getItem("categorias"))  ;

  
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
   


  let categoriasGravadas = JSON.parse(window.localStorage.getItem("contas"));
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
              "<td id='tdtipo'>"+categorialocal[cont1].tipo +"</td>"+
              "<td id='tdcategoria'>"+categorialocal[cont1].categoriaa +"</td>"+
              "<td id='tdsaldo'>"+categorialocal[cont1].saldo +"</td>"+
              
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

      

      let categoriasGravadas = JSON.parse(window.localStorage.getItem("contas"));
      
      let idlocal = JSON.parse(window.localStorage.getItem("idlocal"));
      let categorialocal = categoriasGravadas[idlocal] ;

        let usuarioIndex = categorialocal.findIndex(categoria => categoria.numero == num);

        

        if(usuarioIndex >=0){
          categorialocal.splice(usuarioIndex,1);

          categoriasGravadas[idlocal] = categorialocal;
          localStorage.setItem('contas',JSON.stringify(categoriasGravadas));

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