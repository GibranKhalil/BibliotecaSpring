import { ComponentProps } from 'react'
import styles from './buttons.module.scss'

interface ButtonProps extends ComponentProps<'button'> {

}

export const Button = ({ children, className, type = "submit", onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={`${className} ${styles.simpleButton}`}>
            {children}
        </button>
    )
}