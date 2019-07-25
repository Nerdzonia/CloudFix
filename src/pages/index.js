import PageLayout from '../components/layout/page'

const style = {
    content: {
        textAlign: 'center',
        padding: 15
    }
}

const Index = () => (
    <PageLayout>
        <div style={style.content}>
            <h1>Hello World!</h1>
            <a href='https://nextjs.org/' target='_blank'>Learn more Next</a>
        </div>
    </PageLayout>
)

export default Index;