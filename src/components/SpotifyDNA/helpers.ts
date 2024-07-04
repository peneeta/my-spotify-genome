// MODIFY THIS TO SORT POPULARITY SCORES

export function sortNumbersToSineWave(numbers: number[]): number[] {
    // Step 1: Extract the numbers from the JSON object
    //const numbers: number[] = jsonObject.items.popularity;

    // Step 2: Sort the numbers in descending order
    numbers.sort((a, b) => b - a);

    // Step 3: Arrange the numbers in a sine wave pattern
    const sineWavePattern: number[] = [];
    const halfLength: number = Math.floor(numbers.length / 2);

    for (let i = 0; i < halfLength; i++) {
        sineWavePattern.push(numbers[i]); // Peaks
        sineWavePattern.push(numbers[numbers.length - 1 - i]); // Troughs
    }

    // If the length is odd, add the middle element
    if (numbers.length % 2 !== 0) {
        sineWavePattern.push(numbers[halfLength]);
    }

    // Step 4: Ensure the first and second largest numbers are at the start and end
    const result: number[] = [numbers[0], ...sineWavePattern.slice(1, -1), numbers[1]];

    return result;
}

// // Example usage
// const jsonObject: NumbersObject = {
//     numbers: [34, 78, 56, 23, 89, 90, 12, 67, 45, 38, 76, 49, 88, 92, 14, 65, 29, 80, 55, 61]
// };

// const sortedNumbers = sortNumbersToSineWave(jsonObject);
// console.log(sortedNumbers);
