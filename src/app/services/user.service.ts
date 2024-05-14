import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor() {
    this.iniciar()
  }

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

  //SIMULAMOS BASE DE DATOS
  usuarios: Array<User> = []

  iniciar(): void {
    let usuarios = localStorage.getItem("users")

    if(usuarios != null){
      const arrayUsers: Array<User> = JSON.parse(usuarios).usuariosJson
      this.usuarios = arrayUsers
    }
  }

  login(nombreDeUsuario: string, contraseña: string): Boolean{    
    for (let i = 0; i < this.usuarios.length; i++) {
      if(nombreDeUsuario == this.usuarios[i].email || nombreDeUsuario == this.usuarios[i].username){
        
        if(contraseña == this.usuarios[i].password){
          //LOGIN CORRECTO
          this.userData = this.usuarios[i]

          this.estaLogueado = true
          this.esAdministrador.next(this.userData.isAdmin!)

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

  getByMail(email:string): User{
    for (let i = 0; i < this.usuarios.length; i++) {
      
      console.log(email)
      console.log("2:" + this.usuarios[i].email)
      
      if (this.usuarios[i].email == email) {
        return this.usuarios[i]
      }
    }

    return {}
  }
}
