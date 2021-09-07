import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface InputState {
  text: string;
}
interface InputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
}

export default class Input extends React.Component<InputProps, InputState> {
  state = {
    text: "",
  };

  onChangeText = (text: string) => {
    this.setState({ text });
  };

  render() {
    return (
      <TextInput
        style={styles.input}
        value={this.state.text}
        placeholder={this.props.placeholder}
        onChangeText={this.onChangeText}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    //backgroundColor: "whitesmoke",
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});
