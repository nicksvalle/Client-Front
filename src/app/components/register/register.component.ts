import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formGroupRegister : FormGroup;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService, private router: Router){
    this.formGroupRegister = formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    })
  }

  get name() {
    return this.formGroupRegister.controls['name'];
  }

  get email() {
    return this.formGroupRegister.controls['email'];
  }

  get password() {
    return this.formGroupRegister.controls['password'];
  }

  get confirmPassword() {
    return this.formGroupRegister.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.formGroupRegister.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
        this.router.navigate([''])
      },
      error => {
        console.error('Error during registration:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
      )
  }


}
