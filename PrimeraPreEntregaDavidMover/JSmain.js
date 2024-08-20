let dias = 0;
let salud = 100;
let hambre = 50;
let recursos = 50;
let salir = true

function estado(){
    console.log("dias "+ dias);
    console.log("salud " + salud);
    console.log("hambre "+ hambre);
    console.log("recursos "+ recursos);
    console.log("********************");
}

function tomarDecision(){
    
    let decision = parseInt(prompt("Elija una opcion 1-Buscar comida, 2- construir refugio, 3- explorar isla, 4- descansar, 5- salir" ));

    if (decision === 1){
        buscarComida();
    }
    else if (decision === 2){
        construirRefugio();
    }
    else if (decision === 3){
        explorarIsla();
    }
    else if (decision === 4){
        descansar();
    }
    else if (decision === 5){
        console.log("Gracias por participar. Adios!");
        salir = false;
    }
   
    else {
        console.log("opcion incorrecta, descansa un poco");
        descansar();
    }
}


function buscarComida(){

    console.log("Buscando comida...");
    salud -=5;
    hambre -= 10;
    recursos += 10;

    console.log("encontraste comida, Bien ahi!");

}

function construirRefugio(){

    console.log("construyendo refugio...");
    salud += 10;
    hambre +=5;
    recursos -=10;
    console.log("mejoraste tu refugio");
}

function explorarIsla(){

    console.log("explorando zona...");
    salud -=5;
    hambre +=5;
    recursos +=10;
    console.log("encontraste recursos importantes, Vamos!");


}

function descansar(){
    console.log("descansando...");
    salud += 10;
    hambre +=5;
    console.log("recuperaste salud pero te despertaste con hambre");

}

while(salud >= 0 && salir){
    dias++;
    estado();
    tomarDecision();
    
    hambre += 5;

    if ( hambre >= 100){
        console.log("moriste de hambre! x_x");
        break;
    }
    if(salud <= 0){
        console.log("tu salud esta en 0, has muerto! x_x");
        break;
    }
    console.log("****************");   
}

console.log("sobreviviste "+ dias +" dias");