$(document).ready(function() {
    $('#tombol').on('click', function() {
        $('#daftar-film').html(''); // Mengosongkan daftar film sebelumnya
        $.ajax({
            url: 'http://www.omdbapi.com',
            type: 'get',
            dataType: 'json',
            data: {
                'apikey': '7476faa', // Gantilah dengan API key Anda
                's': $('#cari').val() // Mengambil nilai input pencarian
            },
            success: function(hasil) {
                if (hasil.Response == 'True') {
                    let film = hasil.Search;
                    console.log(film);
                    $.each(film, function(i, data) {
                        $('#daftar-film').append(`
                            <div class="col-md-4 mb-3">
                                <div class="card" style="width: 18rem;">
                                    <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${data.Title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.Title}</h5>
                                        <p class="card-text">Year: ${data.Year}</p>
                                        <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-info detail" data-id="${data.imdbID}" data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</a>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                } else {
                    $('#daftar-film').html('<h3 class="text-center">Movie not found</h3>');
                }
            }
        });
    });
});

// event building
$(document).ready(function() {
    $('#daftar-film').on('click', '.detail', function() {
        let id = $(this).data('id');
        console.log(id);
        $.ajax({
            url: 'http://www.omdbapi.com',
            type: 'get',
            dataType: 'json',
            data: {
                'apikey': '7476faa', // Gantilah dengan API key Anda
                'i': id // Mengambil nilai input pencarian
            },
            success: function(hasil) {
                if (hasil.Response == 'True') {
                    $('.modal-body').html(`
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="${hasil.Poster !== 'N/A' ? hasil.Poster : 'https://via.placeholder.com/150'}" class="img-fluid" alt="${hasil.Title}">
                                </div>
                                <div class="col-md-8">
                                    <ul class="list-group">
                                        <li class="list-group-item"><strong>Title: </strong>${hasil.Title}</li>
                                        <li class="list-group-item"><strong>Year: </strong>${hasil.Year}</li>
                                        <li class="list-group-item"><strong>Rated: </strong>${hasil.Rated}</li>
                                        <li class="list-group-item"><strong>Released: </strong>${hasil.Released}</li>
                                        <li class="list-group-item"><strong>Runtime: </strong>${hasil.Runtime}</li>
                                        <li class="list-group-item"><strong>Genre: </strong>${hasil.Genre}</li>
                                        <li class="list-group-item"><strong>Director: </strong>${hasil.Director}</li>
                                        <li class="list-group-item"><strong>Writer: </strong>${hasil.Writer}</li>
                                        <li class="list-group-item"><strong>Actors: </strong>${hasil.Actors}</li>
                                        <li class="list-group-item"><strong>Plot: </strong>${hasil.Plot}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `);
                }
            }
        });
    });
});
