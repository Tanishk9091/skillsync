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
    const heroSearchBtn = document.querySelector('.hero #g-btn');
    const jobsSection = document.querySelector('.jobs');
    const jobListItems = document.querySelectorAll('.jobs-container .jlist');

    // The main function that filters jobs based on BOTH category and search term
    const masterFilter = () => {
        const activeTab = document.querySelector('.job-filter-horizontal .active');
        if (!activeTab) return;

        // Homepage tabs use data-target (e.g., all, freelancer, fullTime, partTime)
        const activeCategory = (activeTab.getAttribute('data-target') || 'all').toLowerCase();
        const searchTerm = (searchBar && searchBar.value ? searchBar.value : '').toLowerCase();

        jobListItems.forEach(job => {
            // Job cards use data-item (e.g., fulltime, freelancer, partTime)
            const jobCategory = (job.getAttribute('data-item') || '').toLowerCase();
            const jobTitle = (job.querySelector('h3')?.textContent || '').toLowerCase();

            const categoryMatch = activeCategory === 'all' || activeCategory === jobCategory;
            const searchMatch = jobTitle.includes(searchTerm);

            job.style.display = categoryMatch && searchMatch ? 'flex' : 'none';
        });
    };

    // Event listener for the filter tabs (Recent, Full time, etc.)
    if (filterTabs) {
        filterTabs.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const currentActive = document.querySelector('.job-filter-horizontal .active');
                if (currentActive) currentActive.classList.remove('active');
                e.target.classList.add('active');
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
            searchBar.value = heroSearchBar.value;
            masterFilter();
        });
    }

    if (heroSearchBtn && searchBar) {
        heroSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (heroSearchBar) {
                searchBar.value = heroSearchBar.value;
            }
            masterFilter();
            if (jobsSection) {
                jobsSection.scrollIntoView({ behavior: 'smooth' });
            }
            searchBar.focus();
        });
    }

    // Initial run to sync UI with default active tab and any prefilled search
    masterFilter();
});