import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NgModule } from '@angular/core';
import { PageSettingsComponent } from './pages/settings/page-settings/page-settings.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'contact', component: ContactComponent },

    //submenus
    { path: 'our-story', component: AboutComponent },
    { path: 'team', component: AboutComponent },
    { path: 'consulting', component: ServicesComponent },
    { path: 'development', component: ServicesComponent },
    { path: 'profile', component: HomeComponent },
    { path: 'settings', component: PageSettingsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
}) export class AppRoutingModule { }
