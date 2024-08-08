import * as React from 'react'
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Stack,
    Skeleton
} from '@mui/material'
import { useCharacterComics } from '../marvel'
import CustomTimeline from './CustomTimeline'
import { View, StyleSheet } from 'react-native'

export default function CharacterDetails({ character }: { character: Character | undefined }) {
    if (!character) return null

    const { data: comics, error, isFetching } = useCharacterComics(character.id, 10)
    console.log('comics', comics, error, isFetching)

    return (
        <View style={styles.container}>
            <Box flexGrow={1}>
                <Card
                    style={{ width: '100%' }}
                    sx={{ minWidth: 500, maxWidth: 600 }}
                >
                    <CardMedia
                        sx={{ height: 600, minWidth: 500, maxWidth: 600 }}
                        image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {character.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {character.description}
                        </Typography>
                        <Stack direction="row" spacing={1}>

                            {character.comics.available > 0 &&
                                <Chip
                                    label={`${character.comics.available} Comics`}
                                    color="primary" />}

                            {character.series.available > 0 &&
                                <Chip
                                    label={`${character.series.available} Series`}
                                    color="secondary" />}

                            {character.stories.available > 0 &&
                                <Chip
                                    label={`${character.stories.available} Stories`}
                                    color="error" />}
                        </Stack>
                        {!comics &&
                            <Skeleton variant="rectangular" width="100%" height={250} />
                        }
                        {comics &&
                            <CustomTimeline comics={comics} />
                        }
                    </CardContent>
                </Card>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        overflow: 'scroll',
        //@ts-ignore - Not sure why it doesn't recognize this property, works fine
        overflowX: 'hidden',
    },
})