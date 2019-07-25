function handleScrape(event){
    event.preventDefault();
    $.get("/scrape", function(data){
        for(var i = 0; i < data.length; i++){
            $("#articles").append(`<span><a data-id=${data[i]._id} 
            data-isSaved=${data[i].isSaved} 
            href=${data[i].link}>${data[i].title}</a></span>`);
            $("#articles").append(`<button type="submit" id="save">Save it!</button>`, `<button type="submit" id="comment">Show comments</button>`);
        }
    });
}

$("#scraper").on("click", handleScrape);

$("#comment").on("click", function(event){
    event.preventDefault();
    $("#comments").empty();
    console.log(this);
    var thisId = $(this).attr("data-id");
    console.log(thisId);
})
