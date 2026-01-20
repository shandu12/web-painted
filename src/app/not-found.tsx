'use client'
import Button from "@/components/button"

const ErrorPage = () => (
    <section >
      <div className="container pt-6">
        <h1 className="main-title">Error 404</h1>
        <p className="mb-4">Woops. Looks like this page doesn't exist</p>
        <Button background="bg-tertiary" onClick={() => window.location.href = '/'} >
          Go to home
        </Button>
      </div>
    </section>
);

export default ErrorPage;
