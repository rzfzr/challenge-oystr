import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface State {
    characterMap: { [key: string]: Character },
    updateCharacters: (characters: Character[]) => void,
    getCharacter: (id: string) => Character | undefined,
    favorites: number[],
    addFavorite: (id: number) => void,
    removeFavorite: (id: number) => void,
    isFavorite: (id: number) => boolean
}

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                characterMap: {},
                updateCharacters(characters) {
                    set((state) => {
                        const newCharacters = characters.reduce((acc, character) => {
                            return {
                                ...acc,
                                [character.id]: character
                            }
                        }, {})
                        return {
                            characterMap: {
                                ...state.characterMap,
                                ...newCharacters
                            }
                        }
                    })
                },
                getCharacter(id) {
                    return this.characterMap[id]
                },
                favorites: [],
                addFavorite(id) {
                    set((state) => {
                        return {
                            favorites: [...state.favorites, id]
                        }
                    })
                },
                removeFavorite(id) {
                    set((state) => {
                        return {
                            favorites: state.favorites.filter(favorite => favorite !== id)
                        }
                    })
                },
                isFavorite(id) {
                    return this.favorites.includes(id)
                }
            }),
            {
                name: 'marveldex',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)