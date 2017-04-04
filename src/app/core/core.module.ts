import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';





/*shared services */
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';



@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [AuthService, AuthGuard]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
