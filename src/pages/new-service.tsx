import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../utils/api";
import { getServerAuthSession } from "../server/auth";
import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

const NewServicePage = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { mutateAsync: createService } =
    api.service.createService.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createService({ name, slug });
    if (!res?.sucess) {
      setError("Odnośnik jest już zajęty, spróbuj czegoś innego");
    } else {
      setError("");
      await router.push("/manage-service");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // SHOULD CHECK IF SLUG IS AVAILABLE WITH DEBOUNCE
    setSlug(e.target.value.toLowerCase().replace(" ", "-"));
  };

  return (
    <div className="flex min-h-screen items-center bg-primary text-light">
      <div className="flex w-full justify-center pt-8">
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="flex w-full max-w-md flex-col gap-2"
        >
          <label htmlFor="service-name">Nazwa twojego serwisu</label>
          <Input
            name="service-name"
            value={name}
            onChange={handleNameChange}
            type="text"
            placeholder="Nazwa serwisu"
          />
          <label htmlFor="service-slug">Odnośnik do twojego serwisu.</label>
          {error && <p>{error}</p>}
          <Input
            name="service-slug"
            value={slug}
            onChange={handleSlugChange}
            type="text"
            placeholder="nazwa-serwisu"
          />
          <p>
            Twój unikalny link będzie wyglądać tak: <br />
            {`bookit.pl/${slug}`}
          </p>
          <Button
            variant="secondary"
            type="submit"
            className="mt-4 font-bold text-accent"
          >
            Przejdź dalej
            <FiArrowLeft className="rotate-180 text-xl " />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewServicePage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  // NOT LOGGED IN
  if (!session?.user) {
    return {
      redirect: {
        destination: `/auth/signin?redirectTo=new-service`,
        permanent: false,
      },
    };
  }
  // ALREADY HAVE A SERVICE
  // IT WORKS BUT IS COMMENTED OUT FOR TEST
  // if (session.user.serviceId) {
  //   console.log(session.user);

  //   return {
  //     redirect: {
  //       destination: `/`,
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}
