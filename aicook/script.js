class AICookApp {
    constructor() {
        this.apiKey = localStorage.getItem('geminiApiKey') || '';
        this.initializeElements();
        this.bindEvents();
        this.loadApiKey();
    }

    initializeElements() {
        this.apiKeyInput = document.getElementById('apiKey');
        this.saveApiKeyBtn = document.getElementById('saveApiKey');

        this.ingredientsInput = document.getElementById('ingredients');
        this.dietarySelect = document.getElementById('dietary');
        this.cuisineSelect = document.getElementById('cuisine');
        this.generateBtn = document.getElementById('generateRecipe');

        this.loading = document.getElementById('loading');
        this.recipeSection = document.getElementById('recipeSection');
        this.recipeContent = document.getElementById('recipeContent');                                           
    }

    bindEvents() {
        this.saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.generateBtn.addEventListener('click', () => this.generateRecipe());

        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveApiKey();
            }
        })
        
        this.ingredientsInput.addEventListener('keypress', (e) => {
            if ((e.key == 'Enter' || e.key == '\n') && e.ctrlKey)
                this.generateRecipe();
        });

    }
    
    loadApiKey() {
        if (this.apiKey) {
            this.apiKeyInput.value = this.apiKey;
            this.updateApiKeyStatus(true);
        }
    }

    updateApiKeyStatus(valid) {
        const btn = this.saveApiKeyBtn;
        if (isvalid) {
            btn.textContent = 'Saved ✔️';
            btn.style.background = '#28a745';
        } else {
            btn.textContent = 'Save';
            btn.style.background = '#dc3545';
        }
    }       

    saveApiKey() {
        const apiKey = this.apiKeyInput.value.trim();
        if (!apiKey) {
            this.showError('Please enter a valid API key.');
            return;
        }
        this.apiKey = apiKey;
        localStorage.setItem('geminiApiKey', apiKey);
        this.updateApiKeyStatus(true);
    }

    async generateRecipe() {
        if (!this.apiKey) {
            this.showError('Please save your API key first.');
            return;
        }

        const ingredients = this.ingredientsInput.value.trim();
        if (!this.ingedients) {
            this.showError('Please enter some ingredients.')
            return;
        }

        this.showLoading(true);
        this.hideRecipe();

        try {
            const recipe = await this.callGeminiAPI(ingredients);
            this.displayRecipe(recipe);
        }
        catch (error) {
            console.log('Error generating recipe:', error);
            this.showError('Failed to generate recipe. Please check your API key and try again.')
        } finally {
            this.showLoading(false);
        }
    }

    async callGeminiAPI(ingredients) {
        const dietary = this.dietarySelect.value;
        const cuisine = this.cuisineSelect.value;
        let prompt = `Create a detailed recipe using these ingredients: ${ingredients}`;
        if (dietary) {
            prompt += `Make it ${dietary}.`;
        }
        if (cuisine) {
            prompt += `The cuisine style should be ${cuisine}.`;
        }

        prompt += `
       
    Please format your response as follows:
    - recipe name
    - prep time
    - cook time
    - servings
    - ingredients (with quantities)
    - instructions (numbered steps)
    - tips (optional)
        
    Make sure the recipe is practical and delicious!`

    }

    showError(message){

    }

    showLoading(isLoading){

    }
    hideRecipe() {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AICookApp();
});