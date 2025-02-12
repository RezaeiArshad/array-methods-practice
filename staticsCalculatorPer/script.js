const input = document.getElementById("input");

const mean = document.getElementById("mean");
const median = document.getElementById("median")
const mode = document.getElementById("mode");
const range = document.getElementById("range")
const variance = document.getElementById("variance");
const standardDeviation = document.getElementById("standard-deviation");
const coefficientOfVariation = document.getElementById("coefficient-of-variation");

const getMean = (array) => {
   const meanVal = (array.reduce((acc, el) =>  acc + el,0)) / array.length;
   mean.textContent = meanVal;
   return meanVal;
}

const getMedian = (array) => {
    // could've used the sort method but i needed some practice with algorithms 
   const sortedArray = (value) => {
    for (let i = 1; i < value.length ; i++) {
        const currVal = value[i];
        let j = i - 1;
        while (j >= 0 && value[j] > currVal) {
          value[j + 1] = value[j];
          j--;
        }
        value[j + 1] = currVal
    }
    return value
   };
   const medianVal = sortedArray(array).length % 2 === 0 ? (array[array.length / 2] + array[(array.length / 2) - 1]) / 2 : array[Math.floor(array.length / 2)]
   median.textContent = medianVal
}

const getMode = (array) => {
    const counts = {};
    array.forEach(el => {
        if (counts[el]) {
           counts[el] += 1;
        }
        else {
        counts[el] = 1
        }
    });
    if (new Set(Object.values(counts)).size === 1) {
        mode.textContent = "ندارد";
        return
    }
    const mostTimes = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    const modeVal = Object.keys(counts).filter((el) => counts[el] === counts[mostTimes]).join(", ")
    mode.textContent = modeVal;
}

const getRange = (array) => {
    const rangeVal = Math.max(...array) - Math.min(...array);
    range.textContent = rangeVal;
}

const getVariance = (array) => {
    const meanValue = getMean(array);
    const varianceVal = array.reduce((acc, el) => acc + ((el - meanValue) ** 2),0) / array.length;
    variance.textContent = varianceVal;
    return varianceVal;
}

const getStandardDeviation = (array) => {
   const standardDeviationVal = getVariance(array) ** 0.5;
   // ffc used the Math.sqrt() method
   standardDeviation.textContent = standardDeviationVal;
   return standardDeviationVal;
}

const getCoefficientOfVariation = (array) => {
   const coefficientOfVariationVal = getStandardDeviation(array) / getMean(array);
   coefficientOfVariation.textContent = coefficientOfVariationVal;
}

const checkInputs = () => {
    const values = input.value.trim("").split(",").map((el) => Number(el)).filter((el) => !isNaN(el))
    if (values.length === 0 || values.length === 1) {
        alert("لطفا حداقل دو مقدار وارد کنید");
        return
    }

    getMean(values);
    getMedian(values);
    getMode(values);
    getRange(values);
    getVariance(values);
    getStandardDeviation(values);
    getCoefficientOfVariation(values);
}