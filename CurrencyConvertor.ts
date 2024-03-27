#!/usr/bin/env node

import inquirer from "inquirer";

type Currency = {
    country: string,
    symbol: string,
    pkr: number,
    usd: number,
    euro: number
}

const currencies: {[currency: string]: Currency} = {
    PKR: {
        country: "Pakistan",
        symbol: "PKR",
        pkr: 1,
        usd: 0.0036,
        euro: 0.0033,
    },

    USD: {
        country: "United State of America",
        symbol: "USD",
        pkr: 278.75,
        usd: 1,
        euro: 0.92,
    },

    EUR: {
        country: "Europe",
        symbol: "EUR",
        pkr: 301.97,
        usd: 1.08,
        euro: 1,
    }
}

type UserInput = {
    currency: "PKR" | "USD" | "EUR";
    toConvert: "PKR" | "USD" | "EUR";
    amount: number;
};

const getUserInput = async () => {
    const userInput: UserInput = await inquirer.prompt([
        {
            name: "currency",
            type: "list",
            choices: ["PKR", "USD", "EUR"],
            message: "Select your currency"
        },
        {
            name: "amount",
            type: "number",
            message: "Enter amount to convert",
        },
        {
            name: "toConvert",
            type: "list",
            choices: ["PKR", "USD", "EUR"],
            message: "Select currency to convert"
        }
    ]);

    return userInput;
}


const main = async () => {
    let condition: boolean = true
    
    do {
        const userInput = await getUserInput();
        const { currency, amount, toConvert } = userInput;

        const toProperty = toConvert.toLowerCase() === 'pkr' ? 'pkr' : toConvert.toLowerCase() === 'usd' ? 'usd' : 'euro';
        const conversionRate = currencies[currency][toProperty];

        const convertedAmount = amount * conversionRate;
        console.log(`${amount} ${currency} to ${convertedAmount} ${toConvert}`);

        const again = await inquirer.prompt({
            name: 'again',
            type: 'list',
            choices: ["Again", "Exit"],
            message: 'Again or Exit?'
        });

        const answer = again.again;

        if (answer === 'Exit') {
            condition = false
        }
    } while (condition);
}

main()
