// Professional Loading System for SPA-like Navigation
document.addEventListener('DOMContentLoaded', function() {
    let loadingTimeout;
    
    // Show loading on navigation start
    document.addEventListener('livewire:navigating', function() {
        showLoading('Navigating...', 'minimal');
    });
    
    // Hide loading on navigation complete
    document.addEventListener('livewire:navigated', function() {
        hideLoading();
    });
    
    // Show loading on form submissions
    document.addEventListener('livewire:submit', function() {
        showLoading('Processing...', 'minimal');
    });
    
    // Hide loading on form complete
    document.addEventListener('livewire:submitted', function() {
        hideLoading();
    });
    
    // Global loading functions
    window.showLoading = function(text = 'Loading...', type = 'default') {
        // Clear any existing timeout
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
        }
        
        // Dispatch to Livewire component
        if (typeof Livewire !== 'undefined') {
            Livewire.dispatch('show-loading', {
                text: text,
                type: type
            });
        }
        
        // Auto-hide after 5 seconds as fallback
        loadingTimeout = setTimeout(() => {
            hideLoading();
        }, 5000);
    };
    
    window.hideLoading = function() {
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
        }
        
        if (typeof Livewire !== 'undefined') {
            Livewire.dispatch('hide-loading');
        }
    };
    
    // Page load loading effect
    window.addEventListener('load', function() {
        // Show initial loading for first page load
        if (document.readyState === 'complete') {
            showLoading('Welcome!', 'page-transition');
            
            // Hide after a short delay
            setTimeout(() => {
                hideLoading();
            }, 1500);
        }
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        showLoading('Loading page...', 'minimal');
    });
    
    // Handle link clicks for smooth navigation
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (link && !link.hasAttribute('wire:navigate')) {
            // Only show loading for external links or non-Livewire links
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                showLoading('Loading...', 'minimal');
            }
        }
    });
});

// Professional loading animations
const loadingAnimations = {
    // Canva-style loading
    canva: function() {
        return `
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-white">
                <div class="text-center">
                    <div class="relative mx-auto mb-6">
                        <div class="w-16 h-16 bg-gradient-to-tl from-purple-600 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center animate-pulse">
                            <div class="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div class="absolute -top-2 -left-2 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                        <div class="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-75" style="animation-delay: 0.5s;"></div>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Loading</h3>
                    <p class="text-sm text-gray-500">Please wait...</p>
                </div>
            </div>
        `;
    },
    
    // Professional app loading
    professional: function() {
        return `
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm">
                <div class="text-center">
                    <div class="relative mx-auto mb-6">
                        <div class="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-purple-600"></div>
                        <div class="absolute top-2 left-2 w-8 h-8 border-4 border-gray-100 rounded-full animate-spin border-t-pink-500" style="animation-direction: reverse; animation-duration: 0.8s;"></div>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-700 mb-2">Loading</h3>
                    <div class="w-48 mx-auto h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse" style="width: 0%; animation: progress 2s ease-in-out infinite;"></div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Export for use in other scripts
window.loadingAnimations = loadingAnimations;
