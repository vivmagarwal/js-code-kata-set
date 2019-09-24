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
    var minindex = 0;
    var maxindex = list.length - 1;
    var guess;

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

(function kata3() {
  // ***** kata 3 *****
  // Merging two sorted array - the result must be sorted as well
  // Pseudo code :
  // Initialize empty array
  // compare the first index of l to first index of r
  // push the lower value to the empty array
  // shift (remove first) array with lower value
  // repeat until both arrays are empty
  function mergeList(l,r){
    let mergedArray = [1,2];
    while(l.length > 0 && r.length > 0){
      if (l[0] < r[0]){
        mergedArray.push(l[0]);
        l.shift();
      } else {
        mergedArray.push(r[0]);
        r.shift();
      }
    }
    return mergedArray;
  }
  console.log('merged sorted list => ',mergeList([5,20,50],[7,10,15,30,75])); // return merged sorted array
})();

(function kata4() {
  // merge sort

})();

(function kata5() {
  // bubble sort - naive solution - not optimized



})();



