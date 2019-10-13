// we pass in a file name and when ever it gets resolved, the callback is called with the resolved data
function fakeAjaxData(file, cb) {

  const fake_database = {
    "file1": "The first text",
    "file2": "The middle text",
    "file3": "The last text"
  };

  console.log("Requesting data -> " + file);

  if (file === "file1") {
    setTimeout(function () {
      cb(fake_database["file1"]);
    }, 3000);
  } else if (file === "file2") {
    setTimeout(function () {
      cb(fake_database["file2"]);
    }, 1000);
  } else {
    setTimeout(function () {
      cb(fake_database["file3"]);
    }, 5000);
  }
}

function output(text) {
  console.log(text);
}

function* generator () { // declaring a generator
  var x = 1 + (yield);
  var y = 1 + (yield);
  yield (x+y);
}

var genIt = generator(); // it produces and iterator

genIt.next(); // runs the genrator function for the first time
genIt.next(10);
console.log(genIt.next(30));

function* mainGenerator(){
  yield 1;
  a = 12+ (yield);
  yield a;
  yield 2;
  yield 3;
}

var mainIterator = mainGenerator();

console.log(mainIterator.next()); // returning yield
console.log(mainIterator.next(12)); // setting yield
console.log(mainIterator.next()); // reurnin yield
console.log(mainIterator.next());

function coroutine(g){
  var it = g();
  return function(){
    return it.next.apply(it, arguments);
  }
}

var run = coroutine(function*(){
  var x = 1+(yield);
  var y = 1+(yield);
  yield (x+y);
});

run();
run(10);
console.log(run(30));


