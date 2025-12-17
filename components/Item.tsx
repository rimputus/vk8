import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ShoppingItem } from "../types/ShoppingItem";

interface Props {
  item: ShoppingItem;
  onDelete: (id: string) => void;
}

export default function Item({ item, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Button title="poista" onPress={() => onDelete(item.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
  },
});
