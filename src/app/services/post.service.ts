import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  inicio(): void {
    const postsArray = localStorage.getItem("posts")

    if(postsArray != null){
      const arrayPosts: Array<Post> = JSON.parse(postsArray).posts

      this.posts = arrayPosts
    }
  }

  posts: Array<Post> = []

  crearPost(post: Post){
    post.id = this.posts.length.toString()
    
    this.posts.push(post)

    this.guardarPosts()
  }

  obtenerPostPorID(id: String): Post{

    /*
    this.posts.forEach(post => {
      if (post.id == id) {
        return post
      }
    })
    */

    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == id) {
        return this.posts[i]
      }
    }

    return {}
  }

  darLike(id: String, user: User){
    for (let i = 0; i < this.posts.length; i++) {

      if (this.posts[i].id == id) {

        this.posts[i].likes?.push(user)
      }
    }

    this.guardarPosts()
  }

  quitarLike(id: String, user: User){
    for (let i = 0; i < this.posts.length; i++) {

      if (this.posts[i].id == id) {

        const indiceDelAutor = this.posts[i].likes?.indexOf(user)

        this.posts[i].likes?.splice(indiceDelAutor!, 1)
      }
    }

    this.guardarPosts()
  }

  private guardarPosts() {
    const postASubir = {
      posts: this.posts
    }

    localStorage.setItem("posts", JSON.stringify(postASubir))
  }

  añadirComentario(id: string, comentario: string){
    const post = this.obtenerPostPorID(id)

    post.comentarios?.push(comentario)

    this.guardarPosts()
  }
}
