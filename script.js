(function kata1() {
  // ***** Kata 1 *****
  // liner search using foreach iteration
  // time complexity - liner
  function linearSearch(list, item) {
    let index = -1;
    list.forEach((listItem, i) => {
      if (listItem === item) {
        index = i;
      }
    });
    return index;
  }

  console.log('linear search result => ', linearSearch([2, 15, 35, 90, 115], 90));
})();

(function kata2() {
  // ***** Kata 2 *****
  // binary search solution for the same problem - the array is sorted
  // we want to make our list smaller every time
  function binarySearch(list, item) {
    let minindex = 0;
    let maxindex = list.length - 1;
    let guess;

    while (minindex <= maxindex) {
      guess = Math.floor((minindex + maxindex) / 2);
      if (list[guess] === item) {
        return guess;
      } else {
        if (list[guess] < item) {
          minindex = guess + 1;
        } else {
          maxindex = guess - 1;
        }
      }
    }
    return -1;
  }

  console.log('binary search result => ', binarySearch([2, 6, 7, 90, 103, 105], 90));
})();

let kata3 = (function kata3() {
  // ***** kata 3 *****
  // Merging two sorted array - the result must be sorted as well
  // Pseudo code :
  // Initialize empty array
  // compare the first index of l to first index of r
  // push the lower value to the empty array
  // shift (remove first) array with lower value
  // repeat until both arrays are empty
  function mergeList(l, r) {
    let mergedArray = [];
    while (l.length > 0 && r.length > 0) {
      if (l[0] < r[0]) {
        mergedArray.push(l[0]);
        l.shift(); // instead of shifting its efficient to use index counter instead.
      } else {
        mergedArray.push(r[0]);
        r.shift();
      }
    }
    return mergedArray;
  }

  console.log('merged sorted list => ', mergeList([5, 20, 50], [7, 10, 15, 30, 75])); // return merged sorted array
  // 75 is missing from the result. it will be taken care in b implementation.

})();

let kata3b = (function kata3b() {
  // Merge the two arrays: left and right
  function mergeList(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++; // move left array cursor
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++; // move right array cursor
      }
    }

    // We need to concat here because there will be one element remaining
    // from either left OR the right
    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

  // Just making this function available outside the iife by returning this object.
  return {mergeList: mergeList};
})();

(function kata4() {
  // Merge Sort Implementation (Recursion)
  function mergeSort(unsortedArray) {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);

    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    // Using recursion to combine the left and right
    return kata3b.mergeList(
      mergeSort(left), mergeSort(right)
    );
  }

  console.log('merge sort kata4 => ', mergeSort([9, 3, 5, 8, 25, 20, 40, 45, 50]))
})();

(function kata5a() {
  // bubble sort - naive solution - not optimized

  // helper swap function
  function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // bubble sort basic - not optimized - quadratic time complexity.
  function bubbleSortBasic(array) {
    let counterOuter = 0;
    let counterInner = 0;
    let counterSwap = 0;

    for (let i = 0; i < array.length; i++) {
      counterOuter++;
      for (let j = 1; j < array.length; j++) {
        counterInner++;
        if (array[j - 1] > array[j]) { // if the item is greater than the next item, they are swapped so that the smaller is comes before.
          counterSwap++;
          swap(array, j - 1, j);
        }
      }
    }
    console.log('counters to show inefficiency of this way => ', counterInner, counterOuter, counterSwap);
    return array;
  }

  console.log('bubble sort basic => ', bubbleSortBasic([3, 5, 8, 25, 20, 40, 45, 50]));
})();

(function kata5b() {
  // helper swap function
  function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // optimized bubble sort
  // if we are working with a mostly sorted list - its okay
  // if we are dealing with a reverse list - its terrible - quadratic solution in the worst case

  function bubbleSortOptimized(array) {
    let countInner = 0;
    let countOuter = 0;
    let countSwap = 0;
    let swapped;

    do {
      countOuter++;
      swapped = false;
      for (let i = 0; i < array.length; i++) {
        countInner++;
        if (array[i] && array[i + 1] && array[i] > array[i + 1]) {
          countSwap++;
          swap(array, i, i + 1);
          swapped = true;
        }
      }
    } while (swapped);

    console.log('counters to show efficiency of this way in some situations => ', countInner, countOuter, countSwap);
    return array;
  }

  console.log('bubble sort optimized => ', bubbleSortOptimized([3, 5, 8, 25, 20, 40, 45, 50]));
})();



