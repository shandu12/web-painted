"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginSuccessfulPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 2000); // Redirect after 2 seconds

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="container flex flex-col items-center min-h-screen">
            <h1 className="main-title mt-6">Login Successful!</h1>
            <p>Redirecting to home...</p>
        </div>
    );
}