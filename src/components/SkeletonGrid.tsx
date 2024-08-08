import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import CharacterCard from './CharacterCard'
import SkeletonCard from './SkeletonCard'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

export default function SkeletonGrid({ amount }: { amount: number }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
            >
                {Array.from(Array(amount)).map((_, index) => (

                    <Grid
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={index}>
                        <SkeletonCard />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
