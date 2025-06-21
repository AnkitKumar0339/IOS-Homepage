document.addEventListener('DOMContentLoaded', () => {
    const toggleIcon = document.getElementById('toggleIcon');
    const rejectBtn = document.getElementById('rejectBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const cancelBtn = document.getElementById('cancelBtn');

    // Toggle for "Reject project" dropdown
    if (toggleIcon && rejectBtn) {
        toggleIcon.addEventListener('click', () => {
            rejectBtn.classList.toggle('show');
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!toggleIcon.contains(event.target) && !rejectBtn.contains(event.target)) {
                rejectBtn.classList.remove('show');
            }
        });
    }

    // Modal functionality for "Reject project"
    if (rejectBtn && modalOverlay && cancelBtn) {
        rejectBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'flex'; // Show modal
            rejectBtn.classList.remove('show'); // Hide dropdown when modal opens
        });

        cancelBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none'; // Hide modal
        });

        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                modalOverlay.style.display = 'none'; // Hide modal if clicked outside modal content
            }
        });
    }

    // Comment panel functionality (modified)
    const commentToggle = document.getElementById('commentToggle');
    const commentPanel = document.getElementById('commentPanel');
    const commentInput = document.getElementById('commentInput');
    const sendBtn = document.getElementById('sendBtn');
    const commentList = document.getElementById('commentList');

    // On small screens, the "+ Comment" button will toggle the panel
    if (commentToggle && commentPanel) {
        commentToggle.addEventListener('click', () => {
            // For smaller screens, we'll still toggle its visibility.
            // On desktop, it will always be visible due to CSS.
            if (window.innerWidth < 992) { // Use Bootstrap's 'lg' breakpoint
                commentPanel.classList.toggle('show-on-mobile');
            }
        });

        // Optional: Close panel if clicking outside on mobile (if needed)
        document.addEventListener('click', (event) => {
            if (window.innerWidth < 992 && commentPanel.classList.contains('show-on-mobile')) {
                if (!commentToggle.contains(event.target) && !commentPanel.contains(event.target)) {
                    commentPanel.classList.remove('show-on-mobile');
                }
            }
        });
    }

    // New Comment Submission
    if (sendBtn && commentInput && commentList) {
        const addComment = () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const newCommentItem = document.createElement('li');
                newCommentItem.classList.add('comment-item');
                newCommentItem.innerHTML = `
                    <img src="https://i.pravatar.cc/64?img=${Math.floor(Math.random() * 70) + 1}" alt="">
                    <div class="comment-body">
                        <p class="comment-text">${commentText}</p>
                        <span class="comment-meta">Just now</span>
                    </div>
                `;
                commentList.prepend(newCommentItem); // Add new comment to the top
                commentInput.value = ''; // Clear input
            }
        };

        sendBtn.addEventListener('click', addComment);
        commentInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addComment();
            }
        });
    }
});