export interface ImdbMovie {
    id: string
    type: string
    primaryTitle?: string
    originalTitle: string
    primaryImage: ImdbPrimaryImage
    startYear: number
    rating?: ImdbRating
}

interface ImdbPrimaryImage {
    url: string
    height: number
    width: number
}

interface ImdbRating {
    aggregateRating: number
    voteCount: number
}

export interface FullImdbMovie extends ImdbMovie {
    plot: string
    directors: Director[]
    writers: Writer[]
    stars: Star[]
    originCountries: Country[]
    spokenLanguages: SpokenLanguage[]
    interests: Genre[]
}


interface Director {
    id: string
    displayName: string
    primaryImage: ImdbPrimaryImage
    primaryProfessions: string[]
}

interface Writer {
    id: string
    displayName: string
    primaryImage: ImdbPrimaryImage
    primaryProfessions: string[]
}

interface Star {
    id: string
    displayName: string
    primaryImage: ImdbPrimaryImage
    primaryProfessions: string[]
}

interface Country {
    code: string
    name: string
}

interface SpokenLanguage {
    code: string
    name: string
}

interface Genre {
    id: string
    name: string
    isSubGenre?: boolean | null
}