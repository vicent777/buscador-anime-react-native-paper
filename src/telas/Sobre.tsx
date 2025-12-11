import React from "react";
import { View, StyleSheet, Linking, ScrollView } from "react-native";
import { Card, Text, Button, Title, Paragraph } from "react-native-paper";

export default function Sobre() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Buscador de Animes</Title>
          <Paragraph style={styles.paragraph}>
            O Buscador de Animes é um aplicativo prático para explorar animes de forma rápida e divertida. 
            Permite pesquisar títulos, filtrar por tipo e conferir informações detalhadas sobre cada anime, tudo em uma interface moderna e intuitiva.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Funcionalidades</Title>
          <Paragraph style={styles.paragraph}>
            • Pesquisar animes por nome{"\n"}
            • Filtrar por tipo e gênero{"\n"}
            • Visualizar detalhes e sinopse de cada anime{"\n"}
            • Interface responsiva com design moderno{"\n"}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Desenvolvedor</Title>
          <Paragraph style={styles.paragraph}>
            Criado por Vinicius Nascimento como projeto de estudo em React Native.
          </Paragraph>
          <Button 
            mode="contained" 
            onPress={() => Linking.openURL("https://github.com/vicent777")}
            style={styles.button}
          >
            GitHub do Desenvolvedor
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // seguindo a Home
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#222", // escuro como modal da Home
  },
  title: {
    color: "#fff", // título branco
  },
  paragraph: {
    marginTop: 8,
    lineHeight: 20,
    color: "#ccc", // texto claro
  },
  button: {
    marginTop: 12,
    backgroundColor: "#941a1a", // vermelho do botão Home
  },
});
