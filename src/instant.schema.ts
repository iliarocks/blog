// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  // We inferred 6 attributes!
  // Take a look at this schema, and if everything looks good,
  // run `push schema` again to enforce the types.
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
    }),
    camera: i.entity({
      alt: i.string(),
      takenAt: i.string(),
      type: i.string(),
    }),
    code: i.entity({
      description: i.string().optional(),
      name: i.string().optional(),
      product: i.string().optional(),
      repository: i.string().optional(),
    }),
    library: i.entity({
      authors: i.any().optional(),
      instalment: i.number().optional(),
      rating: i.number().optional(),
      release: i.string().optional(),
      status: i.string().optional(),
      title: i.string().optional(),
      type: i.string().optional(),
    }),
    todos: i.entity({
      createdAt: i.number().optional(),
      done: i.boolean().optional(),
      text: i.string().optional(),
    }),
  },
  links: {
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$users",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
    camera$files: {
      forward: {
        on: "camera",
        has: "many",
        label: "$files",
      },
      reverse: {
        on: "$files",
        has: "many",
        label: "camera",
      },
    },
  },
  rooms: {
    todos: {
      presence: i.entity({}),
    },
  },
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
