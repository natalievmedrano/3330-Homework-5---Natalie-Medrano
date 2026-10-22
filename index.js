
import prompts from "prompts";
import chalk from 'chalk';
import { randomInt } from 'node:crypto';
import fs from 'node:fs';

const maximum_attempts = 3;
const rightNumber = randomInt(1, 11);
let gameAttempts = 0;
let gameWon = false;
let output = [];

console.log(chalk.magenta.bold('Guess the number'));
console.log('Guess a number between 1-10');
console.log(`You have ${maximum_attempts} attempts.`);


output.push('Guess the number');
output.push('Guess a number between 1-10');
output.push(`You have ${maximum_attempts} attempts.`);

while (gameAttempts < maximum_attempts && !gameWon) {
    const response = await prompts({
        type: 'text',
        name: 'guess',
        message: `Attempt ${gameAttempts + 1}/${maximum_attempts}: Enter your guess`
    });

    try {
        if (response.guess === undefined || response.guess.trim() === '') {
            throw new Error('Invalid. Please enter a number.');
        }

        const guess = Number(response.guess);

        if (!Number.isInteger(guess)) {
            throw new Error('Invalid. Enter a whole number.');
        }

        if (guess <= 0 || guess > 10) {
            throw new Error('Invalid. The number must be between 1 and 10.');
        }

        gameAttempts++;

        if (guess === rightNumber) {
            console.log(chalk.green('Correct, you have guessed the number right!'));
            output.push('Correct, you have guessed the number right!');
            gameWon = true;
        } else if (guess < rightNumber) {
            console.log(chalk.yellow('Too low, its a higher number'));
            output.push('Too low, its a higher number');
        } else {
            console.log(chalk.yellow('Too high, its a lower number'));
            output.push('Too high, its a lower number');
        }

    } catch (error) {
        console.log(chalk.red(error.message));
        output.push(error.message);
    }

    console.log('');
}

if (!gameWon) {
    console.log(chalk.red.bold('Game over!'));
    console.log(`The correct number was ${rightNumber}.`);

    output.push('Game over!');
    output.push(`The correct number was ${rightNumber}.`);
}

console.log(chalk.magenta('Thank you for playing!'));
output.push('Thank you for playing!');

fs.writeFileSync('game-output.txt', output.join('\n') + '\n');
