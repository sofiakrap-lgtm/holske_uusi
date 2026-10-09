import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const palvelut = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/palvelut' }),
  schema: z.object({
    nimi: z.string(),
    otsikko: z.string(),
    seoTitle: z.string(),
    kuvaus: z.string(),
    ingressi: z.string(),
    kortti: z.string(),
    ikoni: z.string(),
    jarjestys: z.number(),
    ydin: z.boolean().default(false),
    kuva: z.string(),
    kuvaAlt: z.string(),
    kotitalousvahennys: z.boolean().default(true),
    alapalvelut: z
      .array(z.object({ nimi: z.string(), teksti: z.string(), ikoni: z.string().optional() }))
      .default([]),
    ukk: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
  }),
});

export const collections = { palvelut };
