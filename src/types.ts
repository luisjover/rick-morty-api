export type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: location,
    location: location,
    image: string,
    episode: string[],
    url: string,
    created: string,
}


export type episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
}

export type location = {
    name: string,
    url: String,
}