function generateRandomInteger() {
    return Math.floor(Math.random() * 500) + 1;
}

function getBars() {
    return document.querySelectorAll('div.bar');
}

function updateHeight(element, height) {
    element.style.height = `${height}px`;
}

function getHeight(element) {
    return parseInt(element.style.height);
}

function setColor(element, color) {
    element.style.backgroundColor = color;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomData() {
    bars = getBars();
    for (var i = 0; i < bars.length; i++) {
        height = generateRandomInteger();
        updateHeight(bars[i], height);
    }
}

async function bubbleSort() {
    const bars = getBars();
    for (let i = 0; i < bars.length; i++) {
        let changed = false;
        for (let j = 0; j < bars.length - 1; j++) {
            prevBarHeight = getHeight(bars[j]);
            nextBarHeight = getHeight(bars[j + 1]);

            setColor(bars[j], 'var(--selected-bar)');
            setColor(bars[j + 1], 'var(--selected-bar)');

            if (nextBarHeight < prevBarHeight) {
                changed = true;
                await sleep(100);
                updateHeight(bars[j], nextBarHeight);
                updateHeight(bars[j + 1], prevBarHeight);
            }

            await sleep(100);

            setColor(bars[j], 'var(--bars)');
            setColor(bars[j + 1], 'var(--bars)');
        }
        if (!changed) {
            break;
        }
    }
}

async function selectionSort() {
    const bars = getBars();
    for (let i = 0; i < bars.length; i++) {
        let changed = false;
        let pos = i;

        for (let j = i + 1; j < bars.length; j++) {
            prevBarHeight = getHeight(bars[pos]);
            nextBarHeight = getHeight(bars[j]);

            setColor(bars[pos], 'var(--selected-bar)');
            setColor(bars[j], 'var(--selected-bar)');
            
            if (nextBarHeight < prevBarHeight) {
                changed = true;
                await sleep(100);
                setColor(bars[pos], 'var(--bars)');
                pos = j
                setColor(bars[pos], 'var(--selected-bar)');
            }

            await sleep(100);
            setColor(bars[pos], 'var(--bars)');
            setColor(bars[j], 'var(--bars)');
        }
        let aux = getHeight(bars[i]);
        updateHeight(bars[i], getHeight(bars[pos]));
        updateHeight(bars[pos], aux);

        if (!changed) {
            break;
        }
    }
}

async function insertionSort() {
    const bars = getBars();
    for (let i = 0; i < bars.length; i++) {
        setColor(bars[i], 'var(--bars)');

        let num = getHeight(bars[i]);
        let j = i - 1;
        
        while (j >= 0 && num < getHeight(bars[j])) {
            setColor(bars[j + 1], 'var(--bars)');
            setColor(bars[j], 'var(--bars)');

            await sleep(100);
            updateHeight(bars[j + 1], getHeight(bars[j]));

            setColor(bars[j], 'var(--selected-bar)');
            setColor(bars[j + 1], 'var(--selected-bar)');

            j--;
        }
        
        await sleep(100);
        updateHeight(bars[j + 1], num);
        setColor(bars[j + 1], 'var(--selected-bar)');
    }
}

async function mergerSort() {
    const bars = getBars();
    
    let heights = [];
    for (let i = 0; i < bars.length; i++) {
        heights.push(getHeight(bars[i]));
    }
    
    const orderedHeights = _mergeSort(heights);
    for (let i = 0; i < bars.length; i++) {
        setColor(bars[i], 'var(--selected-bar)');
        await sleep(200);
        updateHeight(bars[i], orderedHeights[i]);
        setColor(bars[i], 'var(--bars)');
    }
}

function _mergeSort(arr) {
    if (arr.length == 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);

    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return _merge(_mergeSort(left), _mergeSort(right));
}

function _merge(left, right) {
    let arr = [];
    
    let pLeft = pRight = 0;
    
    while (pLeft < left.length && pRight < right.length) {
        if (left[pLeft] < right[pRight]) {
            arr.push(left[pLeft]);
            pLeft++;
        } else {
            arr.push(right[pRight]);
            pRight++;
        }
    }

    return [...arr, ...left.slice(pLeft), ...right.slice(pRight)];
}

async function quickSort() {
    const bars = getBars();

    let heights = [];
    for (let i = 0; i < bars.length; i++) {
        heights.push(getHeight(bars[i]));
    }
    
    const orderedHeights = _quickSort(heights);
    for (let i = 0; i < bars.length; i++) {
        setColor(bars[i], 'var(--selected-bar)');
        await sleep(200);

        updateHeight(bars[i], orderedHeights[i]);
        
        setColor(bars[i], 'var(--bars)');
    }
}

function _quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let low = [];
    let same = []
    let high = [];

    let pivot = arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            low.push(arr[i]);
        } else if (arr[i] == pivot) {
            same.push(arr[i]);
        } else {
            high.push(arr[i]);
        }
    }

    return [..._quickSort(low), ...same, ..._quickSort(high)];
}

function createGraph() {
    randomData();

    const randomButton = document.getElementById('random');
    randomButton.addEventListener('click', randomData);

    const bubbleSortButton = document.getElementById('bubble-sort');
    bubbleSortButton.addEventListener('click', bubbleSort);

    const selectionSortButton = document.getElementById('selection-sort');
    selectionSortButton.addEventListener('click', selectionSort);

    const insertionSortButton = document.getElementById('insertion-sort');
    insertionSortButton.addEventListener('click', insertionSort);

    const mergerSortButton = document.getElementById('merge-sort');
    mergerSortButton.addEventListener('click', mergerSort);

    const quickSortButton = document.getElementById('quick-sort');
    quickSortButton.addEventListener('click', quickSort);
}

createGraph();
