export type AuthFormMode = 'login'|'signup';

export interface AuthFormData{
    email:string,
    password:string,
    confirmPassword?:string|any;
}

export interface AuthFormProps{
    mode:AuthFormMode;
    onSubmit:(formData:AuthFormData)=>void;
}