export type UserType = { login: "xfgncgn"; isLogined: true };

export type MsgType = {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
    };
};
