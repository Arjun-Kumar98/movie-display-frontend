import * as yup from 'yup';
import {t} from '@/i18n';

export const movieFormSchema = yup.object().shape({
    title:yup.string().required('Title is required'),
    publishYear:yup
    .number()
    .typeError('Publishing year must be a number')
    .required('Publishing year is required')
    .min(1900,'Year must be after 1900')
    .max(new Date().getFullYear(),'Year cannot be after current year'),

    posterFile:yup.mixed().when('$isEditMode',{
        is:false,
        then:(schema)=>
            schema.test('file-required','Poster image is required',function (value) {
              const fileList = value as FileList | null;
              return !!fileList && fileList.length>0;
            }),
            otherwise:(schema)=>schema.notRequired(),
    }),
});