import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useCharacter } from '../../marvel'
import CharacterCard from '../../components/CharacterCard'

export default function Character() {
    const { id } = useLocalSearchParams()
    const { data: character, error, isFetching } = useCharacter(id.toString())

    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({ title: character?.name ? character.name + ' details' : 'Loading' })
    }, [navigation, character?.name])

    console.log('data single', character, error, isFetching)

    return (
        <View>
            {character && <CharacterCard character={character} />}
        </View>
    )
}
