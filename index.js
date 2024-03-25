const inquirer = require("inquirer");
const SVG = require("./library/svg");
const { Circle, Triangle, Square } = require("./library/shapes");
const { writeFile } = require("fs/promises");

// Function to generate SVG
async function generateSVG() {
    try {
        const userInput = await inquirer.prompt([
            {
                type: "list",
                name: "shape",
                message: "Which shape would you like your SVG to be?",
                choices: ["Circle", "Triangle", "Square"]
            },
            {
                type: "input",
                name: "shapeColor",
                message: "What color would you like your SVG to be?"
            },
            {
                type: "input",
                name: "text",
                message: "What would you like the text to say in your SVG? (1-3 characters)"
            },
            {
                type: "input",
                name: "textColor",
                message: "What color would you like your text to be?"
            }
        ]);

        console.log(userInput);

        let svgShape;

        if (userInput.shape === "Circle") {
            svgShape = new Circle();
        } else if (userInput.shape === "Triangle") {
            svgShape = new Triangle();
        } else if (userInput.shape === "Square") {
            svgShape = new Square();
        }

        svgShape.setColor(userInput.shapeColor);

        const svg = new SVG();
        svg.setText(userInput.text, userInput.textColor);
        svg.setShape(svgShape);

        await writeFile("./examples/logo.svg", svg.render());
        console.log("Your SVG logo has been successfully generated and named logo.svg in the examples folder");
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

generateSVG();
