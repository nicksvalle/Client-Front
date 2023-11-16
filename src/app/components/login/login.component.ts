import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroupLogin : FormGroup;
  submitted: boolean = false;
  hidePassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService : AuthService, private router: Router, private messageService: MessageService){
    this.formGroupLogin = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get email(): any {
    return this.formGroupLogin.get('email');
  }

  get password(): any {
    return this.formGroupLogin.get('password');
  }

  loginUser(){
    const { email, password } = this.formGroupLogin.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password){
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/header']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Email ou Senha estão incorretos' });
        }
      },
      error => {
        console.error('Error during registration:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Alguma coisa está errada' });
      }
    )
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
