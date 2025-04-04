document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:3002/api/contact/save_contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, mobile, email, message })
    });

    const result = await response.json();
    document.getElementById("responseMessage").innerText = result.message;

    // After submitting, refresh the displayed contact messages
    fetchContactMessages();
});

// ✅ Function to fetch and display submitted contact messages
async function fetchContactMessages() {
    try {
        const response = await fetch("http://localhost:3002/api/contact", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Failed to fetch contact messages");

        const data = await response.json();

        // ✅ Display messages in the bottom section
        const messagesContainer = document.getElementById("messagesContainer");
        messagesContainer.innerHTML = ""; // Clear old content

        if (data.length === 0) {
            messagesContainer.innerHTML = "<p>No messages submitted yet.</p>";
            return;
        }

        data.forEach(msg => {
            const div = document.createElement("div");
            div.classList.add("message-box"); // Add CSS class for styling
            div.innerHTML = `
                <p><strong>Name:</strong> ${msg.name}</p>
                <p><strong>Email:</strong> ${msg.email}</p>
                <p><strong>Mobile:</strong> ${msg.mobile}</p>
                <p><strong>Message:</strong> ${msg.message}</p>
                <hr>
            `;
            messagesContainer.appendChild(div);
        });

    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// ✅ Fetch messages when the page loads
document.addEventListener("DOMContentLoaded", fetchContactMessages);

