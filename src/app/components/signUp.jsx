import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function SignupPage() {
    const router = useRouter()
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Signup Form */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="mb-8">
                        <svg
                            viewBox="0 0 24 24"
                            className="h-8 w-8 text-indigo-600"
                            fill="currentColor"
                        >
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a1 1 0 0 0-1.4-1.4L17 7.2l-0.9-0.9a1 1 0 0 0-1.4 0z" />
                            <path d="M11.3 12.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a1 1 0 0 0-1.4-1.4L13.6 13l-0.9-0.9a1 1 0 0 0-1.4 0z" />
                        </svg>
                    </div>

                    {/* Sign Up Form */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Create account
                            </button>

                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-black shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2" onClick={() => router.push('/login')}
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-2">GitHub</span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block lg:flex-1">
                <Image
                    className="h-full w-full object-cover"
                    width={300}
                    height={300}
                    src="https://cdn.prod.website-files.com/659ae36a3984432cc1e6a0b2/65c4b5993d687961d3816b55_An-Introduction-to-Design-Thinking-Process.jpeg"
                    alt="Workspace"
                />
            </div>
        </div>
    )
}

