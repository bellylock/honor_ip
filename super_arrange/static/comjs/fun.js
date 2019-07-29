export function empty(obj1,obj2){
    if( obj1 == '' ){
        obj2 = true;
        console.log(obj2)
    }else{
        obj2 = false;
        console.log(obj2)
    }
}

export default {
    empty
}