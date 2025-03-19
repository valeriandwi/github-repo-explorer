import readline from "readline";
import { execSync } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const versionOptions = [
  "patch",
  "minor",
  "major",
  "prerelease-alpha",
  "prerelease-beta",
];

console.log("Select a version bump:");
versionOptions.forEach((option, index) =>
  console.log(`${index + 1}. ${option}`)
);

rl.question("Enter a number (1-5): ", (answer) => {
  const selectedOption = versionOptions[parseInt(answer) - 1];

  if (!selectedOption) {
    console.log("Invalid selection. Exiting...");
    rl.close();
    process.exit(1);
  }
  console.log(`Running standard-version with '${selectedOption}' bump...`);

  try {
    if (selectedOption === "prerelease-alpha") {
      execSync(`npx standard-version --prerelease alpha`, { stdio: "inherit" });
    } else if (selectedOption === "prerelease-beta") {
      execSync(`npx standard-version --prerelease beta`, { stdio: "inherit" });
    } else {
      execSync(`npx standard-version --release-as ${selectedOption}`, {
        stdio: "inherit",
      });
    }
  } catch (error) {
    console.error("Error running standard-version:", error.message);
  }

  rl.close();
});
