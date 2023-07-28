/** Handles pagination for search results (1-20, 21-40, etc.) */
function Page ({ currentPage, pages, handlePage }) {
    return (
        <div>

            {/* If current page is 1, back button is not rendered */}
            {currentPage > 1 ?
                <button className="back"
                    onClick={() => handlePage((pages.prev || undefined), currentPage - 1)}
                >
                    back
                </button> : null
            }

            Page {currentPage}

            {/* If on the last page, next button is not rendered */}
            {pages.next ?
                <button className="forward" onClick={() => handlePage((pages.next || undefined), currentPage + 1)}>
                    forward
                </button> : null
            }

        </div>);
}
export default Page;