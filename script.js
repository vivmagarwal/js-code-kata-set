// ***** Kata 1 *****
// liner search using foreach iteration
// time complexity - liner

(function kata1() {
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


// ***** Kata 2 *****
// binary search solution for the same problem
// we want to make our list smaller every time
(function kata2() {
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

  console.log('binary search result => ', binarySearch([2,6,7,90,103,105],90));
})();






