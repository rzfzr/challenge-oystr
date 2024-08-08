import { StyleSheet, Text, View } from 'react-native'
import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import { useDebounce } from '../useDebounce'
import SkeletonGrid from '../components/SkeletonGrid'

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
            <View style={styles.container}>

                {isFetching &&
                    <SkeletonGrid
                        amount={12}
                    />}

                {!isFetching &&
                    <CharactersGrid
                        characters={characters?.length ? characters : []}
                    />}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        overflow: 'scroll',
        //@ts-ignore - Not sure why it doesn't recognize this property, works fine
        overflowX: 'hidden',
    },
})
