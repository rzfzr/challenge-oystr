import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function CharacterCard({ character }: { character: Character }) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">

                <CardMedia
                    sx={{ height: 140 }}
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    title="green iguana"
                />

                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Secondary Text Above
                    </Typography>
                    <Typography variant="h5" component="div">
                        {character.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Secondary Text Below
                    </Typography>
                    <Typography variant="body2">
                        {character.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <Button size="small">Details</Button>
                </CardActions>
            </Card>
        </Box>
    )
}
