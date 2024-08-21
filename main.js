import inquirer from 'inquirer';
import chalk from "chalk";
console.log("<<<<<< Welcome to Student Management System >>>>>>");
class Student {
    name;
    id;
    courses;
    balance;
    fee;
    constructor(name, id, courses, balance, fee) {
        this.name = name;
        this.id = id;
        this.courses = courses;
        this.balance = balance;
        this.fee = fee;
    }
    enroll(course) {
        this.courses.push(course);
    }
    payFee(amount) {
        this.balance = amount;
    }
}
class StudentManagementSystem {
    students;
    constructor() {
        this.students = [];
    }
    async addStudent() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter student name:',
            },
            {
                name: 'courses',
                message: 'Please select your courses.',
                type: "list",
                choices: [
                    "Html fees 1250/=",
                    "CSS fees 1200/=",
                    "Phython fees 1100/=",
                    "TypeScript fees 1500/=",
                    "JavaScript fees 1300/=",
                ]
            },
            {
                name: "fee",
                type: "number",
                message: "Enter your selected course fees."
            },
            {
                type: 'input',
                name: 'balance',
                message: 'Enter balance:'
            }
        ]);
        const id = Math.floor(Math.random() * 100000 + 10000);
        const courses = answers.courses.split(',').map((course) => course.trim());
        const fees = answers.balance - answers.fee;
        const student = new Student(answers.name, id, courses, parseInt(answers.balance), fees);
        this.students.push(student);
        console.log(chalk.bold.italic.greenBright('Student added successfully!!!!'));
    }
    displayStudents() {
        console.log('List of Students:');
        this.students.forEach((student, index) => {
            console.log(chalk.bold.italic.blackBright(`Student ${index + 1}:`));
            console.log(chalk.bold.italic.greenBright(`Name: ${student.name}`));
            console.log(chalk.bold.italic.blueBright(`ID: ${student.id}`));
            console.log(chalk.bold.italic.magentaBright(`Courses: ${student.courses.join(', ')}`));
            console.log(chalk.bold.italic.cyanBright(`Balance: ${student.balance}`));
            console.log(chalk.bold.italic.redBright(`Remaing Balance: ${student.fee}`));
            console.log(chalk.bold.italic.yellowBright('---------------------'));
        });
    }
}
async function main() {
    const studentManagementSystem = new StudentManagementSystem();
    while (true) {
        const { choice } = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: 'Choose an action:',
            choices: [
                chalk.bold.italic.cyanBright('Add Student'),
                chalk.bold.italic.greenBright('Display Students'),
                chalk.bold.italic.redBright('Exit')
            ]
        });
        switch (choice) {
            case chalk.bold.italic.cyanBright('Add Student'):
                await studentManagementSystem.addStudent();
                break;
            case chalk.bold.italic.greenBright('Display Students'):
                studentManagementSystem.displayStudents();
                break;
            case chalk.bold.italic.redBright('Exit'):
                console.log('Exiting...');
                return;
            default:
                console.log('Invalid choice');
        }
    }
}
main();
