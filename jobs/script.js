const sortBtns = document.querySelectorAll(".job-id > *");
const sortItems = document.quesrySelectorAll(".jobs-container > *")


sortBtns.forEacg((btn) => {
    btn.addEventListener("click",() => {
        sortBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        const targetData = btn.getAttribute("data-target");

        sortItems.forEach((item) => {
            item.classList.add("delete");
            if(item.getAttribute("data-item") === targetData || targetData === "all"){
                item.classList.remove("delete");


            }
        });
    });
});