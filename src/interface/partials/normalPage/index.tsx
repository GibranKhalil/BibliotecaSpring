import { Outlet } from "react-router-dom"
import { Header } from "../../components/header"
import { Sidebar } from "../../components/sidebar"
import styles from './normalPage.module.scss'

export const NormalPage = () => {
    return (
        <section className={styles.mainContainer}>
            <Header />
            <div className={styles['mainContainer__content']}>
                <Sidebar />
                <Outlet />
            </div>
        </section>
    )
}