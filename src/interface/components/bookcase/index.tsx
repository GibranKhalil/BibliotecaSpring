import { ComponentProps, useState } from 'react'
import styles from './bookcase.module.scss'
import { NormalBookCarrousel } from '../bookCarrousel'
import { ChevronDown, ChevronUp } from 'lucide-react'
import classNames from 'classnames'
import { BookGet } from '@/data/services/livroService'
import { limitText } from '@/data/utils'

interface BookCaseProps extends ComponentProps<"article"> {
    bookCaseId: number
    title: string
    bookCaseItems: BookGet[]
    description: string
}

export const BookCase = ({ title, bookCaseItems, bookCaseId, description }: BookCaseProps) => {
    const [isExpanded, setExpanded] = useState<boolean>(false)
    return (
        <article className={classNames(styles.bookcase, { [styles.expanded]: isExpanded })}>
            <header>
                <div>
                    <h2>{title}</h2>
                    <small>{limitText(description, 100)}</small>
                </div>
                <i onClick={() => setExpanded(!isExpanded)}>{isExpanded ? <ChevronUp /> : <ChevronDown />}</i>
            </header>
            {isExpanded &&
                <NormalBookCarrousel books={bookCaseItems} />}
        </article>
    )
}