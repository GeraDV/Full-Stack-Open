import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({course}) => {
    const total = course.parts.reduce((prev,curr)=>prev+curr.exercises,0)
    return (
        <div>
            <Header text={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course