import inquirer from "inquirer" ;
import { faker } from '@faker-js/faker';


interface User {
    id:number;
    pin:number;
    name:string;
    accountNumber:number;
    balance:number;
}

const createUser = () =>{
    let users:User[]= [];

    for(let i= 0; i<5; i++){
        let user:User = {
            id : i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber:Math.floor(1000000 * Math.random()*9000000),
            balance:100000 * i,
        }
        users.push(user)
    };
    return users;

};

// ATM machine
const atmMachine = async(users:User[]) =>{
    const res = await inquirer.prompt({
        type:"number",
        message:"enter your pin code",
        name:"pin"

    })
    const user =users.find(val=> val.pin == res.pin)
    if(user){
        console.log(`welcome ${user.name}`);
        atmFunc(user)
        return;
    }
    console.log("invalid pin")
}
//atm function
const atmFunc = async(user:User) => {
    const ans = await inquirer.prompt({
        type:"list",
        name:"select",
        message:"select your choice",
        choices:["withdraw","Balance","exit"]
    })

    if(ans.select == "withdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            message:"Enter amount",
            name:"rupees"
        })
        if(amount.rupees > user.balance){
            return console.log("your balance is insufficient.")
        }
        console.log(`withdraw amount: ${amount.rupees}`)
        console.log(`balance: ${user.balance-amount.rupees}`)
    }
    if(ans.select == "Balance"){
        console.log(`balance: ${user.balance}`)
        return
    }
    if(ans.select == "exit"){
        console.log("Thanks for using ATM.")
    
    }
    console.log(ans)
}



const users = createUser();

atmMachine(users);