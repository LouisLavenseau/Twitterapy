import React from "react";
import { View, Text } from "react-native";
import ColoredText from "./ColoredText";

export default function DescriptionAccount(props: any) {
  if (props.text == "") return <View></View>;
  else {
    return (
      <ColoredText
        viewStyle={props.viewStyle}
        textStyle={props.textStyle}
        text={props.text}
        color={props.color}
      ></ColoredText>
    );
  }
}
