import React from "react";
import { ColorValue, Text, View } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";
interface DuoInfoProps {
  label: string;
  value: string;
  colorValue?: ColorValue;
}
export function DuoInfo(props: DuoInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Text
        style={[styles.value, { color: props.colorValue ?? THEME.COLORS.TEXT }]}
        numberOfLines={1}
      >
        {props.value}
      </Text>
    </View>
  );
}
