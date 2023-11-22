import { User } from "@prisma/client";

export type SafeUser = Omit<
User,
'createdAt' | 'updatedAt' | 'emailVarified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVarified: string | null;
}