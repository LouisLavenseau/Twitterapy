import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ColoredText(props: any) {
  if (props.text != undefined) {
    const array = props.text.split(" ");
    var textToDisplay = "";
    var result = [];
    var i = 0;
    var j = 0;
    while (i < array.length) {
      while (
        array[i] != undefined &&
        array[i][0] != "@" &&
        array[i][0] != "#" &&
        (array[i][0] != "h" ||
          array[i][1] != "t" ||
          array[i][2] != "t" ||
          array[i][3] != "p")
      ) {
        textToDisplay += array[i] + " ";
        i++;
      }
      result[j] = returnText(textToDisplay, props.textStyle, props.color, j);
      j++;
      result[j] = returnText(array[i], props.textStyle, "#6f6cff", j);
      textToDisplay = " ";
      i++;
      j++;
    }
    return (
      <View style={props.viewStyle}>
        <Text style={props.containerTextStyle}>{result}</Text>
      </View>
    );
  } else {
    return <View></View>;
  }
}

const returnText = (
  text: string,
  textStyle: any,
  color: string,
  key: number
) => {
  const style = StyleSheet.flatten([textStyle, { color: color }]);
  return (
    <Text style={style} key={key}>
      {text}
    </Text>
  );
};
