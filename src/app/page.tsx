// domain.co.il

export const metadata = {
    title: 'Home | Next.js Tutorial',
    description: 'Home description | Next.js Tutorial',
}

export const dynamic = 'force-static';

export default function HomePage() {
    return (
        <>
            <header>
                <h1>Home Page</h1>
            </header>
        </>
    )
}
