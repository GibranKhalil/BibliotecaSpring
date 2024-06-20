import { Button } from "@/interface/components/buttons"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import styles from './carrousel.module.scss'
import { limitText } from "@/data/utils"
import classNames from "classnames"
import { BookGet } from "@/data/services/livroService"
import { useNavigate } from "react-router-dom"


export const BookBannerCarrousel = ({ books }: { books: BookGet[] }) => {
    const carrousel = useRef<HTMLDivElement | null>(null)
    const [itemIndex, setItemIndex] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 0);
        return () => clearTimeout(timer);
    }, [itemIndex]);

    const handleNext = () => {
        setAnimated(false)
        setItemIndex((prevState) => Math.min(prevState + 1, books.length - 1))
    }

    const handlePrev = () => {
        setAnimated(false)
        setItemIndex((prevState) => Math.max(prevState - 1, 0))
    }
    return (
        <article className={styles.carrousel}>
            <div className={styles['carrousel__text']}>
                <div>
                    <h2>{books[itemIndex].titulo}</h2>
                    <p>
                        {limitText(books[itemIndex].resumo, 300)}
                    </p>
                </div>
                <Button>Continue Lendo</Button>
            </div>
            <div className={styles['carrousel__container']}>
                <div ref={carrousel} className={styles['carrousel__content']}>
                    <img className={classNames({ [styles.animated]: animated })} src={books[itemIndex].urlCapa} alt={`Imagem ${itemIndex} do carrousel`} />
                    <div>
                        {Array.from(books).map((_, idx) => (
                            <div key={idx} className={classNames({ [styles['carrousel__content__dotsSelected']]: idx === itemIndex })} onClick={() => setItemIndex(idx)}></div>
                        ))}
                    </div>
                </div>
                {itemIndex != books.length - 1 &&
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

export const NormalBookCarrousel = ({ books }: { books: BookGet[] }) => {
    const carrousel = useRef<HTMLDivElement | null>(null)


    function handleNext() {
        if (carrousel.current) {
            carrousel.current.scrollLeft += carrousel.current.offsetWidth
        }
    }

    function handlePrev() {
        if (carrousel.current) {
            carrousel.current.scrollLeft -= carrousel.current.offsetWidth
        }
    }

    const navigateTo = useNavigate();

    return (
        <article className={styles.normalCarrousel}>
            <div ref={carrousel}>
                {books.map((item, index) => ( //titulo=SomeTitle&autor=SomeAuthor
                    <img src={item.urlCapa} alt={`Capa do livro: ${item.titulo}`} key={index} onClick={() => navigateTo('/readbook',
                        {
                            state: {
                                title: item.titulo,
                                author: item.autor,
                                img: item.urlCapa,
                                gen: item.genero,
                                desc: item.resumo,
                                pages: item.qtdPagina,
                                id: item.id
                            }
                        }
                    )} />
                ))}
            </div>
            {books.length >= 5 &&
                <>
                    <button className={styles['carrousel__container__rightBtn']} onClick={() => handleNext()}>
                        <ArrowRight />
                    </button>
                    <button className={styles['carrousel__container__leftBtn']} onClick={() => handlePrev()}>
                        <ArrowLeft />
                    </button>
                </>}
        </article>
    )
}