export type Character = {
    id: number,
    name: string,
    status: CharacterStatus,
    species: string,
    type: string,
    gender: CharacterGender,
    origin: CharacterLocation,
    location: CharacterLocation,
    image: string,
    episode: string[],
    url: string,
    created: string,
}

export type FullLocation = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string
}

export type Episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
}

export type AllEpisodes = {
    info: Information,
    results: Episode[]
}


type CharacterLocation = {
    name: string,
    url: string,
}



type Information = {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null
}

enum CharacterStatus {
    "Alive",
    "Dead",
    "unknown"
}

enum CharacterGender {
    "Female",
    "Male",
    "Genderless",
    "unknown"
}