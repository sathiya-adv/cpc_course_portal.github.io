let faqData = [];

// Load FAQ data
async function loadFAQData() {
    try {
        const response = await fetch('faq-data.json');
        const data = await response.json();
        faqData = data.faqs;
        displayFAQs(faqData);
    } catch (error) {
        console.error('Error loading FAQ data:', error);
    }
}

// Display FAQs
function displayFAQs(faqs) {
    const container = document.getElementById('faqResults');
    container.innerHTML = '';
    
    faqs.forEach(faq => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        faqElement.innerHTML = `
            <div class="faq-question" onclick="toggleAnswer(${faq.id})">
                ${faq.question}
                <span class="category-tag">[${faq.category}]</span>
            </div>
            <div class="faq-answer" id="answer-${faq.id}">
                ${faq.answer}
            </div>
        `;
        container.appendChild(faqElement);
    });
}

// Toggle answer visibility
function toggleAnswer(id) {
    const answer = document.getElementById(`answer-${id}`);
    answer.classList.toggle('show');
}

// Search functionality
function searchFAQ() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredFAQs = faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
    displayFAQs(filteredFAQs);
}

// Filter by category
function filterByCategory(category) {
    const filteredFAQs = category === 'all' ? 
        faqData : 
        faqData.filter(faq => faq.category === category);
    displayFAQs(filteredFAQs);
}

// Add new question (for future AI integration)
function addNewQuestion() {
    const question = document.getElementById('newQuestion').value;
    if (question.trim()) {
        alert('Thank you for your question! It will be reviewed and added to our FAQ database.');
        document.getElementById('newQuestion').value = '';
    }
}

// Generate new FAQ using AI (placeholder for future integration)
function generateNewFAQ() {
    const topic = prompt("Enter a CPC topic to generate FAQs for (e.g., 'res judicata', 'appeal process'):");
    if (topic) {
        alert(`Generating FAQs for "${topic}". This feature will use AI to create relevant questions and answers.`);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadFAQData);
