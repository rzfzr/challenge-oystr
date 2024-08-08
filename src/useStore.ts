import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface State {
    characterMap: { [key: string]: Character },
    updateCharacters: (characters: Character[]) => void,
    getCharacter: (id: string) => Character | undefined,
}

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                characterMap: {},
                updateCharacters(characters) {
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
                getCharacter(id) {
                    return this.characterMap[id]
                },
            }),
            {
                name: 'marveldex',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)