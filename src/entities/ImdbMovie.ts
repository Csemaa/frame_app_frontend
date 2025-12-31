export interface ImdbMovie {
    id: string
    type: string
    primaryTitle?: string
    originalTitle: string
    primaryImage: ImdbPrimaryImage
    startYear: number
    rating?: ImdbRating
}

export interface ImdbPrimaryImage {
    url: string
    height: number
    width: number
}

export interface ImdbRating {
    aggregateRating: number
    voteCount: number
}