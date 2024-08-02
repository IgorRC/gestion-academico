export default function bucle (a, b, c){
    if(a>=0 && a<=20){
        if(b>=0 && b<=20){
            if(c>=0 && c<=20){
                return ((a*0.15)+(b*0.35)+(c*0.5));
            }else{
                return "Nota final debe estar en el rango de 0 a 20";
            }
        }
        else{
            return "Nota medio curso debe estar en el rango de 0 a 20";
        }
    }else{
        return "Nota practica debe estar en el rango de 0 a 20";
    }
}