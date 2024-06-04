import { Button } from "@/interface/components/buttons"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import styles from './carrousel.module.scss'
import { limitText } from "@/data/utils"
import classNames from "classnames"

export type CarrouselItems = {
    title: string
    description: string
    urlImg: string
}

interface BookCarrouselProps {
    items: CarrouselItems[]
}

export const BookBannerCarrousel = ({ items }: BookCarrouselProps) => {
    const carrousel = useRef<HTMLDivElement | null>(null)
    const [itemIndex, setItemIndex] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 0);
        return () => clearTimeout(timer);
    }, [itemIndex]);

    const handleNext = () => {
        setAnimated(false)
        setItemIndex((prevState) => Math.min(prevState + 1, items.length - 1))
    }

    const handlePrev = () => {
        setAnimated(false)
        setItemIndex((prevState) => Math.max(prevState - 1, 0))
    }
    return (
        <article className={styles.carrousel}>
            <div className={styles['carrousel__text']}>
                <div>
                    <h2>{items[itemIndex].title}</h2>
                    <p>
                        {limitText(items[itemIndex].description, 300)}
                    </p>
                </div>
                <Button>Continue Lendo</Button>
            </div>
            <div className={styles['carrousel__container']}>
                <div ref={carrousel} className={styles['carrousel__content']}>
                    <img className={classNames({ [styles.animated]: animated })} src={items[itemIndex].urlImg} alt={`Imagem ${itemIndex} do carrousel`} />
                    <div>
                        {Array.from(items).map((_, idx) => (
                            <div className={classNames({ [styles['carrousel__content__dotsSelected']]: idx === itemIndex })} onClick={() => setItemIndex(idx)}></div>
                        ))}
                    </div>
                </div>
                {itemIndex != items.length - 1 &&
                    <button className={styles['carrousel__container__rightBtn']} onClick={() => handleNext()}>
                        <ArrowRight />
                    </button>}
                {itemIndex != 0 &&
                    <button className={styles['carrousel__container__leftBtn']} onClick={() => handlePrev()}>
                        <ArrowLeft />
                    </button>}
            </div>
        </article>
    )
}

export const NormalBookCarrousel = ({ }) => {
    return (
        <article>

        </article>
    )
}