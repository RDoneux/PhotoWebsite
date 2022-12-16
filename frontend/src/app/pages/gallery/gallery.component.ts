import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(private activiatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activiatedRoute.queryParams.subscribe({
      next: (response) => {
        const id = response['id'];
        console.log(id);
      },
    });
  }
}
