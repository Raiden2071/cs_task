import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/auto';
import { ModalMode } from 'src/app/models/modal-mode.enum';
import { Owner } from 'src/app/models/owner';
import { AutoService } from 'src/app/modules/services/auto.service';
import { OwnerService } from 'src/app/modules/services/owner.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  owners!: Owner[];
  @Input() mode!: ModalMode;
  @Input() owner!: Owner;
  autos!: Car[];
  autoForm!: FormGroup;
  ownerForm!: FormGroup;

  constructor(
    private autoS: AutoService,
    private ownerS: OwnerService,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {    
    this.autoForm = this.fb.group({
      cars: this.fb.array([])
    });
    if(this.mode!==2) {      
      this.ownerForm = this.fb.group({
        id:         [44, [Validators.minLength(1), Validators.required]],
        surname:    [this.owner.surname,    [Validators.required]],
        name:       [this.owner.name,       [Validators.required]],
        patronymic: [this.owner.patronymic, [Validators.required]],
        aCar:       [[], [Validators.required]]
      });
    }
    else {
      this.ownerForm = this.fb.group({
        id:         [44, [Validators.minLength(1), Validators.required]],
        surname:    ['', [Validators.minLength(1), Validators.required]],
        name:       ['', [Validators.minLength(1), Validators.required]],
        patronymic: ['', [Validators.minLength(1), Validators.required]],
        aCar:       [[], [Validators.required]]
      });
    }
    this.getProducts();        
  }

  get cars(): FormArray {
    return this.autoForm.get("cars") as FormArray;
  }

  newCar(): FormGroup {
    return this.fb.group({
      stateNumber:    ['', [Validators.required]],
      firm:           ['', [Validators.required]],
      model:          ['', [Validators.required]],
      productionYear: ['', [Validators.required]]
    })
  }

  getProducts() {
    this.ownerS.getAll().subscribe(val=> this.owners = val);
    return this.autoS.getAll().subscribe(val=> this.autos = val);
  }

  addCar(): void {
    this.cars.push(this.newCar());
  }
  
  deleteCar(id: number): void {
    this.autoS.deleteOne(id).subscribe(data => this.cars.removeAt(id));
  }
  
  addAuto(): void {
    this.owner.aCars.push(this.autoForm.value);
  }

  onSubmit(): void {        
    if(this.mode===2 || this.ownerForm.valid) {      
      this.activeModal.close(this.ownerForm.value);         
    }
    if(this.mode==1) {
      this.ownerS.editOne(this.owner.id, { 
        name: this.ownerForm.value.name,
        surname: this.ownerForm.value.surname,
        patronymic: this.ownerForm.value.patronymic
       }).subscribe(v => console.log(v));
      this.autoS.createOne(this.autoForm.value).subscribe(cars => this.owner.aCars.push(cars));
      this.activeModal.close(); 
    }
  }

  close(): void {
    this.activeModal.close();
  } 

}
