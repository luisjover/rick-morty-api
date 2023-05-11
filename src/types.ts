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

type episode = {
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

type location = {
    name: string,
    url: String,
}

