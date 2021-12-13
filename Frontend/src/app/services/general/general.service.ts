import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  porcentajeSubida!: Observable<any>;
  finalUrl: string = '';

  constructor(
    private storage: AngularFireStorage
  ) { }

  async uploadFile(eId: string, folder: string, doc: string) {
    const id = Math.random().toString(36).substring(2);
    var input: any = document.getElementById(eId);
    const file = input.files[0];
    const ruta = `${folder}/${id}`;
    const ref = this.storage.ref(ruta);

    const carga = this.storage.upload(ruta, file);
    this.porcentajeSubida = carga.percentageChanges();
    await carga.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.finalUrl = url;
          return url;
        });
      })
    ).subscribe();
  }
}
