export default function bucle (a, b, c){
    //Situacion economica de la biblioteca unas
    //Hay dinero?
    if(a=="validando" || a=="promediando" || a=="actualizando"){
        if(a=="validando"){
            a==promediando;
            return "promediando";
        }
        if(a=="promediando"){
            a==actualizando;
            return "actualizando";
        }
    }else{
        return "Debe ingresar un estado valido";
    }
}