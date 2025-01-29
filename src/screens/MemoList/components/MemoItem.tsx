import { DEFAULT_CONTENT_PADDING } from "@/constant";
import palette from "@/palette";
import { deleteMemo, MEMO_STATE } from "@/stores/slice/memo";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import routes from "@/navigation/routes";
import { RootStackNavigationProp } from "@/navigation";

const MemoItem = ({ item }: { item: MEMO_STATE }) => {
  const dispatch = useDispatch();

  const { navigate } = useNavigation<RootStackNavigationProp>();

  const onPressMemoDetail = () => {
    navigate(routes.memoDetail, { id: item.id });
  };

  const handleDeleteMemo = (id: string) => {
    dispatch(deleteMemo(id));
  };

  return (
    <View style={styles.memoContainer}>
      <TouchableOpacity style={styles.memoContent} onPress={onPressMemoDetail}>
        <View style={styles.memoTitleBlock}>
          <Text style={styles.memoTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.memoDate}>{item.updatedAt}</Text>
        </View>
        <Text style={styles.memoContentText} numberOfLines={1}>
          {item.description}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteMemo(item.id)}
      >
        <Feather name="x" size={24} color={palette.gray} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  memoContainer: {
    flexDirection: "row",
    paddingVertical: DEFAULT_CONTENT_PADDING,
    borderBottomWidth: 1,
    borderBottomColor: palette.devider,
  },
  memoContent: {
    flex: 1,
  },
  memoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  memoTitleBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 56,
  },
  memoDate: {
    fontSize: 12,
    color: palette.lightGray,
    paddingLeft: 8,
  },
  memoContentText: {
    fontSize: 16,
    color: palette.gray,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});

export default MemoItem;
