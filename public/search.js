let search = $("#livesearch");




function showResult(str){
    if(str.length === 0){
        search.addClass("hide")
    }else{
        search.removeClass("hide");
    }

    $.ajax({
        url: "/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({search: str}),
        success: function(result){
            search.html(result.response);

        }
    });
}
