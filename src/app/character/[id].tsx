import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { useCharacter } from '../../marvel'
import CharacterDetails from '../../components/CharacterDetails'
import { useStore } from '../../useStore'

export default function Character() {
    const { id } = useLocalSearchParams()
    const { data, error, isFetching } = useCharacter(id.toString())

    const character = useStore(state => state.getCharacter(id.toString()))
    const updateCharacters = useStore(state => state.updateCharacters)

    if (data) {
        updateCharacters([data])
    }

    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({ title: character?.name ? character.name + ' details' : 'Loading' })
    }, [navigation, character?.name])

    console.log('map', character)
    console.log('data single', character, error, isFetching)

    return ((character || data) &&
        <CharacterDetails character={character || data} />)
}
