import Link from 'next/link';

const AllCateSub = ({ sub1, sub2, sub3 }) => {
    return (
        <>
            <li className="header__mega-root col">
                <div className="header__submenu">
                    <ul>
                        {sub1.map((links, index) => {
                            return (
                                <li
                                    key={index}
                                    className="header__mega-root-child col"
                                >
                                    <div className="header__submenu-child">
                                        <div className="linklist-title">
                                            <Link href={links.url}>
                                                {links.name}
                                            </Link>
                                        </div>
                                        {undefined !== links.subItems ? (
                                            <ul>
                                                {links.subItems.map((subLinks, index) => (
                                                    <li key={index} className="level1-menu">
                                                        <Link href={subLinks.url}>
                                                            {subLinks.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </li>
            <li className="header__mega-root col">
                <div className="header__submenu">
                    <ul>
                        {sub2.map((links, index) => {
                            return (
                                <li
                                    key={index}
                                    className="header__mega-root-child col"
                                >
                                    <div className="header__submenu-child">
                                        <div className="linklist-title">
                                            <Link href={links.url}>
                                                {links.name}
                                            </Link>
                                        </div>
                                        {undefined !== links.subItems ? (
                                            <ul>
                                                {links.subItems.map((subLinks, index) => (
                                                    <li key={index} className="level1-menu">
                                                        <Link href={subLinks.url}>
                                                            {subLinks.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </li>
            <li className="header__mega-root col">
                <div className="header__submenu">
                    <ul>
                        {sub3.map((links, index) => {
                            return (
                                <li
                                    key={index}
                                    className="header__mega-root-child col"
                                >
                                    <div className="header__submenu-child">
                                        <div className="linklist-title">
                                            <Link href={links.url}>
                                                {links.name}
                                            </Link>
                                        </div>
                                        {undefined !== links.subItems ? (
                                            <ul>
                                                {links.subItems.map((subLinks, index) => (
                                                    <li key={index} className="level1-menu">
                                                        <Link href={subLinks.url}>
                                                            {subLinks.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </li>
        </>
    )
}

export default AllCateSub;