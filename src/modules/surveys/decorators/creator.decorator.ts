import { SetMetadata } from "@nestjs/common";
import { CREATOR_KEY } from "src/util/key-decorators";

export const CreatorAccess = () => SetMetadata(CREATOR_KEY, true);
