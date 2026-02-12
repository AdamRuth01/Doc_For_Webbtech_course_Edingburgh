// Quote API Integration
// Fetches quotes from quotable.io API for dynamic hints/messages

const QuoteAPI = {
    // Cache for quotes to avoid excessive API calls
    cache: [],
    cacheSize: 5,

    // Fetch a random quote from quotable.io
    async fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const quote = {
                text: data.content,
                author: data.author,
                timestamp: Date.now()
            };
            
            // Add to cache
            this.cache.push(quote);
            if (this.cache.length > this.cacheSize) {
                this.cache.shift(); // Remove oldest
            }
            
            return quote;
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Return fallback quote
            return {
                text: "Keep going! You're doing great!",
                author: "Escape Room Game",
                timestamp: Date.now()
            };
        }
    },

    // Get a random quote (from cache if available, otherwise fetch)
    async getQuote(useCache = true) {
        // If cache has quotes and we want to use cache, return random from cache
        if (useCache && this.cache.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.cache.length);
            return this.cache[randomIndex];
        }
        
        // Otherwise fetch new quote
        return await this.fetchQuote();
    },

    // Get formatted quote string
    async getFormattedQuote() {
        const quote = await this.getQuote();
        return `"${quote.text}" - ${quote.author}`;
    },

    // Get quote for achievement/hint display
    async getHintQuote() {
        const quote = await this.getQuote();
        return {
            message: quote.text,
            author: quote.author
        };
    },

    // Clear cache
    clearCache() {
        this.cache = [];
    }
};
