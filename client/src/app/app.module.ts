import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { DropdownDirective } from './shared/dropdown.directive';
import { MemberPhotoComponent } from './members/member-photo/member-photo.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { Tab } from './shared/tab.directive';
import { Tabs } from './shared/tabs.directive';
import { UploadComponent } from './upload/upload.component';
import { TextInputsComponent } from './_forms/text-inputs/text-inputs.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MessageDirective } from './shared/message.directive';
import { CloseDirective } from './shared/close.directive';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MemberDetailComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberListComponent,
    MemberCardComponent,
    DropdownDirective,
    MessageDirective,
    CloseDirective,
    MemberPhotoComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    Tabs,
    Tab,
    UploadComponent,
    TextInputsComponent,
    PostComponent,
    PostDetailComponent,
    ScrollTopComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    FileUploadModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    LoginComponent
    
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
