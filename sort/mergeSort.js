const merge = (arr, left, mid, right) => {
    let x1 = mid - left + 1;
    let x2 = right - mid;

    let L = new Array(x1);
    let R = new Array(x2);

    for (let i = 0; i < x1; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < x2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < x1 && j < x2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < x1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < x2) {
        arr[k] = R[j];
        j++;
        k++;
    }
};

const mergeSort = (arr, left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
};

let arr = [3, 2, 1, 13, 8, 5, 0, 1];
mergeSort(arr, 0, arr.length - 1);
console.log(arr);


