"use strict";
//string, number boolean, array, tuple, void, never
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    name: "test",
    age: 34,
    isMale: true
};
function fn(obj) {
    console.log(`Your name is ${obj.name} and age is ${obj.age}`);
}
fn(user);
/*


function greet(name:string){
    console.log("Hello "+ name)
}
greet("rohit")

function greet2(): string{
    return "Hii"
}

console.log(greet2())

*/ 
//# sourceMappingURL=index.js.map