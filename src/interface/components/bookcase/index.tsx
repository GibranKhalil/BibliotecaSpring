import { ComponentProps, useState } from 'react'
import styles from './bookcase.module.scss'
import { CarrouselItems, NormalBookCarrousel } from '../bookCarrousel'
import { ChevronDown, ChevronUp } from 'lucide-react'
import classNames from 'classnames'

interface BookCaseProps extends ComponentProps<"article"> {
    title: string
    bookCaseItems: CarrouselItems[]
}

export const BookCase = ({ title, bookCaseItems }: BookCaseProps) => {
    const [isExpanded, setExpanded] = useState<boolean>(false)
    return (
        <article className={classNames(styles.bookcase, { [styles.expanded]: isExpanded })}>
            <header>
                <h2>{title}</h2>
                <i onClick={() => setExpanded(!isExpanded)}>{isExpanded ? <ChevronUp /> : <ChevronDown />}</i>
            </header>
            {isExpanded &&
                <NormalBookCarrousel items={bookCaseItems} />}
        </article>
    )
}