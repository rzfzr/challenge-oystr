import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import SkeletonCard from './SkeletonCard'

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
