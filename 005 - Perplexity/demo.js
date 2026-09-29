/* let arr = [10, 20, 30]
// let ans = arr.reduce((acc, num) => {

//     acc[num] = num * 2

//     return acc
// }, {})

// console.log(ans)

*/

/* Multiple object ko ek object mein convert karta hai */
const users = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "Aman" },
    { id: 3, name: "Priya" }
]

const ans = users.reduce((acc, user) => {

    acc[user.id] = user.name
    return acc;

}, {})
console.log(ans)