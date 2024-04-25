#! /usr/bin/env node

import inquirer from "inquirer";

let todos: string[] = [];

async function main() {
    let condition = true;

    while (condition) {
        const { choice } = await inquirer.prompt([
            {
                name: 'choice',
                type: 'list',
                message: 'Choose an action:',
                choices: ['Add', 'Delete', 'Edit', 'Display', 'Exit']
            }
        ]);

        switch (choice) {
            case 'Add':
                const { todoItem } = await inquirer.prompt([
                    {
                        name: 'todoItem',
                        type: 'input',
                        message: 'Enter a todo item:'
                    }
                ]);
                todos.push(todoItem);
                console.log(`"${todoItem}" added to the list.`);
                break;
            case 'Delete':
                const { index } = await inquirer.prompt([
                    {
                        name: 'index',
                        type: 'number',
                        message: 'Enter the index of the todo item to delete:'
                    }
                ]);
                if (index >= 0 && index < todos.length) {
                    const deletedTodo = todos.splice(index, 1)[0];
                    console.log(`"${deletedTodo}" deleted from the list.`);
                } else {
                    console.log('Invalid index.');
                }
                break;
            case 'Edit':
                const { editIndex, editedItem } = await inquirer.prompt([
                    {
                        name: 'editIndex',
                        type: 'number',
                        message: 'Enter the index of the todo item to edit:'
                    },
                    {
                        name: 'editedItem',
                        type: 'input',
                        message: 'Enter the new todo item:'
                    }
                ]);
                if (editIndex >= 0 && editIndex < todos.length) {
                    todos[editIndex] = editedItem;
                    console.log(`Todo item edited successfully.`);
                } else {
                    console.log('Invalid index.');
                }
                break;
            case 'Display':
                console.log('Current TODO List:');
                todos.forEach((todo, index) => console.log(`${index + 1}. ${todo}`));
                break;
            case 'Exit':
                console.log('Exiting the todo list application.');
                condition = false;
                break;
        }
    }
}

main();

