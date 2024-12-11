const arrayContainer = document.getElementById('array-container');
const randomizeBtn = document.getElementById('randomize');
const sortBtn = document.getElementById('sort');
const algorithmSelect = document.getElementById('algorithm');
const speedSelect = document.getElementById('speed');
const sizeInput = document.getElementById('size');
const complexityDisplay = document.getElementById('complexity-display');
const sortingTimeDisplay = document.getElementById('sorting-time');
const spaceComplexityDisplay = document.getElementById('space-complexity'); // New element for space complexity

let array = [];
let bars = [];
let delay = 100;

function generateArray(size) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    bars = array.map((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${600 / array.length}px`;
        arrayContainer.appendChild(bar);
        return bar;
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    complexityDisplay.innerText = 'Time Complexity: O(n^2)';
    spaceComplexityDisplay.innerText = 'Space Complexity: O(1)';
    const startTime = performance.now();
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
                await sleep(delay);
            }

            bars[j].style.backgroundColor = 'green';
            bars[j + 1].style.backgroundColor = 'green';
        }
    }
    const endTime = performance.now();
    sortingTimeDisplay.innerText = `${(endTime - startTime).toFixed(2)} ms`;
}

async function cocktailSort() {
    complexityDisplay.innerText = 'Time Complexity: O(n^2)';
    spaceComplexityDisplay.innerText = 'Space Complexity: O(1)';
    const startTime = performance.now();
    let start = 0, end = array.length - 1;
    while (start < end) {
        for (let i = start; i < end; i++) {
            bars[i].style.backgroundColor = 'red';
            bars[i + 1].style.backgroundColor = 'red';

            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                renderArray();
                await sleep(delay);
            }

            bars[i].style.backgroundColor = 'green';
            bars[i + 1].style.backgroundColor = 'green';
        }
        end--;

        for (let i = end; i > start; i--) {
            bars[i].style.backgroundColor = 'red';
            bars[i - 1].style.backgroundColor = 'red';

            if (array[i] < array[i - 1]) {
                [array[i], array[i - 1]] = [array[i - 1], array[i]];
                renderArray();
                await sleep(delay);
            }

            bars[i].style.backgroundColor = 'green';
            bars[i - 1].style.backgroundColor = 'green';
        }
        start++;
    }
    const endTime = performance.now();
    sortingTimeDisplay.innerText = `${(endTime - startTime).toFixed(2)} ms`;
}

async function insertionSort() {
    complexityDisplay.innerText = 'Time Complexity: O(n^2)';
    spaceComplexityDisplay.innerText = 'Space Complexity: O(1)';
    const startTime = performance.now();
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            bars[j + 1].style.backgroundColor = 'red';
            array[j + 1] = array[j];
            renderArray();
            await sleep(delay);
            bars[j + 1].style.backgroundColor = 'green';
            j--;
        }
        array[j + 1] = key;
        renderArray();
    }
    const endTime = performance.now();
    sortingTimeDisplay.innerText = `${(endTime - startTime).toFixed(2)} ms`;
}

async function selectionSort() {
    complexityDisplay.innerText = 'Time Complexity: O(n^2)';
    spaceComplexityDisplay.innerText = 'Space Complexity: O(1)';
    const startTime = performance.now();
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = 'red';
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'red';

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }

            bars[j].style.backgroundColor = 'green';
        }

        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            renderArray();
            await sleep(delay);
        }
        bars[minIdx].style.backgroundColor = 'green';
    }
    const endTime = performance.now();
    sortingTimeDisplay.innerText = `${(endTime - startTime).toFixed(2)} ms`;
}

async function mergeSortHelper(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);

    let left = start, right = mid + 1;
    const temp = [];

    while (left <= mid && right <= end) {
        bars[left].style.backgroundColor = 'red';
        bars[right].style.backgroundColor = 'red';

        if (array[left] <= array[right]) {
            temp.push(array[left++]);
        } else {
            temp.push(array[right++]);
        }

        renderArray();
        await sleep(delay);
    }

    while (left <= mid) temp.push(array[left++]);
    while (right <= end) temp.push(array[right++]);

    for (let i = start; i <= end; i++) {
        array[i] = temp[i - start];
        bars[i].style.backgroundColor = 'green';
    }
    renderArray();
}

async function mergeSort() {
    complexityDisplay.innerText = 'Time Complexity: O(n log n)';
    spaceComplexityDisplay.innerText = 'Space Complexity: O(n)';
    const startTime = performance.now();
    await mergeSortHelper(0, array.length - 1);
    const endTime = performance.now();
    sortingTimeDisplay.innerText = `${(endTime - startTime).toFixed(2)} ms`;
}

async function quickSortHelper(start, end) {
    if (start >= end) return;

    const pivotIndex = start;
    let left = start + 1;
    let right = end;

    bars[pivotIndex].style.backgroundColor = 'red';

    while (left <= right) {
        while (left <= right && array[left] <= array[pivotIndex]) left++;
        while (left <= right && array[right] > array[pivotIndex]) right--;

        if (left < right) {
            [array[left], array[right]] = [array[right], array[left]];
            renderArray();
            await sleep(delay);
        }
    }

    [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];
    renderArray();
    await sleep(delay);

    await quickSortHelper(start, right - 1);
    await quickSortHelper(right + 1, end);
}

async function quickSort() {
    complexityDisplay.innerText = 'Time Complexity: O(n log n)';
    spaceComplexityDisplay.innerText = 'Space Complexity: O(log n)';
    const startTime = performance.now();
    await quickSortHelper(0, array.length - 1);
    const endTime = performance.now();
    sortingTimeDisplay.innerText = `${(endTime - startTime).toFixed(2)} ms`;
}

// Adjust delay based on speed selection
speedSelect.addEventListener('change', () => {
    const speed = speedSelect.value;
    if (speed === 'fast') delay = 50;
    else if (speed === 'medium') delay = 100;
    else if (speed === 'slow') delay = 300;
});

// Event listeners
randomizeBtn.addEventListener('click', () => generateArray(sizeInput.value));

sortBtn.addEventListener('click', () => {
    const algorithm = algorithmSelect.value;
    if (algorithm === 'bubble') bubbleSort();
    else if (algorithm === 'cocktail') cocktailSort();
    else if (algorithm === 'insertion') insertionSort();
    else if (algorithm === 'selection') selectionSort();
    else if (algorithm === 'merge') mergeSort();
    else if (algorithm === 'quick') quickSort();
});

// Initial setup
generateArray(sizeInput)