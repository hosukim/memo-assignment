import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const AppKeyboardAvoidingView = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height}
      style={styles.container}
      behavior={Platform.select({ ios: "padding" })}
    >
      <TouchableWithoutFeedback
        style={styles.wrapper}
        onPress={Keyboard.dismiss}
      >
        <>{children}</>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export default AppKeyboardAvoidingView;
