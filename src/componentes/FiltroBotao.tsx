import { Chip } from "react-native-paper";

type Props = {
  type: string;
  active: boolean;
  onPress: () => void;
};

export default function FiltroBotao({ type, active, onPress }: Props) {
  return (
    <Chip
      selected={active}
      onPress={onPress}
      style={{
        backgroundColor: active ? "#333" : "#222",
        marginRight: 8,
        marginBottom: 8,
      }}
      textStyle={{ color: "white" }}
    >
      {type}
    </Chip>
  );
}
