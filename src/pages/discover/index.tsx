import { LucideSearch } from 'lucide-react'
import styles from './discover.module.scss'
import { Button } from '@/interface/components/buttons'

export const DiscoverPage = () => {
    return (
        <main className={styles.main}>
            <h1 className={styles['main__title']}>Procure pelo nome do livro, autor  ou gênero</h1>
            <div>
                <article className={styles.input}>
                    <i><LucideSearch /></i>
                    <input placeholder='Pesquise aqui...' />
                </article>
                <Button>Pesquisar</Button>
            </div>
        </main>
    )
}