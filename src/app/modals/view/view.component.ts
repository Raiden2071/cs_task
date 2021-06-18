import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  ownerForm!: FormGroup;

  constructor(
    private autoS: AutoService,
    private ownerS: OwnerService,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.mode !== 2 || this.owner) {
      this.ownerForm = this.fb.group({
        id:         [this.owner.id, [Validators.required]],
        surname:    [this.owner.surname, [Validators.required]],
        name:       [this.owner.name, [Validators.required]],
        patronymic: [this.owner.patronymic, [Validators.required]],
        aCars:      [this.owner.aCars, [Validators.required]]
      });
    }
    else {
      this.ownerForm = this.fb.group({
        id:         [this.randomId(), [Validators.required]],
        surname:    ['', [Validators.required]],
        name:       ['', [Validators.required]],
        patronymic: ['', [Validators.required]],
        aCars:      this.fb.array([])
      });
    }
    this.getProducts();
  }

  randomId(): number {
    return Math.floor(Math.random() * (100 - 1) + 1);
  }

  get cars(): FormArray {
    return this.ownerForm.get("aCars") as FormArray
  }

  newCar(): FormGroup {
    return this.fb.group({
      stateNumber: ['', [Validators.required]],
      firm: ['', [Validators.required]],
      model: ['', [Validators.required]],
      productionYear: ['', [Validators.required]]
    })
  }

  getProducts(): void {
    this.ownerS.getAll().subscribe(val => this.owners = val);
  }

  addCar() {
    this.cars.push(this.newCar());
  }

  deleteCar(id: number): void {
    this.autoS.deleteOne(id).subscribe(data => this.cars.removeAt(id));
  }

  onSubmit(): void {
    if (this.mode === 2) {
      //добавляем нового пользователя
      this.autoS.createOne(this.ownerForm.value).subscribe(cars => this.activeModal.close(cars));
      return;
    }
    // edit
    if (this.mode == 1) {
      this.ownerS.editOne(this.owner.id, this.ownerForm.value).subscribe(() => console.log());
    }
    // view
    this.activeModal.close();
  }

  close(): void {
    this.activeModal.dismiss('OK');
  }

}
