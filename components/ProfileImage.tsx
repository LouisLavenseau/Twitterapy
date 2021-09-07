import React from "react";
import { Avatar } from "react-native-paper";

export default function ProfileImage(props: any) {
  if (props.profileImageType == "local" || props.source == "") {
    return (
      <Avatar.Image
        source={require("../assets/images/profile.png")}
        size={props.size}
        style={props.style}
      ></Avatar.Image>
    );
  } else {
    return (
      <Avatar.Image
        source={{ uri: props.source }}
        size={props.size}
        style={props.style}
      ></Avatar.Image>
    );
  }
}
