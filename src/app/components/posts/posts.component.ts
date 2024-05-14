import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../interfaces/post';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{

  constructor(
    private service: PostService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ){}

  formularioRegistroPost: FormGroup = new FormGroup({
    img: new FormControl("")
  })

  posts: Array<Post> = []

  mostrarFormulario = false

  mostrarBoton = false

  ngOnInit(): void {
    
    if(!this.userService.estaLogueado){
      this.router.navigate([""])
    }

    this.service.inicio()

    this.posts = this.service.posts

    this.formularioRegistroPost = this.formBuilder.group({
      img: ["", [Validators.required, Validators.minLength(10)]]
    })

    this.userService.esAdministradorObservable.subscribe(
      nuevoValor => {
        this.mostrarBoton = nuevoValor
      }
    )
  }

  mostrar(){
    this.mostrarFormulario = true
  }

  ocultar(){
    this.mostrarFormulario = false
  }

  subirPost(){
    const nuevoPost: Post = {
      img:this.formularioRegistroPost.get("img")?.value,
      comentarios:[],
      likes:[],
      fecha: new Date(),
      autor: this.userService.userData
    }

    this.service.crearPost(nuevoPost)

    this.ocultar()
  }
}
