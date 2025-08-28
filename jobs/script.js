document.addEventListener('DOMContentLoaded', () => {
            
    // --- 1. NAVBAR LOGIN/LOGOUT LOGIC ---
    const menu = document.getElementById('menu');
    const updateNavbar = () => {
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        const registerButton = document.querySelector('#w-btn');
        if (loggedInUserEmail && registerButton) {
            const registerLi = registerButton.parentElement;
            const username = loggedInUserEmail.split('@')[0];
            const welcomeText = document.createElement('li');
            welcomeText.innerHTML = `<span class="nav-username">Hi, ${username}</span>`;
            const logoutLink = document.createElement('li');
            logoutLink.innerHTML = `<a href="#" id="logout-btn">Logout</a>`;
            menu.insertBefore(welcomeText, registerLi);
            menu.insertBefore(logoutLink, registerLi);
            registerLi.remove();
        }
    };

    if (menu) {
        menu.addEventListener('click', (e) => {
            if (e.target.id === 'logout-btn') {
                e.preventDefault();
                localStorage.removeItem('loggedInUserEmail');
                alert('You have been logged out.');
                window.location.href = 'login.html';
            }
        });
    }
    
    updateNavbar(); // Run on page load

    // --- 2. JOB FILTERING AND SEARCH LOGIC ---
    const filterTabs = document.querySelector('.job-filter-horizontal');
    const searchBar = document.getElementById('searchBar');
    const heroSearchBar = document.getElementById('hero-search-input');
    const jobListItems = document.querySelectorAll('.jobs-container .jlist');

    // The main function that filters jobs based on BOTH category and search term
    const masterFilter = () => {
        const activeTab = document.querySelector('.job-filter-horizontal .active');
        // If the filter tabs don't exist on the page, exit the function
        if (!activeTab) return; 

        const activeCategory = activeTab.getAttribute('data-filter');
        const searchTerm = searchBar.value.toLowerCase();

        jobListItems.forEach(job => {
            const jobCategory = job.getAttribute('data-category');
            const jobTitle = job.querySelector('h3').textContent.toLowerCase();

            // Condition 1: Check if the category matches (or if "all" is selected)
            const categoryMatch = activeCategory === 'all' || activeCategory === jobCategory;
            
            // Condition 2: Check if the job title includes the search term
            const searchMatch = jobTitle.includes(searchTerm);

            // Show the job only if BOTH conditions are true
            if (categoryMatch && searchMatch) {
                job.style.display = 'flex';
            } else {
                job.style.display = 'none';
            }
        });
    };

    // Event listener for the filter tabs (Recent, Full time, etc.)
    if (filterTabs) {
        filterTabs.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                // Update active class
                document.querySelector('.job-filter-horizontal .active').classList.remove('active');
                e.target.classList.add('active');
                // Run the filter
                masterFilter();
            }
        });
    }

    // Event listener for the main search bar (as you type)
    if (searchBar) {
        searchBar.addEventListener('keyup', masterFilter);
    }

    // Event listener to sync the hero search bar with the main one
    if (heroSearchBar && searchBar) {
        heroSearchBar.addEventListener('keyup', () => {
            searchBar.value = heroSearchBar.value; // Copy text
            masterFilter(); // Run the filter
        });
    }
});