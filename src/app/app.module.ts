import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";
import { AppLayoutModule } from "./shared/app-layout.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        PagesModule,
        AppLayoutModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }