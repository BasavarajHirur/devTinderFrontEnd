import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { editProfile, selectEditProfileFails, selectEditProfileSuccess, selectLoggedInProfile } from 'src/app/store';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public error: any;
  public formGroup!: FormGroup;
  public userData: any;
  public showToster = false;
  public allowableGenders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' }];
  public toasterMessage = '';

  private $destroy = new Subject<void>();
  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getLiveData();
    this.editProfileSuccess();
    this.editProfileFails();
  }

  createForm() {
    this.formGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      age: [],
      skills: [],
      about: [],
      photoUrl: []
    })
  }

  getLoggedInUser() {
    this.store.select(selectLoggedInProfile)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        res => {
          if (res) {
            console.log(res, 'res');
            this.userData = res.data;
            this.populateValues(res.data);
            this.error = '';
          }
        }
      )
  }

  populateValues(user: any) {
    const allowableFields = ['firstName', 'lastName', 'age', 'gender', 'photoUrl', 'skills', 'about'];
    Object.keys(user).forEach(key => {
      if (allowableFields.includes(key)) {
        this.formGroup.get(key)?.setValue(user[key]);
      }
    });
  }

  getLiveData() {
    this.formGroup.valueChanges.subscribe((res) => {
      this.userData = res;
    })
  }

  updateProfile() {
    const profileDetails = this.formGroup.getRawValue();
    this.store.dispatch(editProfile({ profileDetails }));
  }

  editProfileSuccess() {
    this.store.select(selectEditProfileSuccess)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        {
          next: res => {
            if (res) {
              console.log(res)
              this.toasterMessage = res.message;
              this.showToster = true;
              setTimeout(() => {
                this.showToster = false;
              }, 3000);
            }
          }
        }
      )
  }

  editProfileFails() {
    this.store.select(selectEditProfileFails)
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        {
          next: res => {
            if (res) {
              console.log(res)
              this.error = res.error.message;
              this.showToster = false;
            }
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
