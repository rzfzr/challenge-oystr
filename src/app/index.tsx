import { View } from 'react-native'
import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import { useDebounce } from '../useDebounce'

export default function App() {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const { data: characters, error, isFetching } = useCharacters(debouncedSearchQuery)

    if (error && !isFetching) {
        throw error
    }

    console.log('data', characters, error, isFetching)

    return (
        <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CharactersGrid characters={characters} />
        </>
    )
}

