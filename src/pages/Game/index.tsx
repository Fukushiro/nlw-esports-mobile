import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";
export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>("");
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;
  function handleGoBack() {
    navigation.goBack();
  }

  function handleClose() {
    setDiscordDuoSelected("");
  }
  async function getDiscordUser(adsId: string) {
    const response = await fetch(
      `http://192.168.38.1:3333/ads/${adsId}/discord`
    );
    const data = await response.json();
    console.log(data);
    setDiscordDuoSelected(data.discord);
  }
  useEffect(() => {
    async function action() {
      const response = await fetch(
        `http://192.168.38.1:3333/games/${game.id}/ads`
      );
      const data = await response.json();
      console.log(data);

      setDuos(data);
    }

    action();
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />
        <FlatList
          horizontal
          contentContainerStyle={[
            duos.length === 0 ? styles.emptyListContent : styles.contentList,
            ,
          ]}
          style={styles.containerList}
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => getDiscordUser(item.id)} data={item} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda
            </Text>
          )}
        />

        <DuoMatch
          onClose={handleClose}
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
        />
      </SafeAreaView>
    </Background>
  );
}
