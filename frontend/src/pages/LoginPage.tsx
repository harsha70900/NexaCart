import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    function handleLogin() {

        alert("Login Successful!");

        navigate("/products");

    }

    return (
        <div className="flex min-h-screen items-center justify-center">

            <button
                onClick={handleLogin}
                className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Login
            </button>

        </div>
    );
}

export default LoginPage;