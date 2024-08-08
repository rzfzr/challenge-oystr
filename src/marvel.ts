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
    })
}

export const useCharacters = (searchQuery?: string, page: number = 1, limit: number = 12) => useQuery({
    queryKey: ['characters', searchQuery, page, limit],
    queryFn: async (): Promise<Character[]> => {
        const params = getDefaultParams()
        params.append('limit', String(limit))
        params.append('offset', String((page) * limit))

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

export const useCharacterComics = (id: number, limit: number) => useQuery({
    queryKey: ['characterComics', id],
    queryFn: async (): Promise<any[]> => {
        const params = getDefaultParams()
        params.append('limit', String(limit))

        const fetchUrl = `${apiUrl}/characters/${id}/comics?` + params
        const response = await fetch(fetchUrl)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Error fetching data')
        }

        return data?.data?.results || []
    },
})