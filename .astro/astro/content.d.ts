declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"arbre-a-chat": {
"arbre-a-chat-grand-chat.md": {
	id: "arbre-a-chat-grand-chat.md";
  slug: "arbre-a-chat-grand-chat";
  body: string;
  collection: "arbre-a-chat";
  data: InferEntrySchema<"arbre-a-chat">
} & { render(): Render[".md"] };
"arbre-a-chat-pas-cher.md": {
	id: "arbre-a-chat-pas-cher.md";
  slug: "arbre-a-chat-pas-cher";
  body: string;
  collection: "arbre-a-chat";
  data: InferEntrySchema<"arbre-a-chat">
} & { render(): Render[".md"] };
"arbre-a-chat-petit-appartement.md": {
	id: "arbre-a-chat-petit-appartement.md";
  slug: "arbre-a-chat-petit-appartement";
  body: string;
  collection: "arbre-a-chat";
  data: InferEntrySchema<"arbre-a-chat">
} & { render(): Render[".md"] };
"arbre-a-chat-solide.md": {
	id: "arbre-a-chat-solide.md";
  slug: "arbre-a-chat-solide";
  body: string;
  collection: "arbre-a-chat";
  data: InferEntrySchema<"arbre-a-chat">
} & { render(): Render[".md"] };
"meilleur-arbre-a-chat-2025.md": {
	id: "meilleur-arbre-a-chat-2025.md";
  slug: "meilleur-arbre-a-chat-2025";
  body: string;
  collection: "arbre-a-chat";
  data: InferEntrySchema<"arbre-a-chat">
} & { render(): Render[".md"] };
};
"bac-litiere-chat": {
"bac-litiere-chat-autonettoyant.md": {
	id: "bac-litiere-chat-autonettoyant.md";
  slug: "bac-litiere-chat-autonettoyant";
  body: string;
  collection: "bac-litiere-chat";
  data: InferEntrySchema<"bac-litiere-chat">
} & { render(): Render[".md"] };
"bac-litiere-chat-entree-dessus.md": {
	id: "bac-litiere-chat-entree-dessus.md";
  slug: "bac-litiere-chat-entree-dessus";
  body: string;
  collection: "bac-litiere-chat";
  data: InferEntrySchema<"bac-litiere-chat">
} & { render(): Render[".md"] };
"bac-litiere-chat-ferme.md": {
	id: "bac-litiere-chat-ferme.md";
  slug: "bac-litiere-chat-ferme";
  body: string;
  collection: "bac-litiere-chat";
  data: InferEntrySchema<"bac-litiere-chat">
} & { render(): Render[".md"] };
"bac-litiere-plusieurs-chats.md": {
	id: "bac-litiere-plusieurs-chats.md";
  slug: "bac-litiere-plusieurs-chats";
  body: string;
  collection: "bac-litiere-chat";
  data: InferEntrySchema<"bac-litiere-chat">
} & { render(): Render[".md"] };
"meilleur-bac-litiere-chat-2025.md": {
	id: "meilleur-bac-litiere-chat-2025.md";
  slug: "meilleur-bac-litiere-chat-2025";
  body: string;
  collection: "bac-litiere-chat";
  data: InferEntrySchema<"bac-litiere-chat">
} & { render(): Render[".md"] };
};
"distributeur-croquettes-chat": {
"distributeur-croquettes-chat-automatique.md": {
	id: "distributeur-croquettes-chat-automatique.md";
  slug: "distributeur-croquettes-chat-automatique";
  body: string;
  collection: "distributeur-croquettes-chat";
  data: InferEntrySchema<"distributeur-croquettes-chat">
} & { render(): Render[".md"] };
"distributeur-croquettes-chat-camera.md": {
	id: "distributeur-croquettes-chat-camera.md";
  slug: "distributeur-croquettes-chat-camera";
  body: string;
  collection: "distributeur-croquettes-chat";
  data: InferEntrySchema<"distributeur-croquettes-chat">
} & { render(): Render[".md"] };
"distributeur-croquettes-chat-wifi.md": {
	id: "distributeur-croquettes-chat-wifi.md";
  slug: "distributeur-croquettes-chat-wifi";
  body: string;
  collection: "distributeur-croquettes-chat";
  data: InferEntrySchema<"distributeur-croquettes-chat">
} & { render(): Render[".md"] };
"distributeur-croquettes-plusieurs-chats.md": {
	id: "distributeur-croquettes-plusieurs-chats.md";
  slug: "distributeur-croquettes-plusieurs-chats";
  body: string;
  collection: "distributeur-croquettes-chat";
  data: InferEntrySchema<"distributeur-croquettes-chat">
} & { render(): Render[".md"] };
"meilleur-distributeur-croquettes-chat-2025.md": {
	id: "meilleur-distributeur-croquettes-chat-2025.md";
  slug: "meilleur-distributeur-croquettes-chat-2025";
  body: string;
  collection: "distributeur-croquettes-chat";
  data: InferEntrySchema<"distributeur-croquettes-chat">
} & { render(): Render[".md"] };
};
"fontaine-eau-chat": {
"fontaine-eau-chat-filtrante.md": {
	id: "fontaine-eau-chat-filtrante.md";
  slug: "fontaine-eau-chat-filtrante";
  body: string;
  collection: "fontaine-eau-chat";
  data: InferEntrySchema<"fontaine-eau-chat">
} & { render(): Render[".md"] };
"fontaine-eau-chat-inox.md": {
	id: "fontaine-eau-chat-inox.md";
  slug: "fontaine-eau-chat-inox";
  body: string;
  collection: "fontaine-eau-chat";
  data: InferEntrySchema<"fontaine-eau-chat">
} & { render(): Render[".md"] };
"fontaine-eau-chat-plusieurs-chats.md": {
	id: "fontaine-eau-chat-plusieurs-chats.md";
  slug: "fontaine-eau-chat-plusieurs-chats";
  body: string;
  collection: "fontaine-eau-chat";
  data: InferEntrySchema<"fontaine-eau-chat">
} & { render(): Render[".md"] };
"fontaine-eau-chat-silencieuse.md": {
	id: "fontaine-eau-chat-silencieuse.md";
  slug: "fontaine-eau-chat-silencieuse";
  body: string;
  collection: "fontaine-eau-chat";
  data: InferEntrySchema<"fontaine-eau-chat">
} & { render(): Render[".md"] };
"meilleure-fontaine-eau-chat-2025.md": {
	id: "meilleure-fontaine-eau-chat-2025.md";
  slug: "meilleure-fontaine-eau-chat-2025";
  body: string;
  collection: "fontaine-eau-chat";
  data: InferEntrySchema<"fontaine-eau-chat">
} & { render(): Render[".md"] };
};
"sac-a-dos-chat": {
"meilleur-sac-a-dos-chat-2025.md": {
	id: "meilleur-sac-a-dos-chat-2025.md";
  slug: "meilleur-sac-a-dos-chat-2025";
  body: string;
  collection: "sac-a-dos-chat";
  data: InferEntrySchema<"sac-a-dos-chat">
} & { render(): Render[".md"] };
"sac-a-dos-chat-avion.md": {
	id: "sac-a-dos-chat-avion.md";
  slug: "sac-a-dos-chat-avion";
  body: string;
  collection: "sac-a-dos-chat";
  data: InferEntrySchema<"sac-a-dos-chat">
} & { render(): Render[".md"] };
"sac-a-dos-chat-bulles.md": {
	id: "sac-a-dos-chat-bulles.md";
  slug: "sac-a-dos-chat-bulles";
  body: string;
  collection: "sac-a-dos-chat";
  data: InferEntrySchema<"sac-a-dos-chat">
} & { render(): Render[".md"] };
"sac-a-dos-chat-grand-gabarit.md": {
	id: "sac-a-dos-chat-grand-gabarit.md";
  slug: "sac-a-dos-chat-grand-gabarit";
  body: string;
  collection: "sac-a-dos-chat";
  data: InferEntrySchema<"sac-a-dos-chat">
} & { render(): Render[".md"] };
"sac-a-dos-chat-veto.md": {
	id: "sac-a-dos-chat-veto.md";
  slug: "sac-a-dos-chat-veto";
  body: string;
  collection: "sac-a-dos-chat";
  data: InferEntrySchema<"sac-a-dos-chat">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
