import { RootStackParamList } from "@/navigation";
import { MEMO_STATE, updateMemo, useGetMemoDetail } from "@/stores/slice/memo";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import AppKeyboardAvoidingView from "@/components/AppKeyboardAvoidingView";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DEFAULT_CONTAINER_PADDING } from "@/constant";
import palette from "@/palette";
import { useEffect } from "react";
import ControlledInput from "@/components/form/ControlledInput";
import { formatDate } from "@/utils/dateTime";

const memoEditSchema = object().shape({
  title: string().required("제목을 입력해주세요"),
  description: string().required("내용을 입력해주세요"),
});

const MemoEditScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "MemoEdit">>();
  const { id } = route.params;

  const memo: MEMO_STATE = useGetMemoDetail(id);

  const methods = useForm({
    defaultValues: {
      title: memo?.title,
      description: memo?.description,
    },
    resolver: yupResolver(memoEditSchema),
  });
  const { watch, handleSubmit, formState } = methods;
  const { isDirty } = formState;

  const watchedTitle = watch("title");

  useEffect(() => {
    navigation.setOptions({
      title: watchedTitle || "메모 수정",
    });
  }, [watchedTitle]);

  const handleEdit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    dispatch(
      updateMemo({
        id,
        title,
        description,
        updatedAt: formatDate(new Date()),
      })
    );

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <FormProvider {...methods}>
      <AppKeyboardAvoidingView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.innerContainer}
        >
          <View style={styles.header}>
            <ControlledInput
              name="title"
              placeholder="제목을 입력해주세요"
              style={styles.headerTitle}
              numberOfLines={1}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={handleSubmit(handleEdit)}
                style={styles.button}
                disabled={!isDirty}
              >
                <Text style={styles.buttonText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} style={styles.button}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.updatedAt}>{memo.updatedAt}</Text>

          <View style={styles.descriptionWrapper}>
            <ControlledInput
              name="description"
              placeholder="내용을 입력해주세요"
              style={styles.description}
              multiline
            />
          </View>
        </ScrollView>
      </AppKeyboardAvoidingView>
    </FormProvider>
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
    flex: 1,
  },
});

export default MemoEditScreen;
