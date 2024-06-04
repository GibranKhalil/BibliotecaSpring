import { ComponentProps } from 'react'
import styles from './buttons.module.scss'

interface ButtonProps extends ComponentProps<'button'> {

}

export const Button = ({ children, className }: ButtonProps) => {
    return (
        <button className={`${className} ${styles.simpleButton}`}>
            {children}
        </button>
    )
}