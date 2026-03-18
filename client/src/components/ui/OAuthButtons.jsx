import { useAuth } from "../../hooks/useAuth";
import GithubIcon from "./GithubIcon";
import GoogleIcon from "./GoogleIcon";

export default function OAuthButtons({ label = "Continue" }) {
  const { loginWithGoogle, loginWithGithub } = useAuth();

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={loginWithGoogle}
        className="btn-secondary w-full flex items-center justify-center gap-3 active:scale-95 transition duration-300"
      >
        <GoogleIcon />
        <span>{label} with Google</span>
      </button>

      <button
        type="button"
        onClick={loginWithGithub}
        className="btn-secondary w-full flex items-center justify-center gap-3 active:scale-95 transition duration-300"
      >
        <GithubIcon />
        <span>{label} with Github</span>
      </button>
    </div>
  );
}
