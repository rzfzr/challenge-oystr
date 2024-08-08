import { Slot } from 'expo-router'
import { Text } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from '../ErrorBoundary'

export default function AppLayout() {
    return (
        <ErrorBoundary fallback={<Text>Something went wrong</Text>}>
            <QueryClientProvider client={new QueryClient()}>
                <Slot />
            </QueryClientProvider >
        </ErrorBoundary>
    )
}