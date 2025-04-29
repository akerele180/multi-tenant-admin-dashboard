import { Label } from "@radix-ui/react-label";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { checkWhoLoggedIn } from "../api/auth";
import { delay } from "../utils/functions";
import { useAuth } from "../hooks/useAuth";
import { getTenantSettings } from "../services/tenantService";
import { useNavigate } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch, state } = useAuth();

  const navigate = useNavigate();

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setEmail(e.target.value);
    }
  }

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    setError("");

    try {
      await delay(1500);
      const user = await checkWhoLoggedIn(email, password);
      const tenant = await getTenantSettings(user.tenantId);

      const token = Math.random().toString(36).slice(2);
      const expiresAt = Date.now() + 1000 * 60 * 60;

      const payload = { user, tenant, token, expiresAt, loading: false };
      localStorage.setItem("auth", JSON.stringify(payload));
      toast.success("Login successful");
      dispatch({ type: "LOGIN", payload });
      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      setError((error as Error).message);
      toast.error((error as Error).message);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className={cn("flex flex-col")} {...props}>
      <img security="true" src="/images/babban-gona.png" alt="Logo" className="w-32 h-32 mx-auto" />
      <Card className="gap-6">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
            {
              error.length > 1 && (
                <span className="block text-center py-2 text-red-500 text-sm">{error}</span>
              )
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={handleEmailInputChange}
                  required
                  className={`${error.length > 1 && "border-red-500"}`}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  className={`${error.length > 1 && "border-red-500"}`}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={state.loading} className="w-full disabled:cursor-not-allowed">
                  {state.loading && <Loader2 className="animate-spin" />}
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
