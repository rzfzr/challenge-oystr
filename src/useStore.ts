import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface State {
    characterMap: { [key: string]: Character },
    addCharacters: (characters: Character[]) => void
}

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                characterMap: {},
                addCharacters(characters) {
                    set((state) => {
                        console.log('adding characters', characters)
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
            }),
            {
                name: 'marveldex',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)