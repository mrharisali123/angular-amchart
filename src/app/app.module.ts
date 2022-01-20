import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { statisticsComponent } from './pages/statistics/statistics.component';
import { graphComponent } from './components/graph/graph.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule],
  declarations: [
    AppComponent,
    HelloComponent,
    statisticsComponent,
    graphComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
