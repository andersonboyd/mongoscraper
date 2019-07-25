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

$(".save").on("click", function(event){
    event.preventDefault();
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "PUT",
        url: "/save/" + thisId
    }).then(function(data){
        console.log(data);
    }).catch(function(err){
        console.log(err);
    });
});

$("#saved").on("click", function(event){
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/save"
    }).then(function(saved){
        console.log(saved);
        window.location.href = "/saved"
    });
});

$(".comment").on("click", function(event){
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    $("#comments").empty();
    console.log(this);
    console.log(thisId);
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function(data){
        console.log(data);
        $("#comments").append(`<h2>${data.title}</h2>`);
        $("#comments").append(`<input id="titleInput" name="title">`);
        $("#comments").append(`<textarea id="bodyInput" name="body"></textarea>`);
        $("#comments").append(`<button data-id="${data._id}" id="saveComment">Save</button>`);

        if(data.comment){
            $("#titleInput").val(data.comment[0].title);
            $("#bodyInput").val(data.comment[0].body);
        }
    }).catch(function(err){
        console.log(err);
    });
});

$(document).on("click", "#saveComment", function(){
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    }).then(function(data){
        console.log(data);
        $("#comments").empty();
    });

    $("#titleInput").val("");
    $("#bodyInput").val("");
})
