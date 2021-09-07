import React from "react";
import { Image, View, StyleSheet } from "react-native";

export default function BannerImage(props: any) {
  if (props.bannerImageType == "local" || props.source == "") {
    return (
      <Image
        source={require("../assets/images/banner.jpg")}
        style={props.style}
      ></Image>
    );
  } else if (props.source == undefined) {
    const style = StyleSheet.flatten([
      { backgroundColor: "white" },
      props.style,
    ]);
    return <View style={style}></View>;
  }
  {
    return <Image source={{ uri: props.source }} style={props.style}></Image>;
  }
}
