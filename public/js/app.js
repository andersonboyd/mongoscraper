function handleScrape(event){
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(data){
        console.log(data);
        $(".articles").empty();
        $.ajax({
            method: "GET",
            url: "/articles"
        }).then(function(dbArticle){
            console.log(dbArticle);
            location.reload();
        }).catch(function(err){
            console.log(err);
        })
    }).catch(function(err){
        console.log(err);
    });
}

$("#scraper").on("click", handleScrape);

$(".comment").on("click", function(event){
    event.preventDefault();
    $("#comments").empty();
    console.log(this);
    var thisId = $(this).attr("data-id");
    console.log(thisId);
});
