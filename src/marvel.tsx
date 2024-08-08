import { useQuery } from "@tanstack/react-query"
import md5 from "md5"

const publicKey = process.env.EXPO_PUBLIC_MARVEL_PUBLIC_KEY
const privateKey = process.env.EXPO_PUBLIC_MARVEL_PRIVATE_KEY
const apiUrl = process.env.EXPO_PUBLIC_MARVEL_API_URL

export const useCharacters = (searchQuery?: string) => useQuery({
    queryKey: ['characters', searchQuery],
    queryFn: async (): Promise<Character[]> => {
        const timestamp = Date.now()
        if (!publicKey || !privateKey || !apiUrl) {
            throw new Error('Missing environment variables for Marvel API')
        }
        const params = new URLSearchParams({
            ts: String(timestamp),
            apikey: publicKey,
            hash: md5(timestamp + privateKey + publicKey),
            limit: '12'
        })

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