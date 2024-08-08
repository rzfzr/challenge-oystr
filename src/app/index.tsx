import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import { useDebounce } from '../useDebounce'
import { useNavigation } from 'expo-router'
import { useStore } from '../useStore'
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
    useEffect(() => {
        if (characters) {
            addCharacters(characters)
        }
    }, [characters, addCharacters])

    const navigation = useNavigation()
    const favorites = useStore(state => state.favorites)

    const searchBar = <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favorites={favorites.length} />

    useEffect(() => {
        setPage(0)
    }, [debouncedSearchQuery])

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

