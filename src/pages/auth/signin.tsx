import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import PrimaryPageLayout from "../../components/layout/PrimaryPageLayout";
import Button from "../../components/common/Button";

const SignIn = () => {
  const session = useSession();

  if (session.data?.user) return <div>you are already logged in</div>;

  return (
    <PrimaryPageLayout>
      <Link href="/">Back</Link>
      <div>
        <Button onClick={() => void signIn("google")}>
          Sign In with Google
        </Button>
      </div>
    </PrimaryPageLayout>
  );
};

export default SignIn;
