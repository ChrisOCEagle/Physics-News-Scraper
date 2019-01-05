const modal = $(".comment-modal");

$("#comment-modal-trigger").on("click", event => {
    event.preventDefault();
    modal.addClass("show-modal");
});

$(".close-button").on("click", event => {
    event.preventDefault();
    modal.toggleClass("show-modal");
});
