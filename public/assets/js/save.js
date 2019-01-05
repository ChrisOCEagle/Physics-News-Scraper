// wait until the DOM is fully loaded to attach our handlers
$(() => {
    $(".save").on("click", event => {
        var id = $(this).data("id"),
            newSaved = $(this).data("newsaved"),
            newSavedState = {
                saved: newSaved
            };
            console.log(newSaved);
        $.ajax("/api/article/" + id, {
            type:"PUT",
            data: newSavedState
        }).then(() => {
            console.log("Changed saved to" + newSaved);
            location.reload();
        }
        );
    });
});