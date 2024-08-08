import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Box, Grid } from '@mui/material'
import CharacterCard from './CharacterCard'
import SkeletonGrid from './SkeletonGrid'


export default function CharactersGrid({ characters }: { characters: Character[] | undefined }) {

    if (!characters) return <SkeletonGrid amount={12} />

    return (
        <View style={styles.container}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                >
                    {characters.map((character, index) => (
                        <Grid
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={index}>
                            <CharacterCard character={character} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        overflow: 'scroll',
        //@ts-ignore - Not sure why it doesn't recognize this property, works fine
        overflowX: 'hidden',
    },
})