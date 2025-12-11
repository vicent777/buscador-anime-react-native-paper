import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import useBuscador from "../hooks/useBuscador";
import AnimeCard from "../componentes/AnimeCard";
import FiltroBotao from "../componentes/FiltroBotao";

type AnimeDetalhes = {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  type: string;
  episodes: number;
  score: number;
  synopsis: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetalhes | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const {
    loading,
    filteredResults,
    types,
    activeFilters,
    toggleFilter,
    searchAnime,
  } = useBuscador();

  const openDetails = async (mal_id: number) => {
    setLoadingDetails(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
      const data = await res.json();
      setSelectedAnime(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Animes</Text>

      {/* INPUT GRANDE + BOTÃO ABAIXO */}
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Digite o nome do anime..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchAnime(query)}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* FILTROS */}
      <View style={styles.filters}>
        {types.map((t) => (
          <FiltroBotao
            key={t}
            type={t}
            active={activeFilters.includes(t)}
            onPress={() => toggleFilter(t)}
          />
        ))}
      </View>

      {/* RESULTADOS */}
      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.mal_id.toString()}
          renderItem={({ item }) => (
            <AnimeCard anime={item} onPress={() => openDetails(item.mal_id)} />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}

      {/* MODAL DETALHES */}
      <Modal visible={!!selectedAnime} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            {loadingDetails ? (
              <ActivityIndicator size="large" color="#941a1a" />
            ) : selectedAnime ? (
              <ScrollView>
                <Image
                  source={{ uri: selectedAnime.images.jpg.image_url }}
                  style={styles.modalImg}
                  resizeMode="cover"
                />
                <Text style={styles.modalTitle}>{selectedAnime.title}</Text>
                <Text style={styles.modalType}>Tipo: {selectedAnime.type}</Text>
                <Text style={styles.modalEpisodes}>Episódios: {selectedAnime.episodes}</Text>
                <Text style={styles.modalScore}>Nota: {selectedAnime.score}</Text>
                <Text style={styles.modalSynopsis}>{selectedAnime.synopsis}</Text>

                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelectedAnime(null)}
                >
                  <Text style={{ color: "white" }}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16 },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    width: "100%",
    marginBottom: 20,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#fffcfcff",
    padding: 14,
    borderRadius: 10,
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#941a1aff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  loading: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalBox: {
    backgroundColor: "#222",
    borderRadius: 12,
    width: "100%",
    maxHeight: "90%",
    padding: 16,
  },
  modalImg: { width: "100%", aspectRatio: 0.7, borderRadius: 12, marginBottom: 12 },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 6 },
  modalType: { color: "#BBB", fontSize: 16, marginBottom: 4 },
  modalEpisodes: { color: "#BBB", fontSize: 16, marginBottom: 4 },
  modalScore: { color: "#BBB", fontSize: 16, marginBottom: 12 },
  modalSynopsis: { color: "white", fontSize: 16, lineHeight: 22 },
  closeBtn: {
    backgroundColor: "#444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
});
