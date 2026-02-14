import Link from 'next/link';

const MenuSub = ({ sub }) => {
    return (
        <>
            {sub.map((links, index) => {
                return (
                    <li 
                        key={index}
                        className="header__mega-root col-3"
                    >
                        <div className="header__submenu">
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
        </>
    )
}

export default MenuSub;