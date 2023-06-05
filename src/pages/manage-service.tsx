import React from "react";
import { getServerAuthSession } from "../server/auth";
import { prisma } from "../server/db";
import type { GetServerSidePropsContext } from "next";
import type { Service } from "@prisma/client";

const ManageService = ({ serviceData }: { serviceData: Service }) => {
  console.log(serviceData);

  return <div className="min-h-screen"></div>;
};

export default ManageService;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (session?.user && session.user.serviceId) {
    console.log(session.user);

    const serviceData = await prisma.service.findFirst({
      where: { id: session.user.id },
    });
    return {
      props: { serviceData },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
