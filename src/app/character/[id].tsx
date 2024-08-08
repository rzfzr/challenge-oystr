import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { useCharacter } from '../../marvel'
import CharacterDetails from '../../components/CharacterDetails'
import { useStore } from '../../useStore'
import { IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

export default function Character() {
    const { id } = useLocalSearchParams()
    const { data, error, isFetching } = useCharacter(id.toString())

    const character = useStore(state => state.getCharacter(id.toString()))
    const updateCharacters = useStore(state => state.updateCharacters)

    useEffect(() => {
        if (data) {
            if (character?.modified !== data.modified) {
                updateCharacters([data])
            }
        }
    }, [data, character, updateCharacters])

    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: character?.name ? character.name + ' details' : 'Loading',
            headerLeft: () => (<IconButton onClick={() => {
                router.canGoBack() ? router.back() : router.replace('/')
            }}> <ArrowBack />
            </IconButton>)
        })
    }, [navigation, character?.name])

    console.log('map', character)
    console.log('data single', character, error, isFetching)

    return ((character || data) &&
        <CharacterDetails character={character || data} />)
}
