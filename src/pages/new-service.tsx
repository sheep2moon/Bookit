import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { FiArrowLeft } from "react-icons/fi";

const NewServicePage = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    return;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  return (
    <div className="flex min-h-screen items-center bg-primary text-light">
      <div className="flex w-full justify-center pt-8">
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-2">
          <label htmlFor="service-name">Nazwa twojego serwisu</label>
          <Input
            name="service-name"
            value={name}
            onChange={handleNameChange}
            type="text"
            placeholder="Nazwa serwisu"
          />
          <label htmlFor="service-slug">
            Odnośnik do twojego serwisu. Przykładowo wpisując
            &quot;kogucik&quot; użytkownicy odnajdą twój serwis pod linkiem
            bookit.pl/kogucik
          </label>
          <Input
            name="service-slug"
            value={slug}
            onChange={handleSlugChange}
            type="text"
            placeholder="nazwa-serwisu"
          />
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
