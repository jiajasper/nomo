const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function runCommand(command) {
    try {
        const { stdout, stderr } = await execPromise(command);
        console.log(stdout);
        if (stderr) console.error(stderr);
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error);
    }
}

async function build() {
    console.log('Starting build process...');

    // Run generate-site-files.js
    console.log('Generating site files...');
    await runCommand('node generate-site-files.js');

    // Run Tailwind CSS compilation
    console.log('Compiling Tailwind CSS...');
    await runCommand('npx tailwindcss -i ./css/styles.css -o ./css/output.css');

    console.log('Build process completed!');
}

build();