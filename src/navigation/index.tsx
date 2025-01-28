import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "./screens/Profile";
import MemoListScreen from "@/screens/MemoList";
import palette from "@/palette";
import routes from "./routes";

const RootStack = createNativeStackNavigator({
  screens: {
    [routes.memoList]: {
      screen: MemoListScreen,
    },
  },
  screenOptions: {
    headerTitleAlign: "center",
    headerShown: true,
    headerStyle: { backgroundColor: palette.header.background },
    headerTitleStyle: { color: palette.header.text },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
