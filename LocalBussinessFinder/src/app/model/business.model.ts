import { FileHandle } from "./file-handle"

export interface Buisness {
    buisnessImages: FileHandle[];
    buisnessImageNames : string[]
    buisnessName: string;
    buisnessAddress: string;
    buisnessDescription: string;
    username: string;
}