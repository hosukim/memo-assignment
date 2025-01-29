import { Controller, useFormContext } from "react-hook-form";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import palette from "@/palette";

type ControlledInputProps = {
  name: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

const ControlledInput = ({
  name,
  placeholder = "입력해주세요",
  style,
  ...rest
}: ControlledInputProps) => {
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TextInput
          style={[style, styles.input(isFocused, !!error)]}
          onBlur={() => {
            onBlur();
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
      )}
    />
  );
};

const styles = {
  input: (isFocused: boolean, hasError: boolean) => ({
    borderColor: hasError
      ? palette.error
      : isFocused
      ? palette.lightGray
      : "transparent",
    borderWidth: 0.5,
    borderRadius: 4,
  }),
};

export default ControlledInput;
