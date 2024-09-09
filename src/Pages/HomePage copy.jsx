import { useState } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {

    const navigate = useNavigate()

    const [toggle, setToggle] = useState('')

    const assignments = [
        { id: 1, question: "How to show Mappls Map?" },
        { id: 2, question: "How to set zoom level and center of Map with animation?" },
        { id: 3, question: "How to plot a marker on Mappls Map?" },
        { id: 4, question: "Add a custom marker and when we click on the marker then display an InfoWindow/pop-up." },
    ]

    return (
        <>
            <div className="w-screen flex items-center justify-center">
                <div className="max-w-[1366px]">

                    <div className="w-full flex justify-center">
                        <h1 className='text-2xl font-semibold text-center py-2 mt-2 mb-6 border-b w-max px-10'>Mappls' Assignments</h1>
                    </div>

                    <div className='w-full flex justify-center flex-wrap gap-4'>
                        {
                            assignments.map((elem, index) =>
                                <>
                                    <div key={index} onClick={() => navigate(`/assignment${elem.id}`)} className="animate__animated animate__zoomIn animate__faster border border-red-400 text-red-100 hover:bg-red-600/90 hover:text-white hover:shadow-[0px_0px_20px_rgba(255,0,0,0.8)] cursor-pointer w-max px-10 py-4">
                                        <p>{elem.question}</p>
                                    </div>
                                </>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage