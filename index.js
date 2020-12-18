require('./animation');

function string_to_array(str){
    return str.split(" ");
}

function es_impar(n){
    let impar = true;
    if(n % 2 == 0) impar = false;
    return impar;
}

function funcion_euler(p, q){
    //p y q son primos distintos
    //p y q son coprimos
    //luego ø(pq) = ø(p) * ø(q) = (p -1) * (q -1)
    let n = (p -1) * (q -1);
    return n;
}

function inverso_multiplicativo(e, module){
    //d*e mod m == 1
    //module es el módulo de la congruencia
    //e es la clave pública del cifrado
    //d es la clave privada que queremos calcular
    // 0<= d < module
    let d = 0;
    let found = false;
    while(!found && d <  module){
        //console.log(d);
        let x = (d * e) % module;
        if(x == 1){
            //se cumple la congruencia
            found = true;
        }else{
            d++;
        }
    }
    return d;
}

function descifrar_caracter(d, module, encripted) {
    // codigo desencriptado M = c ^e mod n
    //Empleamos el algoritmo de exponenciación modular debido a que se trata
    //de un número muy grande

    let decripted = exponenciacion_modular(encripted, d,module);
    return decripted;
}

function exponenciacion_modular(base, exp, m){
    let c = 1;
    let e = 1;
    let result;

    while (e <= exp) {
        result = (base * c) % m;
        c = result;
        e++;
    }
    return result;
}

function descifrar_RSA (e, p, q, message){
    //e: clave pública del mensaje
    //d: clave privada del mensaje (calcular)
    //p * q modulo del mensaje (ver RSA)
    //pn(p*q) = funcion de euler del módulo del mensaje
    let Pn = funcion_euler(p, q);
    let d = inverso_multiplicativo(e, Pn);
    message = string_to_array(message);
    console.log("inverso multiplicativo = " + d);
    console.log("P(n) = " + Pn);
    console.log(message);
    for(let i = 0; i < message.length; i++){
        n = parseInt(message[i]);
        if(!isNaN(n)) message[i] = descifrar_caracter(d, p*q, n);
    }
    console.log(message);
    descifrar_Cesar(message);
}

function descifrar_Cesar(message){
    //D_n(x) = x - n \mod {26}.
    //probamos con todos los posibles desplazamientos
    let str, strAcum, strResult;
    strAcum = "";
    for(let n = 0; n < 26; n++){
        str = "";
        for(let i = 0; i < message.length; i++){
            if(message[i] != ''){
                let leter_index = Math.abs((message[i] - n )) % 26;
                str += abcdario[leter_index];
            }else{
                str += " ";
            }
        }
        if(n == 4) strResult = str;
        strAcum += str +" ";
        //console.log(str);
    }
    console.log(strAcum);
    console.log("\x1b[47m\x1b[30m%s\x1b[0m" ,"--- " + strResult + " ---");
}

console.log("Descifrar mensaje:");
let abcdario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let encripted_message = "362 420  299 362 420 181 446 08 147 08"
descifrar_RSA(41, 17, 31, encripted_message);
//let desencripted_message = "12 22  7 12 22 6 21 8 23 8";
// desencripted_message = string_to_array(desencripted_message);
//sdescifrar_Cesar(desencripted_message);
//console.log(exponenciacion_modular(4, 13, 497));