import {cols} from "../../const/collections"
import {col} from "mongo-registry"

const feedbacks = () => col(cols.FEEDBACK)

export const addFeedback = feedback => feedbacks().insertOne({...feedback, date: new Date()})