export const calculateMean = (data: number[]): number => {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return +(sum / data.length).toFixed(2);
};

export const calculateVariance = (data: number[]): number => {
    const mean = calculateMean(data);
    const squaredDifferences = data.map((val) => Math.pow(val - mean, 2));
    const sumOfSquaredDifferences = squaredDifferences.reduce((acc, val) => acc + val, 0);
    return +(sumOfSquaredDifferences / data.length).toFixed(2);
};

export const calculateStandardDeviation = (data: number[]): number => {
    const variance = calculateVariance(data);
    return +Math.sqrt(variance).toFixed(2);
};

export const calculateMode = (data: number[]): number => {
    const frequency: { [key: number]: number } = {};
    let maxFrequency = 0;
    let mode = 0;

    data.forEach((val) => {
        if (frequency[val]) {
            frequency[val]++;
        } else {
            frequency[val] = 1;
        }

        if (frequency[val] >= maxFrequency) {
            maxFrequency = frequency[val];
            mode = val;
        }
    });

    return mode;
};

export const calculateMedian = (data: number[]): number => {
    const sortedData = data.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 1) {
        return sortedData[middleIndex];
    } else {
        const median = (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
        return +median.toFixed(2);
    }
};