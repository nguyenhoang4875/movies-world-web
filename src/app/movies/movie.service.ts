import { Injectable } from "@angular/core";
import { Movie } from "./movie.model";
import { Description } from "../shared/description.model";
import { TimeFilmShowing } from "../shared/timeFilmShowing.model";

@Injectable({ providedIn: "root" })
export class MovieService {
  private movies: Movie[] = [
    new Movie({
      id: "1",
      name: "Mắt Biếc",
      trailer: "http://MatBiec",
      genre: ["Tình Cảm", "Học Trò"],
      rating: 8.9,
      status: "Enable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "2",
      name: "Spider Man: Come Back Home",
      trailer: "http://SpiderMan",
      genre: ["Hành động", "Viễn Tưởng"],
      rating: 8,
      status: "Disable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "3",
      name: "Mắt Biếc",
      trailer: "http://MatBiec",
      genre: ["Tình Cảm", "Học Trò"],
      rating: 8.9,
      status: "Enable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "4",
      name: "Spider Man: Come Back Home",
      trailer: "http://SpiderMan",
      genre: ["Hành động", "Viễn Tưởng"],
      rating: 7,
      status: "Disable",
      picture: "assets/images/logo.png",
    }),
    new Movie({
      id: "5",
      name: "Spider Man: Come Back Home",
      trailer: "http://SpiderMan",
      genre: ["Hành động", "Viễn Tưởng"],
      rating: 7.5,
      status: "Disable",
      picture: "assets/images/logo.png",
    }),
  ];

  private descriptions: Description[] = [
    new Description({
      id: "1",
      timeLimit: "100",
      premiere: new Date(2020, 4, 8),
      artist: "Hà Lan, Ngạn",
      director: "Victor Vũ",
      content: `Phim kể về chuyện tình đơn phương của chàng thanh niên Ngạn dành cho cô bạn từ thuở nhỏ Hà Lan...
       Ngạn và Hà Lan vốn là hai người bạn từ thuở nhỏ, cùng ở làng Đo Đo an bình.
       Họ cùng nhau đi học, cùng trải qua quãng đời áo trắng ngây thơ vụng dại với những cảm xúc bồi hồi của tuổi thiếu niên.
       'Ngày cô ấy đi theo chốn phồn hoa, chàng trai bơ vơ từ xa.'`,
      nation: "Việt Nam",
    }),
    new Description({
      id: "2",
      timeLimit: "150",
      premiere: new Date(2020, 4, 8),
      artist: "Tom Holland, Jake Gyllenhaal, Samuel L. Jackson, Zendaya",
      director: "Jon Watts",
      content: `Trở lại sau sự ra đi của người chú Tony – Iron Man, có vẻ như cậu bé Peter đã không còn đủ động lực, niềm tin để tiếp tục theo đuổi giấc mơ làm siêu anh hùng.
       Nhưng đời đâu phải lúc nào cũng như ý ta mong muốn! Nhất là khi ở ngoài kia, vẫn còn vô vàn kẻ xấu khác cần tiêu diệt.
       Trong chuyến du lịch đến châu Âu, Peter Parker và những người bạn của mình rơi vào rắc rối mới.
       Không những vậy, cậu còn được diện kiến Nick Fury.
       Liệu thử thách mới của Spider-Man sẽ khó khăn đến mức độ nào? Dù "gan to" cúp điện thoại của Nick Fury Peter vẫn phải hợp tác cùng ông để tiếp tục hành trình bảo vệ thế giới của chú Tony.
       Bên cạnh Nick Fury, Spider-Man: Far From Home còn có sự xuất hiện của một gương mặt mới là Mysterio. Liệu đây sẽ là nhân vật phản diện hay chính diện?`,
      nation: "Mỹ",
    }),
    new Description({
      id: "3",
      timeLimit: "100",
      premiere: new Date(2020, 4, 8),
      artist: "Hà Lan, Ngạn",
      director: "Victor Vũ",
      content: `Phim kể về chuyện tình đơn phương của chàng thanh niên Ngạn dành cho cô bạn từ thuở nhỏ Hà Lan...
       Ngạn và Hà Lan vốn là hai người bạn từ thuở nhỏ, cùng ở làng Đo Đo an bình.
       Họ cùng nhau đi học, cùng trải qua quãng đời áo trắng ngây thơ vụng dại với những cảm xúc bồi hồi của tuổi thiếu niên.
       'Ngày cô ấy đi theo chốn phồn hoa, chàng trai bơ vơ từ xa.'`,
      nation: "Việt Nam",
    }),
    new Description({
      id: "4",
      timeLimit: "150",
      premiere: new Date(2020, 4, 8),
      artist: "Tom Holland, Jake Gyllenhaal, Samuel L. Jackson, Zendaya",
      director: "Jon Watts",
      content: `Trở lại sau sự ra đi của người chú Tony – Iron Man, có vẻ như cậu bé Peter đã không còn đủ động lực, niềm tin để tiếp tục theo đuổi giấc mơ làm siêu anh hùng.
       Nhưng đời đâu phải lúc nào cũng như ý ta mong muốn! Nhất là khi ở ngoài kia, vẫn còn vô vàn kẻ xấu khác cần tiêu diệt.
       Trong chuyến du lịch đến châu Âu, Peter Parker và những người bạn của mình rơi vào rắc rối mới.
       Không những vậy, cậu còn được diện kiến Nick Fury.
       Liệu thử thách mới của Spider-Man sẽ khó khăn đến mức độ nào? Dù "gan to" cúp điện thoại của Nick Fury Peter vẫn phải hợp tác cùng ông để tiếp tục hành trình bảo vệ thế giới của chú Tony.
       Bên cạnh Nick Fury, Spider-Man: Far From Home còn có sự xuất hiện của một gương mặt mới là Mysterio. Liệu đây sẽ là nhân vật phản diện hay chính diện?`,
      nation: "Mỹ",
    }),
    new Description({
      id: "5",
      timeLimit: "150",
      premiere: new Date(2020, 4, 8),
      artist: "Tom Holland, Jake Gyllenhaal, Samuel L. Jackson, Zendaya",
      director: "Jon Watts",
      content: `Trở lại sau sự ra đi của người chú Tony – Iron Man, có vẻ như cậu bé Peter đã không còn đủ động lực, niềm tin để tiếp tục theo đuổi giấc mơ làm siêu anh hùng.
       Nhưng đời đâu phải lúc nào cũng như ý ta mong muốn! Nhất là khi ở ngoài kia, vẫn còn vô vàn kẻ xấu khác cần tiêu diệt.
       Trong chuyến du lịch đến châu Âu, Peter Parker và những người bạn của mình rơi vào rắc rối mới.
       Không những vậy, cậu còn được diện kiến Nick Fury.
       Liệu thử thách mới của Spider-Man sẽ khó khăn đến mức độ nào? Dù "gan to" cúp điện thoại của Nick Fury Peter vẫn phải hợp tác cùng ông để tiếp tục hành trình bảo vệ thế giới của chú Tony.
       Bên cạnh Nick Fury, Spider-Man: Far From Home còn có sự xuất hiện của một gương mặt mới là Mysterio. Liệu đây sẽ là nhân vật phản diện hay chính diện?`,
      nation: "Mỹ",
    }),
  ];

