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

  @Input() mode!: ModalMode;
  @Input() owner!: Owner;
  owners!: Owner[];
  // autos!: Car[];

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
    if(this.mode!==2 || this.owner) {      
      this.ownerForm = this.fb.group({
        id:         [this.owner.id,         [Validators.required]],
        surname:    [this.owner.surname,    [Validators.required]],
        name:       [this.owner.name,       [Validators.required]],
        patronymic: [this.owner.patronymic, [Validators.required]],
        aCars:      [this.owner.aCars,      [Validators.required]]
      });
    }
    else {
      this.ownerForm = this.fb.group({
        id:         [this.randomId(), [Validators.required]],
        surname:    ['', [Validators.required]],
        name:       ['', [Validators.required]],
        patronymic: ['', [Validators.required]],
        aCars:      [[], [Validators.required]]
      });
    }
    this.getProducts();            
  }

  randomId(): number {
    return Math.floor(Math.random() * (100 - 1) + 1)
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

  getProducts(): void {
    this.ownerS.getAll().subscribe(val=> this.owners = val);
    // this.autoS.getAll().subscribe(val=> this.autos = val);
  }

  addCar(): void {       
    this.cars.push(this.newCar());
  }
  
  deleteCar(id: number): void {
    this.autoS.deleteOne(id).subscribe(data => this.cars.removeAt(id));
  }
  
  onSubmit(): void {                
    if(this.mode===2) { 
      //добавляем нового пользователя
      if(this.owner === undefined) {
        this.owner = this.ownerForm.value;
        this.autoS.createOne(this.autoForm.value).subscribe(cars => this.owner.aCars.push(cars));
        this.activeModal.close(this.owner)    
      }
      //добавляем авто к существующему пользователю
      else {
        this.autoS.createOne(this.autoForm.value).subscribe(cars => this.owner.aCars.push(cars));
        this.activeModal.close(this.owner)    
      }
      return;
    } 
    // edit
    if(this.mode==1) {          
      //удалять элементы в массиве и добавлять новые 
      this.ownerS.editOne(this.owner.id, this.ownerForm.value).subscribe((v) => console.log());
      // this.autoS.editOne(this.owner.id, this.autoForm.value).subscribe(cars => this.owner.aCars.push(cars));
    }
    // view
    this.activeModal.close(); 
  }

  close(): void {
    this.activeModal.dismiss('OK');
  } 

}
