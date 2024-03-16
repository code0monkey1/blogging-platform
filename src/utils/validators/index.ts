import { TPost } from "../../types";

export const isPost = (data: unknown) => {
    return (
        (data as TPost).content !== undefined &&
        (data as TPost).title !== undefined
    );
};
