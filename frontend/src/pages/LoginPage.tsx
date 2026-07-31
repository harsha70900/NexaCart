import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/authApi";
import { saveToken } from "../utils/token";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function LoginPage() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

const loginMutation = useMutation({
    mutationFn: loginApi,

    onSuccess(data) {
        saveToken(data.token);

        login();

        toast.success("Login Successful");
        navigate("/");
    },

    onError: () => {

    toast.error("Invalid username or password");


    },
});

const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
) => {

    event.preventDefault();

    loginMutation.mutate({

        username,

        password,

    });

};

    return (
        <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-8 shadow-lg">

    <h1 className="mb-8 text-center text-3xl font-bold">

        Login

    </h1>

    <form
        onSubmit={handleSubmit}
        className="space-y-5"
    >

        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border p-3"
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3"
        />

        <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >

            {loginMutation.isPending
                ? "Logging in..."
                : "Login"}

        </button>

    </form>

</div>
    );
}

export default LoginPage;