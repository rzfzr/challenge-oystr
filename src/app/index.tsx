import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import { useDebounce } from '../useDebounce'
import { useNavigation } from 'expo-router'
import { useStore } from '../useStore'
import { Box, Button, TablePagination } from '@mui/material'
import CustomPagination from '../components/CustomPagination'

export default function App() {

    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(12)

    const { data: characters, error, isFetching } =
        useCharacters(debouncedSearchQuery, page, rowsPerPage)

    if (error && !isFetching) {
        throw error
    }

    const addCharacters = useStore(state => state.updateCharacters)
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

    return (<>
        <CharactersGrid characters={characters} />
        <CustomPagination
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage} />
    </>
    )
}

