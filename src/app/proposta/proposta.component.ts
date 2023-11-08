import { Component } from '@angular/core';
import { Proposta } from '../proposta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropostaService } from '../proposta.service';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent {

  proposta : Proposta[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  PropostaService: any;


  constructor (private propostaService : PropostaService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      empresa : [''],
      type : [''],
      date : [''],
      valor : [''],
      status : [''],
      vendedor : [''],
      comentario : ['']
    });
  }

  ngOnInit(): void {
    this.loadProposta();
  }

  loadProposta() {
    this.propostaService.getProposta().subscribe(
      {
        next : data => this.proposta = data
      }
      );
  }

  save(){
    if(this.isEditing)
    {
      this.propostaService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadProposta();
            this.formGroupClient.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else{
      this.propostaService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.proposta.push(data);
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

  edit(proposta : Proposta){
    this.formGroupClient.setValue(proposta);
    this.isEditing = true;
  }

  delete(proposta : Proposta){
    this.propostaService.delete(proposta).subscribe({
      next: () => this.loadProposta()
    })
  }

  

}