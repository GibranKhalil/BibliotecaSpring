import { ComponentProps } from "react"
import styles from './genericCard.module.scss'

interface GenericCardProps extends ComponentProps<"article"> {
    title: string
    redirectRoute?: string
}

export const GenericCard = ({ redirectRoute, title, children }: GenericCardProps) => {
    return (
        <article className={styles.genericCard}>
            <header>
                <h2>{title}</h2>
                {redirectRoute &&
                    <small>
                        Ver mais
                    </small>
                }
            </header>
            {children}
        </article>
    )
}