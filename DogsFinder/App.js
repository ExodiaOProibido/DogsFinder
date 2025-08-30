import { useState } from "react";
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, Alert } from "react-native";
import api from "./src/services/api"; // importa o axios configurado

export default function App() {
  const [quantidade, setQuantidade] = useState("1");
  const [imagens, setImagens] = useState([]);

  async function buscarDogs() {
  try {
    // Garantir que quantidade seja um número
    const numQuantidade = parseInt(quantidade);

    // Verificar se o número é válido
    if (!quantidade || isNaN(numQuantidade) || numQuantidade <= 0) {
      Alert.alert("Número inválido", "Digite um valor maior que 0");
      return;
    }

    // Passa o número para a API
    const response = await api.get(`/image/random/${numQuantidade}`);

    setImagens(response.data.message);
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Não foi possível buscar as imagens. Tente novamente!");
  }
}


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🐶 DogsFinder</Text>
      <Text style={styles.label}>Quantas imagens você quer ver?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <Button title="Buscar Imagens" onPress={buscarDogs} />

      <ScrollView contentContainerStyle={styles.scroll}>
        {imagens.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.imagem}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  scroll: {
    marginTop: 20,
    alignItems: "center",
  },
  imagem: {
    width: 300,
    height: 300,
    marginBottom: 15,
    borderRadius: 12,
  },
});