  private timeFilmShowing: TimeFilmShowing[] = [
    new TimeFilmShowing({
      id: "1",
      date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
      timeStart: [
        new Date(2020, 4, 8, 9),
        new Date(2020, 4, 8, 15),
        new Date(2020, 4, 9, 11),
        new Date(2020, 4, 10, 12),
        new Date(2020, 4, 10, 14),
      ],
      timeEnd: [],
    }),
    new TimeFilmShowing({
      id: "2",
      date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
      timeStart: [
        new Date(2020, 4, 8, 9),
        new Date(2020, 4, 8, 15),
        new Date(2020, 4, 9, 11),
        new Date(2020, 4, 10, 12),
        new Date(2020, 4, 10, 14),
      ],
      timeEnd: [],
    }),
    new TimeFilmShowing({
      id: "3",
      date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
      timeStart: [
        new Date(2020, 4, 8, 9),
        new Date(2020, 4, 8, 15),
        new Date(2020, 4, 9, 11),
        new Date(2020, 4, 10, 12),
        new Date(2020, 4, 10, 14),
      ],
      timeEnd: [],
    }),
    new TimeFilmShowing({
      id: "4",
      date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
      timeStart: [
        new Date(2020, 4, 8, 9, 15),
        new Date(2020, 4, 8, 15),
        new Date(2020, 4, 9, 11),
        new Date(2020, 4, 10, 12),
        new Date(2020, 4, 10, 14),
      ],
      timeEnd: [],
    }),
    new TimeFilmShowing({
      id: "5",
      date: [new Date(2020, 4, 8), new Date(2020, 4, 9), new Date(2020, 4, 10)],
      timeStart: [
        new Date(2020, 4, 8, 9),
        new Date(2020, 4, 8, 15),
        new Date(2020, 4, 9, 11),
        new Date(2020, 4, 10, 12),
        new Date(2020, 4, 10, 14),
      ],
      timeEnd: [],
    }),
  ];

  getMovies() {
    return this.movies.slice();
  }
  getMovie(id: string) {
    return this.movies[+id + 1];
  }

  getDescription(id: string) {
    return this.descriptions[+id + 1];
  }

  getTimeFilmShowing(id: string) {
    return this.timeFilmShowing[+id + 1];
  }
}
