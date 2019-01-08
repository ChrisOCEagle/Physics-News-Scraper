var modal = $(".comment-modal"),
    modalBtn = $("#comment-modal-trigger");

modalBtn.on("click", function(event) {
    event.preventDefault();
    // grab and empty the comments section
    let comments = $(".comments");
    //comments.empty();
    // grab the modal
    let modal = $(".comment-modal");
    // show the modal
    showModal(modal);
    alert("The button works!");
//         // save the article's id
//         id = $(this).attr("data-id");

//     // make the ajax call for the article
//     $.getJSON("/articles/" + id, function(data) {
//         console.log(data);
//         var p = "<p>" + data.note.body + "</p>",
//             btn = "<button class='btn btn-danger' data-id='";
//             btn += data._id + "' id='delete-note'>&times;</button>";
//         if (data.note) {
//             comments.append(p + btn);
//         }
//         modal.toggleClass("show-modal");
//     });
});

$(".close-button").on("click", function() {
    showModal(modal);
});

// when the save comment button is clicked
modal.on("click", "#save-comment", function() {
    // grab the id associated with the article from the submit button
    var id = $(this).attr("data-id");
    // run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            body: $("#Article-Comment").val()
        }
    }).then(function(data) {
        console.log(data);
        showModal(modal);
    })
});


function showModal(modal) {
    modal.toggleClass(".show-modal");
};