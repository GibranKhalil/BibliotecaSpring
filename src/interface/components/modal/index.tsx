import { ComponentProps } from "react"
import styles from './modal.module.scss'
import { X } from "lucide-react"
import { Button } from "../buttons"

export interface GenericModal extends ComponentProps<"dialog"> {
    title: string
    onCancel: () => void
    onSubmit: () => void
}

export const GenericModal = ({ title, onCancel, children, onSubmit }: GenericModal) => {

    return (
        <section className={styles.container}>
            <div onClick={onCancel} className={styles.overlay}></div>
            <dialog open className={styles.dialog}>
                <header className={styles['dialog-header']}>
                    <h2 data-testid="titleModal">{title}</h2>
                    <X onClick={onCancel} />
                </header>
                {children}
                <footer>
                    <Button onClick={onCancel}>Cancelar</Button>
                    <Button onClick={onSubmit}>Confirmar</Button>
                </footer>
            </dialog>
        </section>
    )
}