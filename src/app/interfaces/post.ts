import { User } from "./user";

//TODO: COMPARTIR
//TODO: INTERNACIONALIZACIÓN
//TODO: FAVORITOS

export interface Post {
    id?: String,
    img?: String,
    comentarios?: Array<string>,
    likes?: Array<User>,
    fecha?: Date,
    autor?: User,
}
