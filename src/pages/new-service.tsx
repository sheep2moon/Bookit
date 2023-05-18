import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

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
    setName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder="Nazwa serwisu"
        />
        <Input
          value={slug}
          onChange={handleSlugChange}
          type="text"
          placeholder="nazwa-serwisu"
        />
        <Button type="submit">Stwórz</Button>
      </form>
    </div>
  );
};

export default NewServicePage;
