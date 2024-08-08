import { StyleSheet, View } from 'react-native'
import { useCharacters } from '../marvel'
import CharactersGrid from '../components/CharactersGrid'
import SearchBar from '../components/SearchBar'

export default function App() {
    const { data, error, isFetching } = useCharacters()
    console.log('data', data, error, isFetching)
    if (error && !isFetching) {
        throw error
    }
    return (
        <>
            <SearchBar />
            <View style={styles.container}>
                <CharactersGrid characters={data} />
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
