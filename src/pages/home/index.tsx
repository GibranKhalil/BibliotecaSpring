import { BookBannerCarrousel, CarrouselItems, NormalBookCarrousel } from '@/interface/components/bookCarrousel'
import styles from './home.module.scss'
import { GenericCard } from '@/interface/components/genericCard'

const imgArray: CarrouselItems[] = [
    {
        title: "É Assim que Acaba",
        description: "Em É assim que acaba , Colleen Hoover nos apresenta Lily, uma jovem que se mudou de uma cidadezinha do Maine para Boston, se formou em marketing e abriu a própria floricultura. E é em um dos terraços de Boston que ela conhece Ryle, um neurocirurgião confiante, teimoso e talvez até um pouco arrogante, com uma grande aversão a relacionamentos, mas que se sente muito atraído por ela. Quando os dois se apaixonam, Lily se vê no meio de um relacionamento turbulento que não é o que ela esperava. Mas será que ela conseguirá enxergar isso, por mais doloroso que seja? É assim que acaba é uma narrativa poderosa sobre a força necessária para fazer as escolhas certas nas situações mais difíceis. Considerada a obra mais pessoal de Hoover, o livro aborda sem medo alguns tabus da sociedade para explorar a complexidade das relações tóxicas, e como o amor e o abuso muitas vezes coexistem em uma confusão de sentimentos.",
        urlImg: "https://m.media-amazon.com/images/I/91r5G8RxqfL._SY466_.jpg"
    },
    {
        title: "O Poder do Hábito",
        description: "O livro investiga como os hábitos funcionam e como podem ser transformados. Duhigg explica que os hábitos são comportamentos automáticos que surgem da repetição e que são formados através de um ciclo de três etapas: a deixa, a rotina e a recompensa.",
        urlImg: "https://m.media-amazon.com/images/I/815iPX0SgkL._SY466_.jpg"
    },
    {
        title: "Me poupe!",
        description: "Como economizar no dia a dia? Como enfrentar crises econômicas com tranquilidade? Como poupar mesmo ganhando pouco? Quais são os melhores (e os piores) investimentos? Será que está na hora de investir em ações? Como poupar para o futuro sem abrir mão dos desejos e necessidades do presente? Sei que você tem muitas dúvidas sobre o que fazer com o seu dinheiro. Sei também que muita gente simplesmente não faz nada com ele – a não ser pagar contas e juntar moedinhas para chegar até o fim do mês.",
        urlImg: "https://m.media-amazon.com/images/I/91vs920yRxL._SY466_.jpg"
    },
    {
        title: "Um defeito de cor",
        description: "Vencedor do prestigioso Prêmio Casa de las Américas e incluído na lista da  Folha de S.Paulo  como o sétimo entre 200 livros mais importantes para entender o Brasil em seus 200 anos de independência,  Um defeito de cor  conta a saga de Kehinde, mulher negra que, aos oito anos, é sequestrada no Reino do Daomé, atual Benin, e trazida para ser escravizada na Ilha de Itaparica, na Bahia. No livro, Kehinde narra em detalhes a sua captura, a vida como escravizada, os seus amores, as desilusões, os sofrimentos, as viagens em busca de um de seus filhos e de sua religiosidade. Além disso, mostra como conseguiu a sua carta de alforria e, na volta para a África, tornou-se uma empresária bem-sucedida, apesar de todos os percalços e aventuras pelos quais passou. A personagem foi inspirada em Luísa Mahin, que teria sido mãe do poeta Luís Gama e participado da célebre Revolta dos Malês, movimento liderado por escravizados muçulmanos a favor da Abolição.",
        urlImg: "https://m.media-amazon.com/images/I/71xdtZUc5cL._SY466_.jpg"
    },
]

export const HomePage = () => {
    return (
        <main className={styles.main}>
            <section className={styles['main__header']}>
                <BookBannerCarrousel items={imgArray} />
                <GenericCard title='Livros salvos' redirectRoute='/rout'>

                </GenericCard>
            </section>
            <section className={styles['main__normalCarrousel']}>
                <h2>Baseado nos livros que você leu</h2>
                <NormalBookCarrousel items={imgArray} />
            </section>
        </main>
    )
}