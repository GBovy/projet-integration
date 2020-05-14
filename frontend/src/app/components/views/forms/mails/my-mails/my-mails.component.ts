import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailInterface } from 'src/app/models/interfaces/mail.interface';
import { BehaviorSubject } from 'rxjs';

class MailsProperties {
  public static readonly RECEIVER = 'receiver';
  public static readonly SUBJECT = 'subject';
  public static readonly MESSAGE = 'message';
}

//pour le rooting
@Component({
    selector: 'app-my-mails',
    templateUrl: './my-mails.component.html',
    styleUrls: ['./my-mails.component.scss']
  })
//

export class MyMailsComponent implements OnInit {

  MailsProperties = MailsProperties;

  public user: User[] = [];

  public form: FormGroup;

  public MailInterface: MailInterface;

  public isLoadingResults = true;

  public sended$ = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    ) {
      this.constructForm();
     }

  private constructForm() {
    this.form = this.fb.group({
      [MailsProperties.RECEIVER]: ['', [Validators.required]],
      [MailsProperties.SUBJECT]: ['', [Validators.required]],
      [MailsProperties.MESSAGE]: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
        [MailsProperties.RECEIVER]: [null, [ Validators.required, Validators.email, Validators.maxLength(150) ]],  
        [MailsProperties.SUBJECT]: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        [MailsProperties.MESSAGE]: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]]
    });
  }

  public sendMail() {
      //console.log("receiver : "+this.form.controls[MailsProperties.RECEIVER].value);
      /*
      console.log(""+this.form.get(MailsProperties.RECEIVER).value);
      console.log(""+this.form.get(MailsProperties.SUBJECT).value);
      console.log(""+this.form.get(MailsProperties.MESSAGE).value);
      */        
      this.userService.sendMail
      ({
        subject :   this.form.get(MailsProperties.SUBJECT).value, 
        mail :      this.form.get(MailsProperties.MESSAGE).value,
        receiver :  this.form.get(MailsProperties.RECEIVER).value
        /*
        subject :   'Test envoi Email', 
        mail :      'Bonjour, ce mail est envoyé depuis le serveur mail du projet d integration en spring boot et angular',
        receiver :  'g.c.bovy@gmail.com'
        */
      })
      .subscribe();

    }

    /**
     * Checks if a formcontrol is invalid
     * @param formControlName formControlPrperty name
     * @returns if control is valid
     */
    public isInvalidControl(formControlName: string): boolean {
      return (this.form.get(formControlName).value && this.form.get(formControlName).touched && this.form.get(formControlName).invalid);
  }
} 