import React from 'react'
import ProjectForm from './ProjectForm'

const NewProject = () => {
  return (
    <>
        <h1 className="text-4xl font-black">Crear proyecto</h1>

        <div className='mt-10 flex justify-center'>
            <ProjectForm />
        </div>
    </>
  )
}

export default NewProject
