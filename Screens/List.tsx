import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/Config";
import Item from "../components/Item";
import { ShoppingItem } from "../types/ShoppingItem";

export default function List() {
  const [text, setText] = useState("");
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const itemsRef = collection(firestore, "shoppingItems");

  const fetchItems = async () => {
    const snapshot = await getDocs(itemsRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await addDoc(itemsRef, { name: text });
    setText("");
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(firestore, "shoppingItems", id));
    fetchItems();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kauppalista</Text>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <Button title="Lisää tuote" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item item={item} onDelete={deleteItem} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
