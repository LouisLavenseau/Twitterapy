export default function displayCounts(number: string) {
  const numberNumber = Number(number);
  var result = "";
  if (numberNumber / 10000 < 1) {
    return numberNumber.toString();
  }
  if (numberNumber / 10000 > 0 && numberNumber / 1000000 < 1) {
    if (Math.floor((numberNumber % 1000) / 100) == 0) {
      result = Math.floor(numberNumber / 1000).toString() + "k";
    } else {
      result =
        Math.floor(numberNumber / 1000).toString() +
        "," +
        Math.floor((numberNumber % 1000) / 100).toString() +
        "k";
    }
    return result;
  }
  if (numberNumber / 10000000 > 0) {
    if (Math.floor((numberNumber % 1000000) / 100000) == 0) {
      result = Math.floor(numberNumber / 1000000).toString() + "M";
    } else {
      result =
        Math.floor(numberNumber / 1000000).toString() +
        "," +
        Math.floor((numberNumber % 1000000) / 100000).toString() +
        "M";
    }
    return result;
  }
}
