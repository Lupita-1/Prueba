 
var imageObj=[], imagenC=[];
var i=0;
var animales1;

function agregar(){
 
nombreA=document.getElementById('nombreA').value;
riesgoA=document.getElementById('riesgo').value;
datos=document.getElementById('datos').value
urlImage=document.getElementById('imagefile').value

nombreImagen=urlImage.split("\\")[2];

nuevoA=JSON.parse( `{"nombre":"${nombreA}","riesgo":"${riesgoA}","info":"${datos}","img":"${nombreImagen}"} `);
animales1.push(nuevoA);
agregarAnimal(nuevoA);

        $.ajax({
                url : "actualizaLista.php",
                data : "datos="+ JSON.stringify(nuevoA) , 
                method : "post", //en este caso
                dataType : "json",
                processData:false
        }).done(function(res){
                    console.log( res );
                    
                });

}


function lee_json1() {

            $.getJSON("files/animales.json", datos=> {
                animales1=datos.animales;
                console.log(animales1);
                datos.animales.forEach(animal=>{i++;agregarAnimal(animal)});
            }).fail(() => console.log( "error" ) );
        }



function agregarAnimal(animal){
    
    var lista=document.getElementById("lista");
    let item=document.createElement("li");

    item.innerHTML=itemTemplate(animal)
    lista.appendChild(item);

  }

function generaPlantilla(strings,...keys){

 return function(data){

        let temp = strings.slice(); //hace una copia de strings en temp

        keys.forEach( ( key, i ) => {
            if(key==='img')
              temp[ i ] = temp[ i ] + "images/"+data[ key ];
            else
            temp[ i ] = temp[ i ] + data[ key ];
        } );

        return temp.join( '' );
    }    
 
}

var itemTemplate=generaPlantilla`<div class="cajaItem"><img  alt="${ 'nombre' }" src="${ 'img' }">
                                 <h3>${'nombre'}</h3> 
                                 <p> Riesgo: ${'riesgo'} <br>
                                 ${'info'}
                                 </p></div`

function subeImagen(){
      
            var formData = new FormData();
            formData.append("imagen", document.getElementById("imagefile").files[0]);
            
            $.ajax({
                url: "subeArchivo.php",
                type: "post",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
                .done((res)=>{
                    console.log("Respuesta: " + res);
                    agregar();
                });
        
    }
