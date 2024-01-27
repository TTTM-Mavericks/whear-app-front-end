interface DayProps {
    day1: Date,
    day2: Date
}

export const calcDiffFrom2Dates = ({day1, day2} : DayProps)  => {
    console.log("day1", day1)
    console.log("day2", day2)
    const diffTime = Math.abs(day2.getTime() - day1.getTime())
    console.log("diffDate", diffTime)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
export const calcDiffFrom2DatesString = ({day1, day2} : DayProps) => {
    const diffDays = calcDiffFrom2Dates({day1, day2})
    return diffDays === 1 ? `${diffDays} day` : `${diffDays} days`
}
export const calcDiffDayFromNow = (day: string) => {
    const now : Date = new Date()
    const date : Date = new Date(day) 
    console.log("Day", day)   
    console.log("date", date)
    const diffDays = calcDiffFrom2DatesString({day1: now, day2: date})
    return diffDays
}