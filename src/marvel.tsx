import { useSuspenseQuery } from "@tanstack/react-query"
import md5 from "md5"

const publicKey = process.env.EXPO_PUBLIC_MARVEL_PUBLIC_KEY
const privateKey = process.env.EXPO_PUBLIC_MARVEL_PRIVATE_KEY
const apiUrl = process.env.EXPO_PUBLIC_MARVEL_API_URL

export const useCharacters = () => useSuspenseQuery({
    queryKey: ['characters'],
    queryFn: async () => {
        const timestamp = Date.now()
        if (!publicKey || !privateKey || !apiUrl) {
            throw new Error('Missing environment variables for Marvel API')
        }
        const params = new URLSearchParams({
            ts: String(timestamp),
            apikey: publicKey,
            hash: md5(timestamp + privateKey + publicKey),
            limit: '10'
        })

        const fetchUrl = `${apiUrl}/characters?` + params
        const response = await fetch(fetchUrl)
        const data = await response.json()

        return data?.data?.results
    },
})
