export default ({ currentPage, pageSize, totalPages }, length) => {
    if (page.pagination) {
        const previousPage = page.previousPage(currentPage);
        const nextPage = page.nextPage(currentPage, totalPages);
        const link = page.getLink();
        const pages = page.getPages(currentPage, totalPages, length || 5);

        const template =
            `<ul class="pagination justify-content-end">
                <li class="page-item ${page.disablePreviousPage(currentPage)}">
                    <a class="page-link" href="${link}&page=${previousPage}&size=${pageSize}"><span aria-hidden="true">&laquo;</span></a>
                </li>
                ${pages.map(pg => `<li class="page-item ${page.disableCurrentPage(currentPage, pg)}">
                                        <a class="page-link" href="${link}&page=${pg}&size=${pageSize}">${pg}</a></li>`).join('')}               
                <li class="page-item ${page.disableNextpage(pages, totalPages)}">
                    <a class="page-link" href="${link}&page=${nextPage}&size=${pageSize}"><span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>`
        page.pagination.innerHTML = template;
    };
}

const page = {
    pagination: document.getElementById('pagination'),
    previousPage: currentPage => currentPage > 1 ? (currentPage - 1) : currentPage,
    nextPage: (currentPage, totalPages) => currentPage < totalPages ? (currentPage + 1) : totalPages,
    disablePreviousPage: currentPage => currentPage == 1 ? "disabled" : "",
    disableNextpage: (pages, totalPages) => pages.includes(totalPages) ? "disabled" : "",
    disableCurrentPage: (currentPage, page) => page == currentPage ? "disabled" : "",
    getLink: () => {
        const regex = new RegExp(/&page=\d+&size=\d+/g);
        return `${window.location.pathname}${window.location.search.replace(regex, '')}`;
    },
    getPages: (currentPage, totalPages, length) => currentPage + length >= totalPages ?
        Array.from({ length }, (_, index) => totalPages - index).reverse().filter(x => x > 0) :
        Array.from({ length }, (_, index) => index + currentPage),
}