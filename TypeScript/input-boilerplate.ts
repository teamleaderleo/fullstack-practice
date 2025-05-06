import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

const lines: string[] = [];

rl.on('line', (line: string) => {
  lines.push(line);
});

rl.on('close', () => {
  // --- YOUR PROBLEM LOGIC GOES HERE ---
  // 'lines' array now contains all input lines.
  // Process lines[0], lines[1], etc.
  // Perform calculations, transformations, etc.
  // Print your final result(s) using console.log()

  // Example Placeholder:
  // const firstLine = lines[0].split(' ');
  // const numItems = parseInt(firstLine[0]);
  // let total = 0;
  // for (let i = 1; i <= numItems; i++) {
  //   const itemData = lines[i].split(' ');
  //   // process itemData[0], itemData[1] etc.
  // }
  // console.log(total.toFixed(2));
  // --- END OF YOUR PROBLEM LOGIC ---
});