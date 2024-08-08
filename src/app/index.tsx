import { View } from 'react-native'
import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import { useDebounce } from '../useDebounce'
import { useNavigation } from 'expo-router'

export default function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const { data: characters, error, isFetching } = useCharacters(debouncedSearchQuery)
    console.log('data', characters, error, isFetching)

    if (error && !isFetching) {
        throw error
    }

    const navigation = useNavigation()
    const searchBar = <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    useEffect(() => {
        navigation.setOptions({
            title: 'Marveldex',
            headerRight: () => searchBar
        })
    }, [navigation, searchBar])


    return (
        <CharactersGrid characters={characters} />
    )
}

