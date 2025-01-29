import { createStaticNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import MemoListScreen from "@/screens/MemoList";
import palette from "@/palette";
import routes from "./routes";
import MemoDetailScreen from "@/screens/MemoDetail";
import MemoEditScreen from "@/screens/MemoEdit";

export type RootStackParamList = {
  [routes.memoList]: undefined;
  [routes.memoDetail]: { id: string };
  [routes.memoEdit]: { id: string };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator({
  screens: {
    [routes.memoList]: {
      screen: MemoListScreen,
    },
    [routes.memoDetail]: {
      screen: MemoDetailScreen,
    },
    [routes.memoEdit]: {
      screen: MemoEditScreen,
    },
  },
  screenOptions: {
    headerTitleAlign: "center",
    headerShown: true,
    headerStyle: { backgroundColor: palette.header.background },
    headerTintColor: palette.header.text,
    animation: "slide_from_right",
  },
});

export const Navigation = createStaticNavigation(RootStack);

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
