export type User = {
    user_id: string;
    first_name: string;
    last_name: string;
    long_name: string;
} 

export const UserDemo :User = {
    long_name : '',
    last_name : '',
    user_id : '',
    first_name : '',
}

export type UserDialogProps = {
    open: boolean;
    selectedUser: User;
    onClose: (value: User) => void;
}