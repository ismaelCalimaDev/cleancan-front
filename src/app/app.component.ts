import { Component } from '@angular/core';
import {Stripe} from "@capacitor-community/stripe";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    Stripe.initialize({
      publishableKey: 'pk_test_51L0kGGGXFAEZHc9yHwFI9EsgMEnvOo8N4Q6mRitqUNTxDyXvsSUt4F2e7qyS1MgIhdxiiKJOBbvmSqdZoe4vxKHB00dWUWngen',
    });
  }
}
