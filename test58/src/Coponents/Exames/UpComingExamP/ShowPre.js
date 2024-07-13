import React from 'react'
import PreviousExams from './PreviousExams'
function ShowPre({courseName,date,duration,fullMark,level,time ,allquestions,semester,id}) {
    const Previous = [{
        id: 1,
        title: 'Mobile application development',
        instructor: 'Islam Mohamed',
        level: 'Level.1',
        Date: ' sunday,2022-10-20',
        time: '01:00 PM',
        degree: '90/100'
    },
    {
        id: 2,
        title: 'Mobile application development',
        instructor: 'Islam Mohamed',
        level: 'Level.2',
        Date: 'Monday,2022-10-20',
        time: '2:00 PM',
        degree: '90/100'
    }
    ]

    return (
        <>
            <div className="mt-5">
                <h4 className='mb-4 capitalize text-2xl '>previous Exams</h4>
                {
                    Previous.map((item, index) => {
                        return (
                            <PreviousExams
                                key={index}
                                {...item}
                            />
                        )
                    })
                }
            </div>

        </>
    )
}

export default ShowPre