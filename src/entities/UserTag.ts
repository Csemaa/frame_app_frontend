export interface UserTag {
    id: number
    tag: 'watch_later' | 'favourite'
    user_id: number
    movie_id: number
}

export interface CreatedUserTag {
    tag: 'watch_later' | 'favourite'
    user_id: number
    movie_id: number
}