import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  constructor() { }

  estaLogueado: boolean = false
  private esAdministrador: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  esAdministradorObservable: Observable<boolean> = this.esAdministrador.asObservable()

  //Información del usuario logueado
  userData: User = {
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    isAdmin: false
  }

  ngOnInit(): void {
    let usuarios = localStorage.getItem("users")

    if(usuarios != null){
      const arrayUsers: Array<User> = JSON.parse(usuarios).usuariosJson

      this.usuarios = arrayUsers
    }
  }

  //SIMULAMOS BASE DE DATOS
  usuarios: Array<User> = [
    {
      username: "admin",
      nombre: "admin",
      apellido: "admin",
      email: "admin",
      password: "admin",
      isAdmin: true
    },
    {
      username: "admin2",
      nombre: "admin2",
      apellido: "admin2",
      email: "admin2",
      password: "admin2",
      isAdmin: false
    },
    {
      username: "admin3",
      nombre: "admin3",
      apellido: "admin3",
      email: "admin3",
      password: "admin3",
      isAdmin: false
    },
  ] 

  login(nombreDeUsuario: string, contraseña: string): Boolean{
    for (let i = 0; i < this.usuarios.length; i++) {
      if(nombreDeUsuario == this.usuarios[i].email || nombreDeUsuario == this.usuarios[i].username){
        
        if(contraseña == this.usuarios[i].password){
          //LOGIN CORRECTO
          this.userData = this.usuarios[i]

          this.estaLogueado = true
          this.esAdministrador.next(this.userData.isAdmin)

          return true
        }
      }  
    }

    this.userData = {
      username: "",
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      isAdmin: false
    }
    return false
  }

  register(nombreDeUsuario: string, contraseña: string, confirmarContraseña: string){
    if(contraseña != confirmarContraseña){
      console.log("0")
      return false
    }

    let coinciden = false

    this.usuarios.forEach(usuario => {
      if(usuario.username == nombreDeUsuario){
        coinciden = true
      }
    });

    if(coinciden){
      console.log("1")
      return false
    }

    const nuevoUsuario: User = {
      username: nombreDeUsuario,
      nombre: "",
      apellido: "",
      email: "",
      password: contraseña,
      isAdmin: false
    }

    this.usuarios.push(nuevoUsuario)

    const objetoUsuarios = {
      usuariosJson: this.usuarios
    }

    localStorage.setItem("users", JSON.stringify(objetoUsuarios))

    return true
  }

  closeSesion(){
    this.estaLogueado = false
  }
}
