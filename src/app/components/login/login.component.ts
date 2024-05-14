import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showingRegisterForm: Boolean = false

  @Output() usuarioLogueado: EventEmitter<void> = new EventEmitter<void>();
  @Output() cerrarFormulario: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private servicio: UserService
  ){}

  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      usuario: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]],
      contraseña: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(14)
      ]]
    })

    this.formularioRegistro = this.formBuilder.group({
      usuario: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]],
      contraseña: ["", [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(14)
      ]],
      confirmarContraseña: ["",
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(14)
        ]
      ]
    })
  }

  formularioLogin:FormGroup = new FormGroup({
    usuario: new FormControl(""),
    contraseña: new FormControl("")
  })

  formularioRegistro:FormGroup = new FormGroup({
    usuario: new FormControl(""),
    contraseña: new FormControl(""),
    confirmarContraseña: new FormControl("")
  })

  login(){
    let loginCorrecto = this.servicio.login(this.formularioLogin.get("usuario")?.value, 
    this.formularioLogin.get("contraseña")?.value)

    if(loginCorrecto){
      this.usuarioLogueado.emit();

      this.router.navigate(["/posts"])
    }

    this.formularioLogin.get("usuario")?.setValue("")
    this.formularioLogin.get("contraseña")?.setValue("")
  }

  registro(){
    const nombreDeUsuario = this.formularioRegistro.get("usuario")?.value
    const contraseña = this.formularioRegistro.get("contraseña")?.value
    const confirmarContraseña = this.formularioRegistro.get("confirmarContraseña")?.value

    const registroConExito = this.servicio.register(nombreDeUsuario, contraseña,confirmarContraseña)

    if(!registroConExito){
      alert("Las contraseñas no coinciden o ya existe el usuario")
    }else{
      this.formularioLogin.get("usuario")?.setValue(nombreDeUsuario)
      this.formularioLogin.get("contraseña")?.setValue(contraseña)

      this.login()

      console.log("Se ha registrado el usuario correctamente")
    }

    this.formularioRegistro.get("usuario")?.setValue("")
    this.formularioRegistro.get("contraseña")?.setValue("")
    this.formularioRegistro.get("confirmarContraseña")?.setValue("")
  }

  toggleForm(){
    this.showingRegisterForm = !this.showingRegisterForm
  }

  cerrarForm(){
    this.cerrarFormulario.emit();
  }
}
