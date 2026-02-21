// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
	$files: {
		allow: {
			view: "true",
		},
	},
	$default: {
		allow: {
			create: "isIlia",
			update: "isIlia",
			delete: "isIlia",
		},
		bind: { isIlia: "auth.id != null && auth.email == 'parun.ilia@gmail.com'" },
	},
} satisfies InstantRules;

export default rules;
