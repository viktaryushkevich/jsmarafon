function getVowels(str) {
  var vowelsCount = 0;

  //turn the input into a string
  var string = str.toString();

  //loop through the string
  for (var i = 0; i <= string.length - 1; i++) {

  //if a vowel, add to vowel count
    if (string.charAt(i) == "а") {
      vowelsCount += 1;
    }
  }
  return vowelsCount;
}


const firstRow = 'мама мыла раму';
const secondRow = 'собака друга человекаааааа';

function getRow(firstRow, secondRow) {


    if (getVowels(firstRow) > getVowels(secondRow)) {
        return firstRow
    } else {
        return secondRow
    }
    
}

console.log(getRow(firstRow, secondRow));