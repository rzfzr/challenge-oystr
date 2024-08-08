import * as React from 'react'
import {
    Box,
    Card,
    CardMedia,
    Skeleton,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Stack
} from '@mui/material'

export default function SkeletonCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card
                variant="outlined"
                sx={{ minHeight: 425 }}
            >
                <CardMedia
                    sx={{ height: 250 }}
                    title="green iguana"
                >
                    <Skeleton variant="rectangular" width="100%" height={250} />
                </CardMedia>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {/* {character.name} */}
                        <Skeleton variant="text" />
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Skeleton variant="text" width={50} />
                        <Skeleton variant="text" width={50} />
                        <Skeleton variant="text" width={50} />
                    </Stack>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" disabled>
                        <Skeleton variant="text" width={25} />
                    </IconButton>
                    <Skeleton variant="text" width={75} />
                </CardActions>
            </Card>
        </Box>
    )
}
