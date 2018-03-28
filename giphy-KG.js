$(function(){
    //runs upon page loading
    populateButtons(searchArray, "searchButton", "#buttonsArea");
})

var searchArray = ["Dog", "Cat", "Bird"]

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i=0; i < searchArray.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).prepend(a);
    }
}

$(document).on('click','.searchButton', function(){
    $('#searches').empty();
    var type = $(this).data('type');
    console.log(type);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+type+'&api_key=dc6zaTOxFJmzC&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET'})
        .done(function(response) {
            for (var j=0; j < response.data.length; j++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[j].rating;
                var p = $('<p>').text("Rating: " + rating);
                var animated = response.data[j].images.fixed_height.url;
                var still = response.data[j].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', "still");
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').prepend(searchDiv);
            }
        })
})

$(document).on('click', '.searchImage',function(){
    var state = $('this').attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).data('animated'))
        $(this).attr('data-state', 'animated')
    } else {
        $(this).attr('src', $(this).data('still'))
        $(this).attr('data-state', 'still')
    }
})


$('#addSearch').on('click', function(event) {
    event.preventDefault();

    var newSearch = $('input').eq(0).val();
    console.log(newSearch);
    
    searchArray.push(newSearch);
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    return false;

})