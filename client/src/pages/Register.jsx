import React, { useState, useRef, useEffect } from "react";
import { registerUser } from "../services/authService";

const DEPARTMENTS = [
    "Computer Science",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Business Administration",
    "Other",
];

function CustomSelect({ value, onChange, options, placeholder, id }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="custom-select-wrap" ref={ref}>
            <button
                type="button"
                id={id}
                className={`custom-select-trigger auth-input ${open ? "custom-select-open" : ""}`}
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className={value ? "" : "custom-select-placeholder"}>
                    {value || placeholder}
                </span>
                <svg
                    className={`custom-select-arrow ${open ? "custom-select-arrow--open" : ""}`}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <ul className="custom-select-menu" role="listbox">
                    {options.map((opt) => (
                        <li
                            key={opt}
                            role="option"
                            aria-selected={value === opt}
                            className={`custom-select-option ${value === opt ? "custom-select-option--active" : ""}`}
                            onClick={() => { onChange(opt); setOpen(false); }}
                        >
                            {value === opt && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        studentId: "",
        department: "",
        walletAddress: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await registerUser(formData);
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            setError("Registration failed. Please check your details and try again.");
        } finally {
            setLoading(false);
        }
    };

    const goNextStep = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const goPrevStep = () => setStep(1);

    const isStep1Valid =
        formData.name.trim() &&
        formData.email.trim() &&
        formData.password.trim();

    const strengthLevel =
        formData.password.length === 0 ? null
        : formData.password.length < 6 ? "weak"
        : formData.password.length < 10 ? "medium"
        : "strong";

    return (
        <div className="auth-page">
            <div className="auth-blob auth-blob-1" />
            <div className="auth-blob auth-blob-2" />
            <div className="auth-blob auth-blob-3" />

            <div className="auth-container auth-container--wide">
                {/* Brand */}
                <div className="auth-brand">
                    <div className="auth-logo">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="18" fill="url(#logoGradReg)" />
                            <text x="18" y="24" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white">₵</text>
                            <defs>
                                <linearGradient id="logoGradReg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4f46e5" /><stop offset="1" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h1 className="auth-title">CampusCoin</h1>
                    <p className="auth-subtitle">Create your campus digital wallet</p>
                </div>

                {/* Stepper */}
                <div className="auth-stepper">
                    <div className={`auth-step ${step >= 1 ? "auth-step--active" : ""} ${step > 1 ? "auth-step--done" : ""}`}>
                        <div className="auth-step-circle">
                            {step > 1 ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : "1"}
                        </div>
                        <span className="auth-step-label">Account</span>
                    </div>
                    <div className="auth-step-line" />
                    <div className={`auth-step ${step >= 2 ? "auth-step--active" : ""}`}>
                        <div className="auth-step-circle">2</div>
                        <span className="auth-step-label">Profile</span>
                    </div>
                </div>

                {/* MetaMask Notice */}
                <div className="metamask-notice">
                    <span className="metamask-notice__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </span>
                    <span className="metamask-notice__text">
                        <strong>MetaMask required</strong> — Install the{" "}
                        <a
                            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="metamask-notice__link"
                        >
                            MetaMask Chrome extension
                        </a>{" "}
                        to connect your wallet and use CampusCoin.
                    </span>
                </div>

                {/* Card */}
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h2 className="auth-card-title">
                            {step === 1 ? "Create your account" : "Complete your profile"}
                        </h2>
                        <p className="auth-card-desc">
                            {step === 1 ? "Step 1 of 2 — Account credentials" : "Step 2 of 2 — Student information"}
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <form onSubmit={goNextStep} className="auth-form">
                            {/* Full Name */}
                            <div className="auth-field">
                                <label htmlFor="reg-name" className="auth-label">Full Name</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <input id="reg-name" type="text" name="name" placeholder="John Doe"
                                        value={formData.name} onChange={handleChange}
                                        className="auth-input" required autoComplete="name" />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="auth-field">
                                <label htmlFor="reg-email" className="auth-label">Email Address</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <input id="reg-email" type="email" name="email" placeholder="you@university.edu"
                                        value={formData.email} onChange={handleChange}
                                        className="auth-input" required autoComplete="email" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="auth-field">
                                <label htmlFor="reg-password" className="auth-label">Password</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input id="reg-password" type={showPassword ? "text" : "password"} name="password"
                                        placeholder="Create a strong password" value={formData.password}
                                        onChange={handleChange} className="auth-input" required autoComplete="new-password" />
                                    <button type="button" className="auth-eye-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}>
                                        {showPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {strengthLevel && (
                                    <div className="auth-password-strength">
                                        <div className={`auth-strength-bar strength-${strengthLevel}`} />
                                        <span className="auth-strength-label">
                                            {strengthLevel.charAt(0).toUpperCase() + strengthLevel.slice(1)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button id="reg-next-btn" type="submit" className="auth-btn" disabled={!isStep1Valid}>
                                Continue
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleRegister} className="auth-form">
                            {/* Student ID */}
                            <div className="auth-field">
                                <label htmlFor="reg-studentId" className="auth-label">Student ID</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                    <input id="reg-studentId" type="text" name="studentId" placeholder="e.g. CS2021001"
                                        value={formData.studentId} onChange={handleChange}
                                        className="auth-input" required />
                                </div>
                            </div>

                            {/* Department — custom dropdown */}
                            <div className="auth-field">
                                <label htmlFor="reg-department" className="auth-label">Department</label>
                                <CustomSelect
                                    id="reg-department"
                                    value={formData.department}
                                    onChange={(val) => setFormData({ ...formData, department: val })}
                                    options={DEPARTMENTS}
                                    placeholder="Select Department"
                                />
                            </div>

                            {/* Wallet */}
                            <div className="auth-field">
                                <label htmlFor="reg-wallet" className="auth-label">
                                    Wallet Address
                                    <span className="auth-label-hint">(optional)</span>
                                </label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                                    </svg>
                                    <input id="reg-wallet" type="text" name="walletAddress" placeholder="0x..."
                                        value={formData.walletAddress} onChange={handleChange}
                                        className="auth-input" autoComplete="off" />
                                </div>
                            </div>

                            <div className="auth-form-actions">
                                <button type="button" className="auth-btn auth-btn--outline" onClick={goPrevStep} id="reg-back-btn">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                                    </svg>
                                    Back
                                </button>
                                <button id="reg-submit-btn" type="submit" className="auth-btn"
                                    disabled={loading || !formData.studentId || !formData.department}>
                                    {loading ? <span className="auth-spinner" /> : (
                                        <>
                                            Create Account
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="auth-divider"><span>Already have an account?</span></div>
                    <a href="/" className="auth-secondary-btn" id="go-to-login">Sign in instead</a>
                </div>

                <p className="auth-footer">
                    Secured by blockchain technology &nbsp;·&nbsp; CampusCoin &copy; 2025
                </p>
            </div>
        </div>
    );
}

export default Register;