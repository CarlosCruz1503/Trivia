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
            .required("Es necesario un nombre para tu quiz")
            .min(4, "El nombre del quiz debe de ser minimo 4 caracteres")
            .max(20, "El nombre del quiz debe de ser maximo de 20 caracteres"),
        questions: yup.array().of(
            yup.object().shape({
                questionsTitle: yup.string().required("La pregunta debe tener un titulo"),
                answers: yup.array().of(
                    yup.object().shape({
                        answerTitle: yup.string().required("Todas las preguntas deben tener 4 respuestas")
                            .min(4, "La respuesta debe ser de minimo 4 caracteres")
                            .max(50, "La respuesta puede ser de maximo 50 caracteres"),
                    }),
                ),
                correct: yup.number()
            }),
        ), // these constraints are shown if and only if inner constraints are satisfied
        private: yup.string().required(),
        author: yup.string()
            .required("Es necesario el nombre del autor del quiz")
            .min(4, "El nombre del autor debe de ser minimo 4 caracteres")
            .max(20, "El nombre del autor debe de ser maximo de 20 caracteres")
    })

    const initialValues = {
        name: "",
        private: "false",
        author: "",
        questions: [{
            questionsTitle: "",
            answers: [
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                }
            ],
            correct: 1,
        }, {
            questionsTitle: "",
            answers: [
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                }
            ],
            correct: 1,
        },
        {
            questionsTitle: "",
            answers: [
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                }
            ],
            correct: 1,
        },
        {
            questionsTitle: "",
            answers: [
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                },
                {
                    answerTitle: "",
                }
            ],
            correct: 1,
        }]
    }

    function arrayQuestionsFunction(values: any, errors: any, touched: any) {

        return (
            <FieldArray
                name="questions"
                render={arrayHelpers => {
                    const questions = values.questions;
                    return (
                        <div className='row'>

                            {questions && questions.length > 0
                                ? questions.map((user: any, index: any) => (
                                    <div key={index} className='col-12 col-md-6 text-center col-questions' >
                                        <h1>Pregunta #{`${index + 1}`}</h1>
                                        <ErrorMessage name={`questions.${index}.questionsTitle`} component="h4" className='text-danger' />
                                        <Field
                                            name={`questions.${index}.questionsTitle`}
                                            className="field-form p-3"
                                            placeholder={`Pregunta #${index + 1}`}
                                        />
                                        <br />



                                        {listAnswer(index)}

                                        <h5 className='text-center mt-5'>Cual es la respuesta correcta a la pregunta? </h5>
                                        <div className="answers-yes mb-5">
                                            <br />
                                            <h2>#1</h2>
                                            <Field type="radio" id={`questions.${index}.correct.${index}`} name={`questions.${index}.correct.${index}`} value="1" checked />
                                            <h2>#2</h2>
                                            <Field type="radio" id={`questions.${index}.correct.${index}`} name={`questions.${index}.correct.${index}`} value="2" />
                                            <h2>#3</h2>
                                            <Field type="radio" id={`questions.${index}.correct.${index}`} name={`questions.${index}.correct.${index}`} value="3" />
                                            <h2>#4</h2>
                                            <Field type="radio" id={`questions.${index}.correct.${index}`} name={`questions.${index}.correct.${index}`} value="4" />
                                        </div>

                                        {index >= 4
                                            ?
                                            <button
                                                className='btn m-0 mt-4'
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            > Eliminar esta pregunta </button>
                                            :
                                            <></>
                                        }
                                    </div>
                                ))
                                : null}
                            <button
                                className='btn m-0 mt-3'
                                type="button"
                                onClick={() =>
                                    arrayHelpers.push({
                                        questionsTitle: "",
                                        answers: [
                                            {
                                                answerTitle: "",
                                            },
                                            {
                                                answerTitle: "",
                                            },
                                            {
                                                answerTitle: "",
                                            },
                                            {
                                                answerTitle: "",
                                            }
                                        ]
                                    })
                                } // insert an empty string at a position
                            >
                                Añadir una preguntas más
                            </button>
                            <br />
                            <br />
                            <br />
                        </div >

                    );

                }}

            />
        )
    }

    function listAnswer(i: number) {

        let arrayAnswers = []


        for (let j = 0; j < 4; j++) {
            arrayAnswers.push(
                <div>
                    <h4 className='mt-3'>Escribe la respuesta #{`${j + 1}`}</h4>
                    <Field type="text" name={`questions.${i}.answers.${j}.answerTitle`} className="form-control" />
                    <ErrorMessage name={`questions.${i}.answers.${j}.answerTitle`} component="h5" className='text-danger' />
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
                                                    <ErrorMessage component="h5" name="name" className='text-danger'></ErrorMessage>
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

                                        <div className="form-check ">
                                            <input id="private1" name="private" type="radio" className="" value="true" />
                                            <label className="form-check-label m-2 mt-0 mb-0" htmlFor="private">
                                                Este Quiz es Privado
                                            </label>
                                        </div>

                                        <div className="form-check ">
                                            <input id="private1" name="private" type="radio" className="" value="false" checked />
                                            <label className="form-check-label m-2 mt-0 mb-0" htmlFor="private">
                                                Este Quiz es Publico
                                            </label>
                                        </div>

                                        <h3 className='text-center'>Quien es el autor de este quiz</h3>
                                        <Field id="author" name="author" type="text" className="field-form" />
                                        {
                                            errors.author && touched.author && (
                                                <div>
                                                    <ErrorMessage component="h5" name="author" className='text-danger'></ErrorMessage>
                                                </div>
                                            )
                                        }
                                        <h2>Agrega preguntas a tu Quiz</h2>
                                        {arrayQuestionsFunction(values, errors, touched)}

                                        {isSubmitting ? (<p>Creando tú publicación</p>) : null}
                                        <button type="submit" className='btn'><h1>Crear Quiz</h1></button>
                                    </Form>)
                            }}

                        </Formik>
                    </div>
                </div>
            </div>
        </div >

    )
}