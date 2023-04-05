import { FileHandle } from "./file-handle"

export interface Buisness {
    buisnessImages: FileHandle[];
    buisnessName: string;
    buisnessAddress: string;
    buisnessDescription: string;
    username: string;
    buisnessImageNames: string[], 
    buisnessTags: string[];
}
