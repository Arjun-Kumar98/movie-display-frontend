export interface MovieFormProps{
    mode:'add'|'edit';
    initialValues?:MovieFormData;
    onSubmit:(data:MovieFormData)=>void;
}

export interface MovieFormData{
    title:string;
    publishYear:number;
    posterFile?:FileList|any;
    posterUrl?:string;
}