import { useQuery } from "@tanstack/react-query"
import md5 from "md5"

const publicKey = process.env.EXPO_PUBLIC_MARVEL_PUBLIC_KEY
const privateKey = process.env.EXPO_PUBLIC_MARVEL_PRIVATE_KEY
const apiUrl = process.env.EXPO_PUBLIC_MARVEL_API_URL

const getDefaultParams = () => {
    const timestamp = Date.now()
    if (!publicKey || !privateKey || !apiUrl) {
        throw new Error('Missing environment variables for Marvel API')
    }
    return new URLSearchParams({
        ts: String(timestamp),
        apikey: publicKey,
        hash: md5(timestamp + privateKey + publicKey),
        limit: '12'
    })
}

export const useCharacters = (searchQuery?: string) => useQuery({
    queryKey: ['characters', searchQuery],
    queryFn: async (): Promise<Character[]> => {
        const params = getDefaultParams()

        if (searchQuery) {
            params.append('nameStartsWith', searchQuery)
        }

        const fetchUrl = `${apiUrl}/characters?` + params
        const response = await fetch(fetchUrl)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Error fetching data')
        }

        return data?.data?.results || []
    },
})


export const useCharacter = (id: string) => useQuery({
    queryKey: ['character', id],
    queryFn: async (): Promise<Character> => {
        const params = getDefaultParams()

        const fetchUrl = `${apiUrl}/characters/${id}?` + params
        const response = await fetch(fetchUrl)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Error fetching data')
        }

        return data?.data?.results[0] || {}
    },
})