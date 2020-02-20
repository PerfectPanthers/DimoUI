import { Component, OnInit } from '@angular/core';
import { MovieDetailService } from './movie-detail.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WallpaperService } from 'src/app/login/services/wallpaper.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public thumbNail = `https://image.tmdb.org/t/p/w400`;
  public movie: any;
  constructor(private movieDetailService: MovieDetailService,public wallpaperService: WallpaperService) { }

  ngOnInit(): void {
    this.movieDetailService.getMovieId().subscribe((id) => {
      this.getMovieById(id);
    });
  }

  public getMovieThumbNailsByMovie(movieName: string = '3 Idiots') {
    this.movieDetailService.getMovieThumbNailByAPI(movieName).subscribe((resp: any) => {
      const movieResultsByName = resp.results as Array<any>;
      if (movieResultsByName.length > 0) {
        const movie = movieResultsByName.filter((mov) => {
          return mov.original_title === movieName;
        });
        this.thumbNail += movie[0].poster_path;
      }
    });
  }

  public getMovieById(movieId: string = '99861') {
    this.movieDetailService.getMovieById(movieId).subscribe((response) => {
      this.movie = response;
      console.log(this.movie);
      if (this.movie) {
        this.getMovieThumbNailsByMovie(this.movie.originalTitle);
      }
    });
  }


}
