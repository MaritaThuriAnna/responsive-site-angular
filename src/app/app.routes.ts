import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NgModule } from '@angular/core';
import { PageSettingsComponent } from './pages/settings/page-settings/page-settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './components/login/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },

    //submenus
    { path: 'our-story', component: AboutComponent },
    { path: 'team', component: AboutComponent },
    { path: 'consulting', component: ServicesComponent },
    { path: 'development', component: ServicesComponent },
    { path: 'profile', component: HomeComponent },
    { path: 'settings', component: PageSettingsComponent },
    
    { path: '**', component: NotFoundComponent },
];