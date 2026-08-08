import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    UserRound,
    LockKeyhole,
    UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

import { register } from "../api/authApi";

function RegisterPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();

        if (!name.trim() || !username.trim() || !password.trim()) {

            toast.error("Please fill in all fields");

            return;
        }

        if (password.length < 6) {

            toast.error("Password must contain at least 6 characters");

            return;
        }

        try {

            setIsLoading(true);

            const response = await register({
                name,
                username,
                password,
            });

            toast.success(
                response.message || "Account created successfully"
            );

            navigate("/login");

        } catch (error: any) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ??
                "Failed to create account"
            );

        } finally {

            setIsLoading(false);

        }
    };

    return (

        <div className="flex min-h-[calc(100vh-150px)] items-center justify-center bg-slate-50 px-6 py-16">

            <div className="w-full max-w-md">

                {/* Header */}

                <div className="mb-8 text-center">

                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">

                        <UserPlus
                            size={27}
                            className="text-white"
                        />

                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Join NexaCart and start shopping today.
                    </p>

                </div>


                {/* Register Card */}

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name */}

                        <div>

                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Full Name
                            </label>

                            <div className="relative">

                                <UserRound
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                        </div>


                        {/* Username */}

                        <div>

                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Username
                            </label>

                            <div className="relative">

                                <UserRound
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    placeholder="Choose a username"
                                    autoComplete="username"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div>

                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Minimum 6 characters"
                                    autoComplete="new-password"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                            <p className="mt-2 text-xs text-slate-400">
                                Password must contain at least 6 characters.
                            </p>

                        </div>


                        {/* Register Button */}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            <UserPlus size={18} />

                            {isLoading
                                ? "Creating account..."
                                : "Create Account"}

                        </button>

                    </form>


                    {/* Login Link */}

                    <div className="mt-6 border-t border-slate-100 pt-6 text-center">

                        <p className="text-sm text-slate-500">

                            Already have an account?

                            <Link
                                to="/login"
                                className="ml-1 font-semibold text-blue-600 transition hover:text-blue-700"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>


                <p className="mt-5 text-center text-xs text-slate-400">
                    Secure account creation powered by NexaCart
                </p>

            </div>

        </div>
    );
}

export default RegisterPage;