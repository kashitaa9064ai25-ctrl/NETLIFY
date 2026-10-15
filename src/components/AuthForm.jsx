import { useState } from "react";
import { useAuth } from "../context/AuthContext";

//Default Function
export default function AuthForm() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { signup, login, loginWithGoogle } = useAuth();
    // handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            if (isRegister) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    }
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            if (isRegister) {
                await loginWithGoogle;
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <div>
            <div>
                <h2>{isRegister ? "Create an account" : "Welcome Back"}</h2>
                <p>{isRegister ? "sign up to get started" : "sign in to continue"}</p>
                {error && <p> {error} </p>}
                <button onClick={handleGoogleLogin} disabled={submitting}>Sign in with google</button>
                <span> or continue with email</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input type="email"
                        requiredvalue={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@gmail.com" />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required />
                </div>
                <button
                    type="submit"
                    disabled={submitting}>
                    {submitting ? "Processing" : isRegister ? "signup" : "signin"}
                </button>
            </form>
            <p>
                {isRegister ? "Already have an account?" : "Don't have an account?"}
                <button onClick={() => {
                    setIsRegister(!isRegister);
                    setError("");
                }} >
                    {isRegister ? "Login" : "Sign Up"}
                </button>
            </p>
        </div>


    );

}