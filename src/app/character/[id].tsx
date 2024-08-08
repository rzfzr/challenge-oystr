import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { useCharacter } from '../../marvel'
import CharacterDetails from '../../components/CharacterDetails'

export default function Character() {
    const { id } = useLocalSearchParams()
    const { data: character, error, isFetching } = useCharacter(id.toString())

    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({ title: character?.name ? character.name + ' details' : 'Loading' })
    }, [navigation, character?.name])

    console.log('data single', character, error, isFetching)

    return (character && <CharacterDetails character={character} />)
}
