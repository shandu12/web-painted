"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/store/reducers/user";
import { useDispatch } from "react-redux";

export default function LogoutSuccessfulPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutUser());
        const timer = setTimeout(() => {
            router.push("/");
        }, 2000); // Redirect after 2 seconds
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="container flex flex-col items-center min-h-screen">
            <h1 className="main-title mt-6">Logout Successful!</h1>
            <p>Redirecting to home...</p>
        </div>
    );
}

