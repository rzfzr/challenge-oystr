import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface State {
    characters: Character[]
}

export const useStore = create<State>()(
    devtools(
        persist(
            set => ({
                characters: [],
                setCharacters: (characters: Character[]) => set({ characters }),
            }),
            {
                name: 'marveldex',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)