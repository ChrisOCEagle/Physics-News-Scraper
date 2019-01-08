const saveBtn = $("#save"),
      deleteBtn = $("#delete");

// wait until the DOM is fully loaded to attach our handlers
$(function() {
    onClick(saveBtn);
    onClick(deleteBtn);
});

function onClick(btn) {
    btn.on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id"),
            newSaved = $(this).data("newsaved"),
            newSavedState = {
                saved: newSaved
            };
        ajaxPutRequest(id, newSavedState);
    });
};

function ajaxPutRequest(id, newSavedState) {
    $.ajax("/api/article/" + id, {
        type:"PUT",
        data: newSavedState
    }).then(() => {
        console.log("Changed saved to" + newSavedState.saved);
        location.reload();
    }
    );
}