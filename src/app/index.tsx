import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import { useDebounce } from '../useDebounce'
import { useNavigation } from 'expo-router'
import { useStore } from '../useStore'
import { Box, Button, TablePagination } from '@mui/material'

export default function App() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(12)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const addCharacters = useStore(state => state.updateCharacters)

    const { data: characters, error, isFetching } =
        useCharacters(debouncedSearchQuery, page, rowsPerPage)


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

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }


    return (<>
        <CharactersGrid characters={characters} />

        <Box mt={2}>
            <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[12, 24, 48]}
            />
        </Box>
    </>
    )
}

