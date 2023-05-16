
import { Character, Episodes, Episode, FullLocation } from "./types"


export async function getEpisodes(url: string = "https://rickandmortyapi.com/api/episode", filter: string = ""): Promise<Episodes> {
    const response = await fetch(`${url}${filter}`)
    const data: Episodes = await response.json()
    return data;
}


export async function getSingleEpisode(url: string = "https://rickandmortyapi.com/api/episode/", filter: string = ""): Promise<Episode> {
    const response = await fetch(`${url}${filter}`)
    const data: Episode = await response.json()
    return data;
}


export async function getCharacter(url: string = "https://rickandmortyapi.com/api/character/", filter: string = ""): Promise<Character> {
    const response = await fetch(`${url}${filter}`)
    const data = await response.json()
    return data;
}


export async function getLocation(url: string = ""): Promise<FullLocation> {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}