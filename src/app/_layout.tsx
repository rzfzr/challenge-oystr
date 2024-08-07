import { Slot } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function AppLayout() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Slot />
        </QueryClientProvider >
    )
}