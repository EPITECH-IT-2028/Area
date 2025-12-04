"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FieldError } from "@/components/ui/field";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLoginViewModel } from "@/app/login/viewModels/loginViewModel";

export default function MobileLoginView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    response,
    isEmailError,
    isPasswordError,
  } = useLoginViewModel();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="absolute top-0 backdrop-blur-xs">
      <div className="flex h-36 w-screen flex-col items-center justify-center rounded-b-3xl bg-white/5 ring-[1rem] ring-primary-foreground">
        <Image
          src="/logo_horizontal_b&w.svg"
          width={128}
          height={128}
          alt="logo"
          className="pointer-events-none flex items-center space-x-4 select-none lg:absolute lg:top-2"
          draggable="false"
        />
      </div>

      <div className="w-screen bg-primary-foreground px-6 pt-12">
        <div className="mb-12 flex flex-col items-center">
          <p className="font-serif text-4xl">Welcome Back</p>
          <p className="text-xs text-black/50">
            Enter your email and password to access your account
          </p>
        </div>

        <div>
          <div className="space-y-2">
            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="h-12 bg-zinc-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                aria-label="email"
                aria-invalid={isEmailError}
              />
              {response?.status_code === 400 && (
                <FieldError className="mt-2">{response.message}</FieldError>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                  className="h-12 bg-zinc-50 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  aria-label="password"
                  aria-invalid={isPasswordError}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-zinc-600"
                  onClick={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}
                  aria-label="Toggle Password Visibility"
                >
                  {passwordVisibility ? (
                    <Eye size={18} />
                  ) : (
                    <EyeClosed size={18} />
                  )}
                </button>
              </div>
            </div>
            {response?.status_code === 401 && (
              <FieldError className="mt-2">{response.message}</FieldError>
            )}
          </div>

          <div className="mt-12 space-y-2">
            <Button
              type="button"
              className="h-12 w-full text-lg"
              onClick={handleSubmit}
            >
              Log In
            </Button>

            <div className="my-4 flex items-center">
              <Separator className="shrink" />
              <p className="px-2 text-sm text-nowrap text-zinc-700">
                Or continue with
              </p>
              <Separator className="shrink" />
            </div>

            <div className="flex justify-center space-x-2 pt-2">
              <Button
                variant="outline"
                className="size-10 rounded-full"
                aria-label="Log In with Google"
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              </Button>

              <Button
                variant="outline"
                className="size-10 rounded-full"
                aria-label="Log In with GitHub"
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.1.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 2.9-.3 5.6 1.3 5.6 3.6zm-32.4-2c-.7 2.1 1.5 4.3 4.7 4.9 3.1.7 6.4-.4 7-2.5.7-2.1-1.5-4.3-4.7-4.9-3.1-.6-6.4.5-7 2.5zm44.8-1.7c-2.9.8-4.4 3.1-3.5 5.1.9 2 4 2.6 6.9 1.8 2.9-.8 4.4-3.1 3.5-5.1-.9-2-4-2.6-6.9-1.8zm28.3-1.5c-2.7 1-3.8 3.5-2.4 5.5 1.4 2 4.6 2.4 7.3 1.4 2.7-1 3.8-3.5 2.4-5.5-1.4-2-4.6-2.4-7.3-1.4zm26 0c-2.7 1-3.8 3.5-2.4 5.5 1.4 2 4.6 2.4 7.3 1.4 2.7-1 3.8-3.5 2.4-5.5-1.4-2-4.6-2.4-7.3-1.4zm25.9 1.7c-2.9.8-4.4 3.1-3.5 5.1.9 2 4 2.6 6.9 1.8 2.9-.8 4.4-3.1 3.5-5.1-.9-2-4-2.6-6.9-1.8zm28.3 1.5c-2.7 1-3.8 3.5-2.4 5.5 1.4 2 4.6 2.4 7.3 1.4 2.7-1 3.8-3.5 2.4-5.5-1.4-2-4.6-2.4-7.3-1.4zm26 0c-2.7 1-3.8 3.5-2.4 5.5 1.4 2 4.6 2.4 7.3 1.4 2.7-1 3.8-3.5 2.4-5.5-1.4-2-4.6-2.4-7.3-1.4zm25.9 1.7c-2.9.8-4.4 3.1-3.5 5.1.9 2 4 2.6 6.9 1.8 2.9-.8 4.4-3.1 3.5-5.1-.9-2-4-2.6-6.9-1.8zM244.8 8C106.7 8 0 116.4 0 256c0 108.5 69.8 200.6 166.7 233.2 12.9 2.4 17.6-5.6 17.6-12.4 0-6.1-.2-26.6-.3-48.3-67.8 14.7-82-32.7-82-32.7-11.1-28.3-27.1-35.8-27.1-35.8-22.2-15.3 1.7-15 1.7-15 24.6 2.2 37.6 25.3 37.6 25.3 21.8 37.4 57.2 26.6 71.1 20.4 2.2-15.9 8.5-26.6 15.5-32.7-54.1-6.2-111-27-111-119.8 0-26.4 9.4-48 24.8-64.9-2.5-6.1-10.8-30.7 2.4-64 0 0 20.3-6.5 66.5 24.8a229.3 229.3 0 0 1 60.6-8.2c20.6.1 41.4 2.8 60.6 8.2 46.1-31.3 66.4-24.8 66.4-24.8 13.3 33.3 4.9 57.9 2.4 64 15.5 16.9 24.8 38.5 24.8 64.9 0 93-57 113.5-111.3 119.6 8.7 7.5 16.5 22.4 16.5 45.1 0 32.6-.3 58.9-.3 66.9 0 6.9 4.6 14.9 17.7 12.4C426.2 456.6 496 364.5 496 256c0-139.6-106.7-248-251.2-248z"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="cursor-pointer font-bold text-zinc-900 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
