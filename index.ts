#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

console.log(chalk.blue.bold(`
    $$$$$$$$$$$ Welcome to SHAHEEN Currency Converter App $$$$$$$$$$$$$
`));

const currencyRates: { [key: string]: number } = {
    PKR: 1,            // base currency
    USD: 0.0036,
    EUR: 0.0033,
    GBP: 0.0028,
    AED: 0.30,
    SAR: 0.067,
    KWD: 0.0011,
    CAD: 0.0045, // Canadian Dollar
    AUD: 0.0041, // Australian Dollar
    CNY: 0.0229, // Chinese Yuan
    JPY: 0.3937, // Japanese Yen
};

interface UserAnswer {
    from: string;
    to: string;
    amount: number;
}

async function main() {
    try {
        const userAnswer: UserAnswer = await inquirer.prompt([
            {
                name: "from",
                message: chalk.hex('#FFA500').bold("Enter from Currency"),
                type: "list",
                choices: Object.keys(currencyRates), // Dynamically generate choices from available currencies
            },
            {
                name: "to",
                message: chalk.hex('#FFA500').bold("Enter to Currency"),
                type: "list",
                choices: Object.keys(currencyRates), // Dynamically generate choices from available currencies
            },
            {
                name: "amount",
                message: chalk.hex('#FFA500').bold("Enter Amount to Convert"),
                type: "number",
                validate: (value: number) => value > 0 ? true : "Please enter a valid amount",
            }
        ]);

        const userFromCurrency: string = userAnswer.from;
        const userToCurrency: string = userAnswer.to;
        const fromAmount: number = currencyRates[userFromCurrency]; // exchange rate
        const toAmount: number = currencyRates[userToCurrency]; // exchange rate
        const amount: number = userAnswer.amount;
        const baseAmount: number = amount / fromAmount; // base currency amount
        const convertedAmount: number = baseAmount * toAmount;

        console.log(chalk.hex('#FFA500')(`\nYour converted amount from ${chalk.yellowBright(userAnswer.from)} to ${chalk.yellowBright(userAnswer.to)} is ${chalk.yellowBright.bold(convertedAmount.toFixed(2))}\n`));
    } catch (error) {
        console.error(chalk.red("An error occurred: "), error);
    }
}

main();
