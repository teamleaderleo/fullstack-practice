// No imports usually needed for this basic method

let entireInput: string = '';

process.stdin.on('data', (chunk: Buffer | string) => {
  entireInput += chunk.toString();
});

process.stdin.on('end', () => {
  // --- YOUR PROBLEM LOGIC GOES HERE ---
  // 'entireInput' string now contains all input.
  // You'll likely split it into lines: const lines = entireInput.split('\n');
  // Then process the 'lines' array or the raw string.
  // Perform calculations, transformations, etc.
  // Print your final result(s) using console.log()

  // Example Placeholder:
  // const lines = entireInput.split('\n');
  // const wordCounts: { [key: string]: number } = {};
  // for (const line of lines) {
  //    // process line: lowercase, remove punctuation, split into words
  //    // update wordCounts
  // }
  // const sortedWords = Object.keys(wordCounts).sort();
  // for (const word of sortedWords) {
  //     console.log(`${word}: ${wordCounts[word]}`);
  // }
  // --- END OF YOUR PROBLEM LOGIC ---
});