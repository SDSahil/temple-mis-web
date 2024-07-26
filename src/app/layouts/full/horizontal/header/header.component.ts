import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { User } from '@app/models/auth.model';
import { AuthService } from '@app/services/auth.service';

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-horizontal-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [MaterialModule, CommonModule, RouterModule]
})
export class HorizontalHeaderComponent implements OnChanges {

  @Output() toggleMobileNav = new EventEmitter<void>();
  @Input() userDetail:any;

  notifications: notifications[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'New message received',
      subtitle: 'Salma sent you new message',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'New Payment received',
      subtitle: 'Check your earnings',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'Jolly completed tasks',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
  ];

  public userName!: string;

  constructor(private authService: AuthService) {}

  ngOnChanges(_changes: SimpleChanges): void {
    // console.log(this.userDetail?.id, this.userDetail?.name);
    // const name = this.userDetail?.name;
    // this.userName = name?.firstName + ' ' + name?.lastName;
  }

  /**
   * logout
   */
  public logout() {
    this.authService.logout(false);
  }

}
