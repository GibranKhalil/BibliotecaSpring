import { Book, Bookmark, Home } from "lucide-react"
import styles from './sidebar.module.scss'
import { useLocation, useNavigate } from "react-router-dom"
import classNames from "classnames"

const sidebarOptions = [
    {
        text: 'Início',
        render: '/',
        icon: <Home />
    },
    {
        text: 'Descobrir',
        render: '/discover',
        icon: <Book />,
    },
    {
        text: 'Meus livros',
        render: '/books',
        icon: <Bookmark />
    }
]


export const Sidebar = () => {
    const navigateTo = useNavigate();
    const location = useLocation().pathname
    return (
        <aside className={styles.sidebar}>
            <ul>
                {sidebarOptions.map((option, index) => (
                    <li onClick={() => navigateTo(option.render)} className={classNames(styles['sidebar__option'], { [styles['sidebar__option--selected']]: location === option.render })} key={index}>
                        <i>{option.icon}</i>
                        <p>{option.text}</p>
                    </li>
                ))}
            </ul>
        </aside>
    )
}