/**

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



 (function kata6() {
  let fizzBuzz = function (num) {

    for (let i = 1; i <= num; i++) {
      if (i % 3 === 0 && i % 5 == 0){
        console.log('FizzBuzz');
      } else if (i % 3 === 0) {
        console.log('Fizz');
      } else if (i % 5 === 0) {
        console.log('Buzz');
      } else {
        console.log(i);
      }
    }
  };

  console.log(fizzBuzz(5))
})();



 (function kata7() {

  function fakeAjax(cb){ // after 500ms fakeAjax runs cb with some parameters
    setTimeout(function(){
      cb(['book1' , 'book2']);
    },500);
  }

  fakeAjax(function(numList){
    for (let num of numList) {
      console.log(num);
    }
  });

})();



 (function kata8() {

  // we pass in a file name and when ever it gets resolved, the callback is called with the resolved data
  function fakeAjaxData(file, cb) {

    const fake_database = {
      "file1": "The first text",
      "file2": "The middle text",
      "file3": "The last text"
    };

    console.log("Requesting data -> " + file);

    if (file === "file1") {
      setTimeout(function () {
        cb(fake_database["file1"]);
      }, 3000);
    } else if (file === "file2") {
      setTimeout(function () {
        cb(fake_database["file2"]);
      }, 1000);
    } else {
      setTimeout(function () {
        cb(fake_database["file3"]);
      }, 2000);
    }
  }

// *** helper function ***
  function output(text){
    console.log(text);
  }

// *** the old and busted callback way ***
  var responses = {};

  function getFile(file){
    fakeAjaxData(file, function (receivedData) {
      if (!(file in responses)){
        responses[file] = receivedData;
      }

      const filenames = ["file1", "file2", "file3"];
      // render part here
      for (let i = 0; i < filenames.length; i++) {
        if (filenames[i] in responses) {
          output(responses[filenames[i]]);
        } else {
          console.log('returning...');
          return;
        }
      }

      console.log('complete');
    })
  }

  getFile ( "file1");
  getFile ( "file2");
  getFile ( "file3");

})();



 (function kata9() {

  // we pass in a file name and when ever it gets resolved, the callback is called with the resolved data
  function fakeAjaxData(file, cb) {

    const fake_database = {
      "file1": "The first text",
      "file2": "The middle text",
      "file3": "The last text"
    };

    console.log("Requesting data -> " + file);

    if (file === "file1") {
      setTimeout(function () {
        cb(fake_database["file1"]);
      }, 6000);
    } else if (file === "file2") {
      setTimeout(function () {
        cb(fake_database["file2"]);
      }, 2000);
    } else {
      setTimeout(function () {
        cb(fake_database["file3"]);
      }, 10000);
    }
  }


  function getFile(file){
    var text, fn;

    fakeAjaxData(file,function (response) {
      console.log(file,'inside call to fake ajax');
      if (fn) fn(response);
      else text = response;
    });

    return function (cb) {
      console.log(file,'inside return function');
      if (text) cb(text);
      else fn = cb;
    };
  }

  var thunk1 = getFile("file1");
  var thunk2 = getFile("file2");
  var thunk3 = getFile("file3");


  thunk1(function (text1) {
    console.log(text1);
    thunk2(function (text2) {
      console.log(text2);
      thunk3(function (text3) {
        console.log(text3);
        console.log('complete!');
      });
    });
  });

})();


 (function kata10() {
  function fakeAjaxData(file, cb) {

    const fake_database = {
      "file1": "The first text",
      "file2": "The middle text",
      "file3": "The last text"
    };

    console.log("Requesting data -> " + file);

    if (file === "file1") {
      setTimeout(function () {
        cb(fake_database["file1"]);
      }, 3000);
    } else if (file === "file2") {
      setTimeout(function () {
        cb(fake_database["file2"]);
      }, 1000);
    } else {
      setTimeout(function () {
        cb(fake_database["file3"]);
      }, 5000);
    }
  }

  function getFile(file){
    return new Promise(function promiseExecutor(resolve, reject){
      fakeAjaxData(file, resolve); //resolving
    })
  }

  const p1 = getFile("file1");
  const p2 = getFile("file2");
  const p3 = getFile("file3");

  // p1
  // .then((p1text) => console.log(p1text))
  // .then(() => p2)
  // .then((p2text) => console.log(p2text))
  // .then(() => p3)
  // .then((p3Text) => console.log(p3Text))
  // .then(() => console.log('completed'));

  p1.then(function (p1text) {
    console.log(p1text) // responding
  }).then(function () {
    return p2
  }).then(function (p2text) {
    console.log(p2text)
  }).then(function () {
    return p3
  }).then(function (p3text) {
    console.log(p3text)
  });
})();


 //higher order functions practice.
 (function kata11() {
  const companies = [
    {name: "Company One", category: "Finance", start: 1981, end: 2003},
    {name: "Company Two", category: "Retail", start: 1992, end: 2008},
    {name: "Company Three", category: "Auto", start: 1999, end: 2007},
    {name: "Company Four", category: "Retail", start: 1989, end: 2010},
    {name: "Company Five", category: "Technology", start: 2009, end: 2014},
    {name: "Company Six", category: "Finance", start: 1987, end: 2010},
    {name: "Company Seven", category: "Auto", start: 1986, end: 1996},
    {name: "Company Eight", category: "Technology", start: 2011, end: 2016},
    {name: "Company Nine", category: "Retail", start: 1981, end: 1989}
  ];

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  // use forEach to log all the company names.

  companies.forEach((company, index, companies) => {
    console.log(company.name);
  });

  // use filter to get a new array of ages that are more than or equal to 21.
  const newAges = ages.filter((age) => (age >= 21));
  console.log(newAges);

  // filter retail companies
  const retailCompanies = companies.filter((company) => (company.category == "Retail"));
  console.log(retailCompanies);

  // using map, create a new array of company names
  const companyNamesArray = companies.map((company) => (company.name ));
  console.log(companyNamesArray);

  // using map chain, create a new array of ages. subtract each age by 4 and then add text years old to each item.
  const youngByFourYears = ages.map((age) => (age-4)).map((age) => (`${age} ${age>1 ? "Years old" : "Year old" } `));
  console.log(youngByFourYears);

  // sort companies by their start date ascending
  const sortedByYear = companies.sort((a,b) => ((a.start > b.start) ? 1 : -1));
  console.log(sortedByYear);

  // sort ages asc
  const sortedAges = ages.sort((a,b) => ((a > b) ? 1 : -1));
  console.log(sortedAges);

  // use reduce to add all the ages together.
  const ageSum = ages.reduce((total, currentValue, currentIndex, array) => {
    return total + currentValue;
  },0);

  console.log(ageSum);

})();


 (function kata12() {
  // we pass in a file name and when ever it gets resolved, the callback is called with the resolved data
  function fakeAjaxData(file, cb) {

    const fake_database = {
      "file1": "The first text",
      "file2": "The middle text",
      "file3": "The last text"
    };

    console.log("Requesting data -> " + file);

    if (file === "file1") {
      setTimeout(function () {
        cb(fake_database["file1"]);
      }, 3000);
    } else if (file === "file2") {
      setTimeout(function () {
        cb(fake_database["file2"]);
      }, 1000);
    } else {
      setTimeout(function () {
        cb(fake_database["file3"]);
      }, 5000);
    }
  }

  function output(text){
    console.log(text);
  }

  function getFile(file){
    return new Promise(function promiseExecutor(resolve, reject){
      fakeAjaxData(file, resolve); //resolving
    })
  }

// const p1 = getFile("file1");
// const p2 = getFile("file2");
// const p3 = getFile("file3");
//
// p1.then(function (p1text) {
//   console.log(p1text) // responding
// }).then(function () {
//   return p2
// }).then(function (p2text) {
//   console.log(p2text)
// }).then(function () {
//   return p3
// }).then(function (p3text) {
//   console.log(p3text)
// });

  ["file1","file2","file3"]
    .map((file) => {
      return getFile(file);
    }).reduce((promiseChain, currentPromise) => {
    return promiseChain
      .then(() => (currentPromise))
      .then((text) => console.log(text))
  },Promise.resolve())
    .then(() => console.log("completed."));

})();





 **/
