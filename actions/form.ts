"use server";

import { FormSchemaType, formSchema } from "./../lib/schemas";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundError extends Error {}

export const GetFormStats = async () => {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bouncedRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bouncedRate,
  };
};

// Create a new form
export const createForm = async (data: FormSchemaType) => {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid form");
  }

  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error("Something went wrong");
  }

  return form.id;
};

// Fetch all forms
export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const forms = prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return forms;
}

// Fetch form by ID
export async function getFormById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    }
  })

  return form;
}