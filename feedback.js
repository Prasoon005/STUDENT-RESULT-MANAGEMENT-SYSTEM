document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const confirmation = document.querySelector(".confirmation");
    const feedbackList = document.getElementById("feedback-list");

    // Submit Feedback
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value || "Anonymous";
        const email = document.getElementById("email").value || "Not Provided";
        const rating = document.getElementById("rating").value;
        const comments = document.getElementById("comments").value || "No comments provided";

        const feedback = {
            name: name,
            email: email,
            rating: rating,
            comments: comments
        };

        let feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];
        feedbackData.push(feedback);
        localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

        // Hide the form and show confirmation
        form.style.display = "none";
        confirmation.style.display = "block";
        displayFeedbacks();
    });

    // Display Feedback
    function displayFeedbacks() {
        const feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];
        feedbackList.innerHTML = '';

        if (feedbackData.length === 0) {
            feedbackList.innerHTML = "<p>No feedback available.</p>";
        } else {
            feedbackData.forEach((feedback, index) => {
                const feedbackItem = document.createElement('div');
                feedbackItem.classList.add('feedback-item');
                feedbackItem.innerHTML = `
                    <p class="name">Name: ${feedback.name}</p>
                    <p class="email">Email: ${feedback.email}</p>
                    <p class="rating">Rating: ${feedback.rating}</p>
                    <p class="comments">Comments: ${feedback.comments}</p>
                `;
                feedbackList.appendChild(feedbackItem);
            });
        }
    }

    // Call displayFeedbacks on page load to show existing feedbacks
    displayFeedbacks();
});
