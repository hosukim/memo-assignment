import { useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressIndicator from "@/components/ProgressIndicator";
import { RootStackParamList } from "@/navigation";
import { deleteMemo, MEMO_STATE, useGetMemoDetail } from "@/stores/slice/memo";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { DEFAULT_CONTAINER_PADDING, DEFAULT_CONTENT_PADDING } from "@/constant";
import routes from "@/navigation/routes";
import { useDispatch } from "react-redux";
import palette from "@/palette";

const MemoDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "MemoDetail">>();
  const { id } = route.params;

  const memo: MEMO_STATE = useGetMemoDetail(id);

  useEffect(() => {
    navigation.setOptions({
      title: memo.title,
    });
  }, [memo, navigation]);

  const handleDelete = () => {
    Alert.alert("메모 삭제", "이 메모를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          dispatch(deleteMemo(id));
          navigation.goBack();
        },
      },
    ]);
  };

  const navigateToEdit = () => {
    navigation.navigate(routes.memoEdit, { id });
  };

  if (!memo) {
    return <ProgressIndicator />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.innerContainer}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {memo.title}
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={navigateToEdit} style={styles.button}>
            <Text style={styles.buttonText}>편집</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.button}>
            <Text style={styles.buttonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.updatedAt}>{memo.updatedAt}</Text>

      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>{memo.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DEFAULT_CONTAINER_PADDING,
  },
  innerContainer: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    paddingVertical: 8,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  button: {
    paddingLeft: 16,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 16,
    color: palette.primary,
    fontWeight: "bold",
  },
  updatedAt: {
    marginTop: 8,
    fontSize: 12,
    color: palette.lightGray,
    textAlign: "right",
  },
  descriptionWrapper: {
    flex: 1,
    marginTop: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: palette.text,
    paddingVertical: 8,
  },
});

export default MemoDetailScreen;
