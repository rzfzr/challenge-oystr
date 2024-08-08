import * as React from 'react'
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Stack
} from '@mui/material'

export default function CharacterDetails({ character }: { character: Character | undefined }) {
    if (!character) return null
    return (
        <Box flexGrow={1}>
            <Card
                variant="outlined"
                sx={{ flexGrow: 1 }}
            >
                <CardMedia
                    sx={{ height: 600 }}
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
                </CardContent>

            </Card>
        </Box>
    )
}
