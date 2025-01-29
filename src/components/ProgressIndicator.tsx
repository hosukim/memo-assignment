import palette from "@/palette";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

type ProgressIndicatorProps = {
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
};

const ProgressIndicator = ({
  size = "large",
  color,
  style,
}: ProgressIndicatorProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color || palette.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProgressIndicator;
