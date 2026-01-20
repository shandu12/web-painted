'use client'
import Button from "@/components/button"

const ErrorPage = () => (
    <section >
      <div className="container pt-6">
        <h1 className="main-title">Error</h1>
        <p className="mb-4">Woops. Looks like there has been an error.</p>
        <Button background="bg-tertiary" onClick={() => window.location.href = '/'} >
          Go to home
        </Button>
      </div>
    </section>
);

export default ErrorPage;
