export interface IGuild {
    guildId: string;
    prefix: string | null;
    createdAt: number;
}
export declare const GuildSchema: import("vimcord").MongoSchemaBuilder<IGuild>;
