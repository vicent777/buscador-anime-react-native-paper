import { TouchableOpacity, Image, Text, View, StyleSheet, Animated } from "react-native";
import { useRef } from "react";
import { Anime } from "../types/Anime";

export default function AnimeCard({
  anime,
  onPress,
}: {
  anime: Anime;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start(onPress);
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card} 
        onPress={onPress}
        activeOpacity={0.85}   // efeito de toque
        delayPressIn={150}
      >
        <Image
          source={{ uri: anime.images.jpg.image_url }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.title}>{anime.title}</Text>

          {/* BADGE DE TIPO */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{anime.type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    marginBottom: 14,
    borderRadius: 12,
    padding: 10,
    gap: 12,

    // sombra suave premium
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // borda glow leve
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  image: {
    width: 95,
    aspectRatio: 0.70, // perfeito pra poster
    borderRadius: 10,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 8,
  },

  // badge tipo Crunchyroll dark
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#941a1aff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },

  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
});
