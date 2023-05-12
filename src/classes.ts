import { episode, location } from "./types"

export class Character {

    public id: number;
    public name: string;
    public status: string;
    public species: string;
    public type?: string;
    public gender: string;
    public origin: location;
    public location: location;
    public image: string;
    public episode: string[];
    public created: string

    constructor(id: number, name: string, status: string, species: string, type: string, gender: string, origin: location, location: location, image: string, episode: string[], created: string) {

        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.image = image;
        this.episode = episode;
        this.created = created;

    }
}


