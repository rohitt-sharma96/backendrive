
//string, number boolean, array, tuple, object, void, never

// Array = fixed type but not the length
// tuple = fixed size and type

// const a: number = 4545


type USER = { name: string, age: number, isMale: boolean }

const user: USER = {
    name: "test",
    age: 34,
    isMale: true
}
function fn(obj: USER): void {
    console.log(`Your name is ${obj.name} and age is ${obj.age}`)
}

fn(user)


// any, unknown


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