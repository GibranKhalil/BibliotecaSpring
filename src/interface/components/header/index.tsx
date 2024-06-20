import springLogo from '@/assets/logo.png'
import styles from './header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles['header__nav']}>
                <img src={springLogo} alt='Logo do spring' />
                <article className={styles['header__avatar']}>
                    <div>
                        <p>Aluno @IFSP</p>
                        <small>0 Livros</small>
                    </div>
                    <img src='https://github.com/talesviana.png' />
                </article>
            </nav>
        </header>
    )
}