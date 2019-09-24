// ***** Kata 1 *****
function linearSearch(list, item){
  let index = -1;
  list.forEach((listItem, i) => {
    if (listItem === item) {
      index = i;
    }
  });
  return index;
}

console.log('index of found item => ', linearSearch([2,15,35,90,115],90));

