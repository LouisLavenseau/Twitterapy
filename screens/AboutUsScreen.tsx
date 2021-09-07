import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Twitterapy</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>
          This application has been developped by an engineering student in
          cognitive and computer sciences at the Ecole Nationale Supérieure de
          Cognitique, located in Talence, France.
        </Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>
          The icons used in Twitterapy come from the websites flaticon.com and
          freepik.com.
        </Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: "Verdana",
    fontSize: 13,
    textAlign: "justify",
    color: "#3b4552",
  },
  textView: {
    width: width * 0.9,
    marginVertical: 10,
  },
  title: {
    fontFamily: "Verdana",
    fontSize: width / 10,
    color: "#6f6cff",
  },
  titleView: {
    margin: 30,
  },
});
