import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export default function CharacterDetails({ character }: { character: Character }) {
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
