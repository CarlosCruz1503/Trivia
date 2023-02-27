import React, { useState } from 'react'
import "../../styles/scss/create/create.scss"
import backgroundImage from "../../resources/5719387.jpg"
import * as yup from "yup"
import { Form, Formik, Field, ErrorMessage, FieldArray, getIn } from 'formik'
import { TQuestions, TQuiz } from '../../interfaces/interfaces'
type Props = {}

export default function IcreatePage({ }: Props) {

    const [file, setFile] = useState<File>()
    const [preview, setPreview] = useState<string>()
    const [nQuestions, setNQuestions] = useState<number>(4)

    const quizSchema: any = yup.object().shape({
        name: yup.string()
            .required("Debes poner un nombre a tu quiz")
            .min(4, "El nombre del quiz debe de ser minimo 4 caracteres")
            .max(20, "El nombre del quiz debe de ser maximo de 20 caracteres"),
        questions: yup.array()
            .of(
                yup.object().shape({
                    questionsTitle: yup.string().min(4, 'too short').max(20, "demasiado texto").required('Required'), // these constraints take precedence // these constraints take precedence
                })
            )
            .min(4, 'Minimum of 3 friends')
            .required('Must have friends'), // these constraints are shown if and only if inner constraints are satisfied
        private: yup.string().required(),
        author: yup.string()
            .required("Escribe el nombre del autor del quiz")
            .min(4, "El nombre del autor debe de ser minimo 4 caracteres")
            .max(20, "El nombre del autor debe de ser maximo de 20 caracteres")
    })

    const initialValues = {
        name: "",
        private: "true",
        author: ""
    }

    function arrayQuestionsFunction(values: any, errors: any, touched: any) {
        let arrayQuestions = []
        for (let i = 0; i < nQuestions; i++) {
            arrayQuestions.push(
                <FieldArray
                    name="questions"
                    render={({ form }) => (
                        <div className='col-12 col-md-6'>
                            <div className="list-group">
                                <h3 className='text-center'>Titulo de la pregunta #{`${i + 1}`}</h3>
                                <Field id={`questions.${i}.questionsTitle`} name={`questions.${i}.questionsTitle`} type="text" className="field-form p-3" placeholder={`Pregunta #${i + 1}`} />
                                {
                                    listAnswer(i)
                                }

                                {errors.questions &&
                                    errors.questions[i] &&
                                    errors.questions[i] &&
                                    touched.questions[i] &&
                                     (
                                        <div className="field-error">
                                            {errors.questions[i]}
                                        </div>
                                    )}
                                <h5 className='text-center'>Cual es la respuesta correcta a la pregunta? </h5>
                                <div className="answers-yes">
                                    <h2>#1</h2>
                                    <Field type="radio" id={`questions.${i}.correct.${i + 1}`} name={`questions.${i}.correct.${i + 1}`} value="1" checked />
                                    <h2>#2</h2>
                                    <Field type="radio" id={`questions.${i}.correct.${i + 1}`} name={`questions.${i}.correct.${i + 1}`} value="2" />
                                    <h2>#3</h2>
                                    <Field type="radio" id={`questions.${i}.correct.${i + 1}`} name={`questions.${i}.correct.${i + 1}`} value="3" />
                                    <h2>#4</h2>
                                    <Field type="radio" id={`questions.${i}.correct.${i + 1}`} name={`questions.${i}.correct.${i + 1}`} value="4" />
                                </div>
                            </div>
                        </div>
                    )
                    }

                />
            )
        }
        return (arrayQuestions)
    }

    function listAnswer(i: number) {

        let arrayAnswers = []


        for (let j = 0; j < 4; j++) {
            arrayAnswers.push(
                <div>
                    <h4>Escribe la respuesta #{`${j + 1}`}</h4>
                    <input type="text" name={`questions.${i}.AnswerTitle.${i + j}`} maxLength={20} minLength={4} />
                </div>
            )
        }
        return arrayAnswers
    }

    return (
        <div className='div-create'>

            <div className="create background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="container-sm">
                    <div className="forms">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={quizSchema}
                            onSubmit={async (values) => {
                                console.log(values)
                            }}>

                            {({ errors, touched, isSubmitting, values }) => {
                                return (
                                    <Form className='form-form ' >
                                        <h3 className='text-center'>Nombre para el Quiz</h3>
                                        <Field id="name" name="name" type="text" className="field-form" />
                                        {
                                            errors.name && touched.name && (
                                                <div>
                                                    <ErrorMessage component="h5" name="name"></ErrorMessage>
                                                </div>
                                            )
                                        }

                                        <h3 className='text-center'>Imagen para el quiz</h3>

                                        <input
                                            onChange={e => {
                                                if (e.target.files != null) {
                                                    let fileSelected = e.target.files[0]
                                                    setFile(fileSelected)
                                                    setPreview(URL.createObjectURL(e.target.files[0]))
                                                }

                                            }}
                                            type="file"
                                            accept="image/*"
                                            className='form-control'
                                        >
                                        </input>

                                        <div className='preview'>
                                            {preview ? <img className='img-profile img-fluid form-image' src={preview} alt="x" /> : <img className='img-profile img-fluid form-image' src={`https://i.pinimg.com/550x/b5/46/3c/b5463c3591ec63cf076ac48179e3b0db.jpg`} alt="x" />}
                                        </div>

                                        <h3 className='text-center'>Quieres que este quiz sea privado y solo se pueda jugar compartiendo el codigo del quiz?</h3>
                                        <input id="private1" name="private" type="radio" className="" value="true" />
                                        {
                                            errors.private && touched.private && (
                                                <div>
                                                    <ErrorMessage component="h5" name="private"></ErrorMessage>
                                                </div>
                                            )
                                        }




                                        <h3 className='text-center'>Quien es el autor de este quiz</h3>
                                        <Field id="author" name="author" type="text" className="field-form" />
                                        {
                                            errors.author && touched.author && (
                                                <div>
                                                    <ErrorMessage component="h5" name="author"></ErrorMessage>
                                                </div>
                                            )
                                        }


                                        <form action="" name="" onSubmit={(evt) => {
                                            evt.preventDefault()
                                            console.log(evt)
                                        }}>
                                            <div className="row">
                                                {arrayQuestionsFunction(values, errors, touched)}
                                            </div>
                                        </form>




                                        <button className='btn btn-dark' onClick={() => {
                                            let numberQ = nQuestions + 1
                                            setNQuestions(nQuestions => nQuestions + 1)
                                        }}> Agregar una pregunta mas</button>

                                        {isSubmitting ? (<p>Creando tú publicación</p>) : null}
                                        <button type="submit" className='btn'>Crear Tu publiacion</button>
                                    </Form>)
                            }}

                        </Formik>
                    </div>
                </div>
            </div>
        </div >

    )
}