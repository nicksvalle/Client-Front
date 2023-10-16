import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../client.service';

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


  constructor (private clientService : ClientService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      cnpj : [''],
      empresa : [''],
      contato : [''],
      email : [''],
      nacionalidade : [''],
      telefone : ['']
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

  save(){
    if(this.isEditing)
    {
      this.clientService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadClient();
            this.formGroupClient.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else{
      this.clientService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.client.push(data);
            this.formGroupClient.reset();
          }
        }
        );
    }
 }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
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

  

}
