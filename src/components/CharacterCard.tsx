import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Collapse, styled } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { router } from 'expo-router'
import { useStore } from '../useStore'

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

export default function CharacterCard({ character }: { character: Character }) {
    const isFavorite = useStore(state => state.isFavorite(character.id))
    const addFavorite = useStore(state => state.addFavorite)
    const removeFavorite = useStore(state => state.removeFavorite)

    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card
                variant="elevation"
                elevation={5}
                sx={{ minHeight: 425 }}
            >
                <CardMedia
                    sx={{ height: 250 }}
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
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites"
                        color={isFavorite ? 'error' : 'default'}
                        onClick={() => {
                            isFavorite ?
                                removeFavorite(character.id) :
                                addFavorite(character.id)

                        }}>
                        <FavoriteIcon />
                    </IconButton>
                    <Button
                        size="small"
                        onClick={() => router.push(`/character/${character.id}`)}
                    >Details</Button>

                    {character.description !== "" &&
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"

                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    }
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {character.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    )
}
