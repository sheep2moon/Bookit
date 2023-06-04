import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import PrimaryPageLayout from "../../components/layout/PrimaryPageLayout";
import Button from "../../components/common/Button";
import { FiArrowLeft } from "react-icons/fi";

const SignIn = () => {
  const session = useSession();

  if (session.data?.user)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-primary text-light">
        Jesteś zalogowany
        <Button variant="outline" onClick={() => void signOut()}>
          wyloguj
        </Button>
      </div>
    );

  return (
    <PrimaryPageLayout>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* <Link
          href="/"
          className="mb-8 flex items-center gap-2 font-bold text-light "
        >
          <FiArrowLeft />
          Strona główna
        </Link> */}
        <Button variant="outline" onClick={() => void signIn("google")}>
          Sign In with Google
        </Button>
      </div>
    </PrimaryPageLayout>
  );
};

export default SignIn;
