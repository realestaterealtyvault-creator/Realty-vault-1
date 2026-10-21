/**
 * Realty Vault - Property Search & Filter Engine
 * Handles real-time filtering by Location, Property Type, and Budget.
 * Fully optimized for Mobile & Desktop.
 */

function selectPropertyTypeSegment(type) {
    var typeSelect = document.getElementById('searchPropertyType');
    if (typeSelect) {
        typeSelect.value = type;
    }
    syncSegmentButtons(type);
    executePropertySearch(false);
}

function syncSegmentButtons(activeType) {
    var buttons = document.querySelectorAll('.type-segment-btn');
    buttons.forEach(function(btn) {
        if (btn.getAttribute('data-type') === activeType) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });
}

function executePropertySearch(shouldScroll) {
    var locSelect = document.getElementById('searchLocation');
    var typeSelect = document.getElementById('searchPropertyType');
    var budgetSelect = document.getElementById('searchBudget');
    
    if (!locSelect || !typeSelect || !budgetSelect) return;
    
    var selectedLoc = (locSelect.value || 'all').toLowerCase().trim();
    var selectedType = (typeSelect.value || 'all').toLowerCase().trim();
    var selectedBudget = (budgetSelect.value || 'all').toLowerCase().trim();
    
    // Keep segment buttons in sync
    syncSegmentButtons(selectedType);
    
    var grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    var cards = grid.querySelectorAll('.property-card');
    var matchCount = 0;
    
    cards.forEach(function(card) {
        var cardLoc = (card.getAttribute('data-location') || '').toLowerCase();
        var cardType = (card.getAttribute('data-type') || '').toLowerCase();
        var cardBudget = (card.getAttribute('data-budget') || '').toLowerCase();
        
        // Exact token matching for comma-separated values
        var locTokens = cardLoc.split(',').map(function(s) { return s.trim(); });
        var budgetTokens = cardBudget.split(',').map(function(s) { return s.trim(); });
        
        var locMatch = (selectedLoc === 'all') || (locTokens.indexOf(selectedLoc) !== -1);
        var typeMatch = (selectedType === 'all') || (cardType === selectedType);
        var budgetMatch = (selectedBudget === 'all') || (budgetTokens.indexOf(selectedBudget) !== -1);
        
        if (locMatch && typeMatch && budgetMatch) {
            card.style.display = 'grid';
            card.classList.remove('search-match-animate');
            void card.offsetWidth; // Force CSS animation restart
            card.classList.add('search-match-animate');
            matchCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('search-match-animate');
        }
    });
    
    // Update Results Banner
    var banner = document.getElementById('searchResultsBanner');
    var countText = document.getElementById('resultsCountText');
    var activeTags = document.getElementById('activeFilterTags');
    var noResultsCard = document.getElementById('noSearchPropertiesCard');
    
    var isFiltered = (selectedLoc !== 'all' || selectedType !== 'all' || selectedBudget !== 'all');
    
    if (banner && countText) {
        if (isFiltered) {
            banner.style.display = 'block';
            countText.innerHTML = 'Showing <strong>' + matchCount + '</strong> ' + (matchCount === 1 ? 'property' : 'properties') + ' found';
            
            var tagsHtml = '';
            if (selectedLoc !== 'all' && locSelect.selectedIndex >= 0) {
                tagsHtml += '<span class="active-tag"><i class="bi bi-geo-alt-fill text-gold"></i> ' + locSelect.options[locSelect.selectedIndex].text + '</span>';
            }
            if (selectedType !== 'all' && typeSelect.selectedIndex >= 0) {
                tagsHtml += '<span class="active-tag"><i class="bi bi-building-fill text-gold"></i> ' + typeSelect.options[typeSelect.selectedIndex].text + '</span>';
            }
            if (selectedBudget !== 'all' && budgetSelect.selectedIndex >= 0) {
                tagsHtml += '<span class="active-tag"><i class="bi bi-cash-stack text-gold"></i> ' + budgetSelect.options[budgetSelect.selectedIndex].text + '</span>';
            }
            if (activeTags) activeTags.innerHTML = tagsHtml;
        } else {
            banner.style.display = 'none';
        }
    }
    
    if (noResultsCard) {
        noResultsCard.style.display = (matchCount === 0) ? 'block' : 'none';
    }
    
    if (shouldScroll) {
        var target = document.getElementById('hotProjectsSection');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function resetPropertySearch() {
    var locSelect = document.getElementById('searchLocation');
    var typeSelect = document.getElementById('searchPropertyType');
    var budgetSelect = document.getElementById('searchBudget');
    
    if (locSelect) locSelect.value = 'all';
    if (typeSelect) typeSelect.value = 'all';
    if (budgetSelect) budgetSelect.value = 'all';
    
    syncSegmentButtons('all');
    executePropertySearch(false);
}

function applyQuickFilter(loc, type, budget) {
    var locSelect = document.getElementById('searchLocation');
    var typeSelect = document.getElementById('searchPropertyType');
    var budgetSelect = document.getElementById('searchBudget');
    
    if (locSelect && loc) locSelect.value = loc;
    if (typeSelect && type) {
        typeSelect.value = type;
        syncSegmentButtons(type);
    }
    if (budgetSelect && budget) budgetSelect.value = budget;
    
    executePropertySearch(true);
}

// Initialise upon page load
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('propertySearchForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            executePropertySearch(true);
        });
    }
});
