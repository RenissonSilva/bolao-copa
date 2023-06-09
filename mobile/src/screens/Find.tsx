import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');

    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPoll() {
        try {
            setIsLoading(true)

            if(!code.trim()) {
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post('/polls/join', { code });

            toast.show({
                title: 'Você entrou no bolão com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

            navigate('polls')


        } catch (error) {
            console.log(error);
            setIsLoading(false);

            let errorMessage = 'Não foi possível encontrar o bolão';

            if(error.response?.data?.message === 'Poll not found') {
                errorMessage = 'Bolão não encontrado'
            } else if(error.response?.data?.message === 'You already joined this poll') {
                errorMessage = 'Você já está nesse bolão'
            }

            toast.show({
                title: errorMessage,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por um código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de {'\n'}
                    seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />

                <Button 
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPoll}
                />
            </VStack>
        </VStack>
    )
}