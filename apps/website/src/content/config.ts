/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { z, defineCollection } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // description: z.string().optional(),
    // thumbnail: z.string().optional(),
    group: z.string().optional(),
  }),
});

export const collections = { docs };
