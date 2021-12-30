import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email').required('Required')
})