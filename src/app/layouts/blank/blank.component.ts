import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreService } from '@app/services/core.service';
import { AppSettings } from '@app/interfaces/app-settings.interface';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './blank.component.html',
  styleUrls: [],
})
export class BlankComponent implements OnInit {

  private htmlElement!: HTMLHtmlElement;
  public options!: AppSettings;
  public errorState: boolean = false;

  constructor(private _settings: CoreService, private router: Router) {
    this.htmlElement = document.querySelector('html')!;

    //Initialize theme with options
    this.receiveOptions();
  }

  ngOnInit(): void {
    const currRoute = this.router.url;
    this.errorState = currRoute === '/authentication/error';
  }

  private receiveOptions() {
    const opts: AppSettings = this._settings.getOptions();
    this.options = opts;
    this.toggleDarkTheme(opts);
  }

  private toggleDarkTheme(opts: AppSettings) {
    if (opts.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }
}
