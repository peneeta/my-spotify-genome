// Didn't end up using this one
export function sortNumbersToSineWave(numbers: number[]): number[] {

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

export function generateColors(){
    const neonColors = [
        "#FF006E", // Neon Pink
        "#8338EC", // Neon Purple
        "#3B86FF", // Neon Blue
        "#FF5733", // Neon Red-Orange
        "#FF8C00", // Neon Orange
        "#FFD700", // Neon Gold
        "#ADFF2F", // Neon Green-Yellow
        "#00FF00", // Neon Green
        "#00FF7F", // Neon Spring Green
        "#00FFFF", // Neon Cyan
        "#7FFF00", // Neon Chartreuse
        "#FF1493", // Neon Deep Pink
        "#9400D3", // Neon Dark Violet
        "#EE82EE", // Neon Violet
        "#FF00FF", // Neon Magenta
        "#DC143C", // Neon Crimson
        "#FF4500", // Neon Orange Red
        "#FF6347", // Neon Tomato
        "#1E90FF", // Neon Dodger Blue
        "#7CFC00"  // Neon Lawn Green
    ];

    return neonColors
}