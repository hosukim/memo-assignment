import { addMemo, useMemoList } from "@/stores/slice/memo";
import { Text } from "@react-navigation/elements";
import { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import MemoItem from "./components/MemoItem";
import palette from "@/palette";
import { DEFAULT_CONTAINER_PADDING, DEFAULT_CONTENT_PADDING } from "@/constant";

const MemoListScreen = () => {
  const [isAdding, setIsAdding] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const memos = useMemoList();

  useEffect(() => {
    navigation.setOptions({
      title: `메모리스트(${memos.length})`,
    });
  }, [memos, navigation]);

  const handleAddMemo = () => {
    if (isAdding) return;

    setIsAdding(true);

    const dateISOString = new Date().toISOString();
    const newMemo = {
      id: dateISOString,
      title: "제목없음",
      description: "내용없음",
      createdAt: dateISOString.split("T")[0],
      updatedAt: dateISOString.split("T")[0],
    };

    dispatch(addMemo(newMemo));

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
      setIsAdding(false);
    }, 100);
  };

  const EmptyComponent = () => (
    <View style={styles.emptyBlock}>
      <Text>메모가 없습니다.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <FlatList
          ref={flatListRef}
          data={memos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemoItem item={item} />}
          ListEmptyComponent={<EmptyComponent />}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddMemo}>
        <Text style={styles.addButtonText}>추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DEFAULT_CONTAINER_PADDING,
    paddingVertical: DEFAULT_CONTENT_PADDING,
  },
  emptyBlock: {
    justifyContent: "center",
    alignItems: "center",
  },
  listWrapper: {
    flex: 1,
    marginBottom: 75,
    overflow: "hidden",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    marginHorizontal: DEFAULT_CONTAINER_PADDING,
    paddingVertical: DEFAULT_CONTENT_PADDING,
    backgroundColor: palette.black,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 8,
  },
  addButtonText: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MemoListScreen;
