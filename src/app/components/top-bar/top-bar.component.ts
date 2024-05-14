import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'topbar',
    standalone: true,
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.css',
    imports: [LoginComponent, RouterLink]
})
export class TopBarComponent {

  constructor(
    private service: UserService
  ){}

  textoDeBoton:string = "Iniciar sesión"

  formularioAbierto:boolean = false

  cambiarFormulario(sehaLogueado:boolean = false){
    this.textoDeBoton = "Iniciar sesión"

    this.formularioAbierto = !this.formularioAbierto

    if(sehaLogueado){
      this.textoDeBoton = "Cerrar sesión " + this.service.userData.username
    }else{
      this.service.closeSesion()
    }
  }

  /*
  cambiarIdsPosts(){
    const postsOriginales = JSON.parse(localStorage.getItem("posts")!).posts

    let postsNuevos = postsOriginales

    for (let i = 0; i < postsOriginales.length; i++) {
      postsNuevos[i].id = i
    }

    const json = {
      posts: postsNuevos
    }

    localStorage.setItem("posts", JSON.stringify(json))
  }*/
}
