import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import { useDebounce } from '../useDebounce'
import { useNavigation } from 'expo-router'
import { useStore } from '../useStore'
import { Box, Button } from '@mui/material'

export default function App() {
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const addCharacters = useStore(state => state.updateCharacters)

    const { data: characters, error, isFetching } = useCharacters(debouncedSearchQuery, page)
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

    const handleNextPage = () => setPage(prevPage => prevPage + 1)
    const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))

    return (<>
        <CharactersGrid characters={characters} />

        <Box mt={2}>
            <Button onClick={handlePreviousPage} disabled={page === 1}>Previous</Button>
            <Button onClick={handleNextPage}>Next</Button>
        </Box>
    </>
    )
}

