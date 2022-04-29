import { Component } from '@angular/core';
import { ElectronService } from '../../app/services/electron.service';

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent {
  title = 'splashscreen';

  constructor(private electronService: ElectronService){}

  ngOnInit() {
    if (this.electronService.isElectron) {
      const el = document.getElementById('activity')
      this.electronService.ipcRenderer.on('status', (event: any, message: string) => {
        (el) ? el.innerHTML = message : null
      })
    }
  }
}



