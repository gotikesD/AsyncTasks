module.exports = (char) => {
  let LEVEL_1 = char >= 'a' && char <= 'i';
  let LEVEL_2 = char >= 'j' && char <= 'r';
  let LEVEL_3 = char >= 's' && char <= 'z';

  if(LEVEL_1) { return 1 }
  if(LEVEL_2) { return 2 }

  return 3

}