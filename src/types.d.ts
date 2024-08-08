export declare global {

    type Character = {
        id: number
        name: string
        description: string
        modified: string
        resourceURI: string
        thumbnail: {
            path: string
            extension: string
        }
        urls: {
            type: 'wiki' | 'detail' | 'comiclink'
            url: string
        }[]
        comics: {
            available: number
            collectionURI: string
            items: {
                resourceURI: string
                name: string
            }[]
            returned: number
        }
        series: {
            available: number
            collectionURI: string
            items: {
                resourceURI: string
                name: string
            }[]
            returned: number
        }
        stories: {
            available: number
            collectionURI: string
            items: {
                resourceURI: string
                name: string
                type: string
            }[]
            returned: number
        }
    }

    type Comic = {
        id: number
        title: string
        description: string
        modified: string
        resourceURI: string
        thumbnail: {
            path: string
            extension: string
        },
        dates: {
            type: string,
            date: string
        }[]
        series: {
            resourceURI: string
            name: string
        }
    }
}