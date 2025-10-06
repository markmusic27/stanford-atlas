import { signInWithGoogle } from "~/utils/auth/signIn";

const SignInToast = () => {
  return (
    <div
      className="border-primary-9 cursor-pointer rounded-[16px] border-[1px] bg-white px-[16px] py-[12px]"
      onClick={() => {
        signInWithGoogle("/");
      }}
    >
      <p className="font-default text-primary-text text-[14px]">
        {"Sign in to continue. Tap here to sign in."}
      </p>
    </div>
  );
};

export default SignInToast;
