import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
function Pagination() {
    return (
        <>
            <div className="lg:flex justify-end hidden ">
                <nav aria-label="Page navigation example">
                    <ul className="flex list-reset pl-0 rounded">
                        <li className="page-item">
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </li>
                        <li className="page-item "><a className="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200 " href="/#">1</a></li>
                        <li className="page-item "><a className="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200" href="/#">2</a></li>
                        <li className="page-item "><a className="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200" href="/#">3</a></li>
                        <li className="page-item "><a className="relative block py-2 px-3 -ml-px leading-normal text-blue bg-white border border-gray-200 no-underline hover:text-blue-800 hover:bg-gray-200" href="/#">...</a></li>
                        <li className="page-item">
                            <FontAwesomeIcon icon={faAngleRight} />
                        </li>
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default Pagination
