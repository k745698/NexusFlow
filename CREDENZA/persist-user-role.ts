'use server';

/**
 * @fileOverview A flow to persist and recall a user's role (client/freelancer).
 *
 * - persistUserRole - A function that persists the user role.
 * - recallUserRole - A function that recalls the user role.
 * - PersistUserRoleInput - The input type for the persistUserRole function.
 * - RecallUserRoleInput - The input type for the recallUserRole function.
 * - PersistUserRoleOutput - The return type for the persistUserRole function.
 * - RecallUserRoleOutput - The return type for the recallUserRole function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UserRoleSchema = z.enum(['client', 'freelancer']);
export type UserRole = z.infer<typeof UserRoleSchema>;

const PersistUserRoleInputSchema = z.object({
  walletAddress: z.string().describe('The user\'s wallet address.'),
  role: UserRoleSchema.describe('The user\'s role (client or freelancer).'),
});
export type PersistUserRoleInput = z.infer<typeof PersistUserRoleInputSchema>;

const PersistUserRoleOutputSchema = z.object({
  success: z.boolean().describe('Whether the role was successfully persisted.'),
});
export type PersistUserRoleOutput = z.infer<typeof PersistUserRoleOutputSchema>;

const RecallUserRoleInputSchema = z.object({
  walletAddress: z.string().describe('The user\'s wallet address.'),
});
export type RecallUserRoleInput = z.infer<typeof RecallUserRoleInputSchema>;

const RecallUserRoleOutputSchema = z.object({
  role: UserRoleSchema.optional().describe('The user\'s role (client or freelancer), if found.'),
});
export type RecallUserRoleOutput = z.infer<typeof RecallUserRoleOutputSchema>;

export async function persistUserRole(input: PersistUserRoleInput): Promise<PersistUserRoleOutput> {
  return persistUserRoleFlow(input);
}

export async function recallUserRole(input: RecallUserRoleInput): Promise<RecallUserRoleOutput> {
  return recallUserRoleFlow(input);
}

const persistUserRoleFlow = ai.defineFlow(
  {
    name: 'persistUserRoleFlow',
    inputSchema: PersistUserRoleInputSchema,
    outputSchema: PersistUserRoleOutputSchema,
  },
  async input => {
    // In a real application, you would persist the role in a database.
    // For this example, we'll just log it to the console.
    console.log(`Persisting role ${input.role} for wallet address ${input.walletAddress}`);

    // Assuming persistence was successful.
    return {success: true};
  }
);

const recallUserRoleFlow = ai.defineFlow(
  {
    name: 'recallUserRoleFlow',
    inputSchema: RecallUserRoleInputSchema,
    outputSchema: RecallUserRoleOutputSchema,
  },
  async input => {
    // In a real application, you would recall the role from a database.
    // For this example, we'll just return null.
    console.log(`Recalling role for wallet address ${input.walletAddress}`);

    return {role: undefined};
  }
);
