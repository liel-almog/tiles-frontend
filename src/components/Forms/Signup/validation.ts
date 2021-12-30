import * as Yup from 'yup'

export const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email').required('Required')
})