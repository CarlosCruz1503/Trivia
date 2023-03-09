import React, { useState } from 'react'
import "../../styles/scss/create/create.scss"
import backgroundImage from "../../resources/5719387.jpg"
import * as yup from "yup"
import { Form, Formik, Field, ErrorMessage, FieldArray, getIn } from 'formik'
import { TQuestions, TQuiz } from '../../interfaces/interfaces'
import { instance } from '../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'
type Props = {}

export default function IcreatePage({ }: Props) {

    const [file, setFile] = useState<File>()
    const [fileError, setFileError] = useState<Boolean>()
    const [preview, setPreview] = useState<string>()
    const [sucess, setSucess] = useState<Boolean>()
    const [loading, setLoading] = useState<Boolean>()
    const [quizId, setQuizId] = useState<string>()

    const navigate = useNavigate()

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
                correct: yup.string().required("Debes selecionar cual es la respuesta correcta a la pregunta")
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
            correct: "",
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
            correct: "",
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
            correct: "",
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
            correct: "",
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

                                        <h5 className='text-center mt-5 background-text' >Cual es la respuesta correcta a la pregunta? </h5>
                                        <div className="answers-yes mb-1">
                                            <br />
                                            <h2>#1</h2>
                                            <Field type="radio" id={`questions.${index}.correct`} name={`questions.${index}.correct`} value="0" />
                                            <h2>#2</h2>
                                            <Field type="radio" id={`questions.${index}.correct`} name={`questions.${index}.correct`} value="1" />
                                            <h2>#3</h2>
                                            <Field type="radio" id={`questions.${index}.correct`} name={`questions.${index}.correct`} value="2" />
                                            <h2>#4</h2>
                                            <Field type="radio" id={`questions.${index}.correct`} name={`questions.${index}.correct`} value="3" />

                                        </div>
                                        <ErrorMessage name={`questions.${index}.correct`} component="h4" className='text-danger mb-3' />

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
                                        ],
                                        correct: "",
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
                    <h4 className='mt-3 '>Escribe la respuesta #{`${j + 1}`}</h4>
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
                                let questionsGood: any[] = []

                                if (file) {
                                    console.log(file)
                                    let formData = new FormData()
                                    formData.append('myFile', file);
                                    setFileError(false)
                                    instance.post("/api/storage", formData)
                                        .then((res) => {
                                            console.log(res)
                                            values.questions.map((question, index) => {
                                                question.answers.map((answer, index) => {

                                                    if (question.correct == index.toString()) {
                                                        Object.assign(answer, {
                                                            correct: "true"
                                                        })
                                                    } else {

                                                        Object.assign(answer, {
                                                            correct: "false"
                                                        })

                                                    }
                                                })

                                                questionsGood.push(question)
                                            })
                                            const dataQuiz = {
                                                name: values.name,
                                                questions: questionsGood,
                                                image: res.data._id,
                                                private: values.private,
                                                author: values.author,
                                                points: []
                                            }

                                            values.name = ""
                                            values.questions = [{
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
                                                correct: "",
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
                                                correct: "",
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
                                                correct: "",
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
                                                correct: "",
                                            }]
                                            values.author = ""
                                            values.private = "false"



                                            setLoading(true)
                                            instance.post("/api/quiz/", dataQuiz)
                                                .then(res => {
                                                    console.log(res)
                                                    setSucess(true)
                                                    setLoading(false)
                                                    setQuizId(res.data._id)
                                                })
                                                .catch(e => {
                                                    setSucess(false)
                                                    console.log(e)
                                                    setLoading(false)
                                                })
                                        }).catch(e => {
                                            console.log(e)
                                        })

                                } else {
                                    console.log("error file")
                                    setFileError(true)
                                }

                            }}>

                            {({ errors, touched, isSubmitting, values }) => {
                                return (
                                    <Form className='form-form ' >
                                        <h3 className='text-center background-text'>Nombre para el Quiz</h3>
                                        <Field id="name" name="name" type="text" className="field-form" />
                                        {
                                            errors.name && touched.name && (
                                                <div>
                                                    <ErrorMessage component="h5" name="name" className='text-danger'></ErrorMessage>
                                                </div>
                                            )
                                        }

                                        <h3 className='text-center background-text'> Imagen para el quiz</h3>

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
                                        {fileError ? (<h1 className='text-danger'>Debes poner una foto a tú Quiz </h1>) : null}

                                        <div className='preview'>
                                            {preview ? <img className='img-profile img-fluid form-image' src={preview} alt="x" /> : <img className='img-profile img-fluid form-image' src={`https://i.pinimg.com/550x/b5/46/3c/b5463c3591ec63cf076ac48179e3b0db.jpg`} alt="x" />}
                                        </div>

                                        <Field name="private" as="select">
                                            <option value="true">Red</option>
                                            <option value="false">Green</option>
                                            <option value="blue">Blue</option>
                                        </Field>


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

                                        {loading ? (<h2 className='text-sucess'>Creando tú publicación</h2>) : null}
                                        {sucess ? (<h1 className='text-sucess'>Quiz creado de forma correcta</h1>) : null}
                                        {fileError ? (<h1 className='text-danger text-center background-text'>El Quiz no fue creado, revisa los errores que tiene y vuelve a intentar</h1>) : null}
                                        {sucess == false ? <h1 className='text-center'> Hubo un error la crear tu Quiz, prueba de nuevo</h1> : null}
                                        {quizId
                                            ?
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                <h1 className='text-sucess text-center background-text'> Tu quiz fue creado </h1>
                                                <h1 className='text-sucess text-center background-text'>Comparte este Id para que otros puedan jugarlo</h1>
                                                <h2 className='text-center background-text'>{quizId}</h2>
                                                <h2 className='text-center text-danger background-text'>
                                                    Si elegiste que tu quiz sea privado solo podra ser jugado si compartes el id
                                                </h2>
                                                <h2 className='text-center text-danger background-text'>
                                                    Si es publico podra ser jugado por cualquier persona
                                                </h2>
                                                <button className='btn btn-primary' onClick={() => {
                                                    navigate("../..")
                                                }}>
                                                    Volver a la pagina principal
                                                </button>

                                                <h2 className="btn btn-light" onClick={() => {
                                                    navigate(`../preguntas/${quizId}`)
                                                }}>Jugar mi Quiz</h2>
                                            </div>
                                            :
                                            null}

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