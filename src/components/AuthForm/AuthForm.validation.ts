import * as yup from 'yup';
import {t} from '@/i18n'
import { AuthFormMode } from './AuthForm.types';

export const getAuthFormSchema = (mode:AuthFormMode) =>
    yup.object().shape({
        email:yup.string().email('Invalid email').required(t(`${mode}.email`)),
        password:yup.string().required(t(`${mode}.password`)),
        confirmPassword:
        mode === 'signup'
        ? yup
        .string()
        .oneOf([yup.ref('password')], `${t('signup.confirmPassword')} does not match`)
        .required(t('signup.confirmPassword'))
        :yup.string().notRequired(),

    });