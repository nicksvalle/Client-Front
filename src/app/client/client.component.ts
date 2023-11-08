import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { escopos } from '../escopo';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{

  client : Client[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  ClientService: any;
  escopos = escopos;
  submitted: boolean = false;

  constructor (private clientService : ClientService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id: [''],
      cnpj: ['', [Validators.required, Validators.pattern('^\\d{14}$')]], // Exemplo de pattern para CNPJ
      empresa: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      contato: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      email: ['', [Validators.required, Validators.email]],
      escopo: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]], // Supondo que seja um campo obrigatório
      nacionalidade: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      telefone: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]], // Pode adicionar validação específica se necessário
    });
  }

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.clientService.getClient().subscribe(
      {
        next : data => this.client = data
      }
      );
  }

  save() {
    this.submitted = true;

    if (this.formGroupClient.invalid) {
        console.log('Formulário inválido: ', this.formGroupClient.errors);
        return;
    }

    const emailControl = this.formGroupClient.get('email');

    if (emailControl && !emailControl.valid) {
        console.log('Email inválido!');
        return;
    }

    if (this.isEditing) {
        this.clientService.update(this.formGroupClient.value).subscribe({
            next: () => {
                this.loadClient();
                this.formGroupClient.reset();
                this.isEditing = false;
                this.submitted = false;
                this.setEscolhaUmEscopo();
            }
        });
    } else {
        this.clientService.save(this.formGroupClient.value).subscribe({
            next: data => {
                this.client.push(data);
                this.formGroupClient.reset();
                this.submitted = false;
                this.setEscolhaUmEscopo();
            }
        });
    }
}

setEscolhaUmEscopo() {
    const escopoControl = this.formGroupClient.get('escopo');
    if (escopoControl) {
        escopoControl.setValue('');
    }
}


  clean(){
    this.formGroupClient.reset();

    this.isEditing = false;
    this.submitted = false;

    const escopoControl = this.formGroupClient.get('escopo');
    if (escopoControl) {
        escopoControl.setValue('');
    }  
  }

  edit(client : Client){
    this.formGroupClient.setValue(client);
    this.isEditing = true;
  }

  delete(client : Client){
    this.clientService.delete(client).subscribe({
      next: () => this.loadClient()
    })
  }

  get empresa(): any {
    return this.formGroupClient.get('empresa');
  }

  get contato(): any {
    return this.formGroupClient.get('contato');
  }

  get email(): any {
    return this.formGroupClient.get('email');
  }

  get escopo(): any {
    return this.formGroupClient.get('escopo');
  }

  get nacionalidade(): any {
    return this.formGroupClient.get('nacionalidade');
  }

  get telefone(): any {
    return this.formGroupClient.get('telefone');
  }

}
