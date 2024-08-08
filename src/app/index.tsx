import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import { useDebounce } from '../useDebounce'
import { useNavigation } from 'expo-router'
import { useStore } from '../useStore'

export default function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const addCharacters = useStore(state => state.addCharacters)

    const { data: characters, error, isFetching } = useCharacters(debouncedSearchQuery)
    console.log('data', characters, error, isFetching)

    if (error && !isFetching) {
        throw error
    }

    if (characters) {
        addCharacters(characters)
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

