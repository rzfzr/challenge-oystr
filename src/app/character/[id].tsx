import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function Character() {
    const { id } = useLocalSearchParams()

    return (
        <View>
            <Text> This is a character page for id: {id}</Text>
        </View>
    )
}
