export interface Movie {
    id: number
    imdb_id: string
    path: string
    last_time_viewed: string
    mimetype: string
    start_year?: number
    aggregate_rating?: number
    primary_title?: string
    image_url?: string
    image_height?: number
    image_width?: number
}

export interface CreatedMovie {
    imdb_id: string
    path: string
    last_time_viewed: string
    mimetype: string
    start_year?: number
    aggregate_rating?: number
    primary_title?: string
    image_url?: string
    image_height?: number
    image_width?: number
}