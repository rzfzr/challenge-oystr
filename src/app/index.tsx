import { StyleSheet, Text, View } from 'react-native'
import { useCharacters } from '../marvel'

export default function App() {

    const { data, error, isFetching } = useCharacters()
    if (error && !isFetching) {
        throw error
    }

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
