// wait until the DOM is fully loaded to attach our handlers
$(function() {
    ajaxPutRequest("save");
    ajaxPutRequest("delete");
});

function ajaxPutRequest(id) {
    $("#" + id).on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id"),
            newSaved = $(this).data("newsaved"),
            newSavedState = {
                saved: newSaved
            };
        $.ajax("/api/article/" + id, {
            type:"PUT",
            data: newSavedState
        }).then(() => {
            console.log("Changed saved to" + newSaved);
            location.reload();
        }
        );
    });
}