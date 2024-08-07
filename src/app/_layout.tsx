import { Slot } from 'expo-router'
import { Text } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from '../ErrorBoundary'
import { Suspense } from 'react'

export default function AppLayout() {
    return (
        <ErrorBoundary fallback={<Text>Something went wrong</Text>}>
            <Suspense fallback={<Text>Loading...</Text>}>
                <QueryClientProvider client={new QueryClient()}>
                    <Slot />
                </QueryClientProvider >
            </Suspense>
        </ErrorBoundary>
    )
}