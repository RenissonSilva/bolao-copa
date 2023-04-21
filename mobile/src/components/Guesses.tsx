import { Box, useToast, FlatList } from 'native-base';
import { useState, useEffect } from "react";

import { api } from "../services/api";

import { Game, GameProps } from '../components/Game'

interface Props {
  pollId: string;
}

export function Guesses({ pollId }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const [games, setGames] = useState<GameProps[]>([])

  const toast = useToast();

  async function fetchGames(){
    try {
      setIsLoading(true);
      const response = await api.get(`/polls/${pollId}/games`)
      setGames(response.data.games)
    } catch (error) {
      console.log(error);  

      toast.show({
          title: 'Não foi possível carregar os jogos',
          placement: 'top',
          bgColor: 'red.500'
      })
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [pollId])

  return (
    <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => {}}
        />
      )}
    />
  );
}
