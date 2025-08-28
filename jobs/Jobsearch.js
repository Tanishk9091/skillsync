const categories = Array.from(jCategory);

// Search bar logic
document.getElementById("searchBar").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter((item) =>
        item.title.toLowerCase().includes(searchData)
    );
    displayItems(filterData);
});

const displayItems = (items) => {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = "";

    items.forEach((item) => {
        const { index, image, title, rate, av } = item;

        const jobLink = document.createElement("a");
        jobLink.href = `jobs/jobs-detail.html?id=${index}`;
        
        jobLink.style.textDecoration = 'none';
        jobLink.style.color = 'inherit';

        const jList = document.createElement("div");
        jList.className = "jList";
        jList.innerHTML = `
            <img src="${image}" alt="${title} logo">
            <div>
              <h3>${title}</h3>
              <p>${rate}</p>
            </div>
            <span id="key">${av}</span>
        `;
        
        jobLink.appendChild(jList);

        rootElement.appendChild(jobLink);
    });
};

displayItems(categories);