import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../utils/api";
import { getServerAuthSession } from "../server/auth";
import { GetServerSidePropsContext } from "next";

const NewServicePage = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const { mutateAsync: createService } =
    api.service.createService.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = createService({ name, slug });
    console.log(res);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(" ", "-"));
  };

  return (
    <div className="flex min-h-screen items-center bg-primary text-light">
      <div className="flex w-full justify-center pt-8">
        <form
          onSubmit={handleSubmit}
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
    const queryMessage = new URLSearchParams(
      "Musisz być zalogowany aby to zrobić"
    ).toString();

    return {
      redirect: {
        destination: `/auth/signin?message=${queryMessage}`,
        permanent: false,
      },
    };
  }

  if (session.user.serviceId) {
    return {
      redirect: {
        destination: `/auth/manage`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
