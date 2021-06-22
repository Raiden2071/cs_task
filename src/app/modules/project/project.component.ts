import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewComponent } from 'src/app/modals/view/view.component';
import { ModalMode } from 'src/app/models/modal-mode.enum';
import { Owner } from 'src/app/models/owner';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  owners: Owner[] = [];
  currentOwnerId!: number | undefined;

  constructor(    
    private owner: OwnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.currentOwnerId);

  }

  getProducts() {
    return this.owner.getAll().subscribe(val => this.owners = val);
  }

  delete(): void {
      this.owner.deleteOne((this.currentOwnerId as number)).subscribe(data => this.owners = this.owners.filter(owner => owner.id !== this.currentOwnerId));
  }

  openView(): void {
    if (this.currentOwnerId) {
      const modalRef = this.modalService.open(ViewComponent, { centered: true });
      modalRef.componentInstance.owner = this.owners.find(owner => owner.id == this.currentOwnerId);
      modalRef.componentInstance.mode = ModalMode.VIEW;
    }
  }

  openAdd(): void {
    const modalRef = this.modalService.open(ViewComponent, { centered: true });
    modalRef.componentInstance.mode = ModalMode.CREATE;
    modalRef.componentInstance.owner = this.owners.find(owner => owner.id == this.currentOwnerId);
    modalRef.closed.subscribe(owner => this.owners.push(owner));
  }

  openEdit(): void {
    if (this.currentOwnerId) {
      const modalRef = this.modalService.open(ViewComponent, { centered: true });
      modalRef.componentInstance.owner = this.owners.find(owner => owner.id == this.currentOwnerId);
      modalRef.componentInstance.mode = ModalMode.EDIT;
      modalRef.closed.subscribe(() => this.getProducts());
    }
  }


}
